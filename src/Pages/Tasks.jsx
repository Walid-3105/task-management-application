import React, { useContext, useEffect, useState } from "react";
import useAxios from "@/Hooks/useAxios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast from "react-hot-toast";
import { AuthContext } from "@/Provider/AuthProvider";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    if (!email) return;

    const fetchTasks = async () => {
      try {
        const res = await axiosPublic.get(`/tasks?email=${email}`);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks!");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [email]);

  const updateTask = async (taskId, newCategory, newOrder) => {
    try {
      await axiosPublic.patch(`/tasks/${taskId}`, {
        category: newCategory,
        order: newOrder,
      });

      setTasks((prevTasks) =>
        prevTasks
          .map((task) =>
            task._id === taskId
              ? { ...task, category: newCategory, order: newOrder }
              : task
          )
          .sort((a, b) => a.order - b.order)
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full px-5 md:mx-auto md:max-w-7xl  mt-10">
        {loading ? (
          <div className="text-center text-white text-lg">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-5">
              <div className="bg-gray-400 rounded-md p-4 flex flex-col gap-2">
                <h3>Expired Tasks</h3>
              </div>
              <div className="bg-gray-400 rounded-md p-4 flex flex-col gap-2">
                <h3>All Active Tasks</h3>
              </div>
              <div className="bg-gray-400 rounded-md p-4 flex flex-col gap-2">
                <h3>Completed Tasks</h3>
              </div>
            </div>
            {["To-Do", "In Progress", "Done"].map((category) => (
              <TaskColumn
                key={category}
                title={category}
                tasks={tasks}
                setTasks={setTasks}
                updateTask={updateTask}
                category={category}
              />
            ))}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

const TaskColumn = ({ title, tasks, setTasks, updateTask, category }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (draggedItem) => {
      const filteredTasks = tasks.filter((task) => task.category === category);
      const updatedTasks = [...filteredTasks];
      const draggedTaskIndex = tasks.findIndex(
        (task) => task._id === draggedItem.id
      );
      const newOrder = filteredTasks.length;

      updateTask(draggedItem.id, category, newOrder);
      tasks[draggedTaskIndex] = {
        ...tasks[draggedTaskIndex],
        category,
        order: newOrder,
      };
      setTasks([...tasks.sort((a, b) => a.order - b.order)]);
    },
  });

  return (
    <div ref={drop} className="p-4 shadow-md rounded-md bg-gray-400">
      <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
      {tasks
        .filter((task) => task.category === category)
        .sort((a, b) => a.order - b.order)
        .map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index}
            setTasks={setTasks}
          />
        ))}
    </div>
  );
};

const TaskCard = ({ task, index, setTasks }) => {
  const axiosPublic = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description || ""
  );

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, category: task.category, order: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleEdit = async () => {
    try {
      await axiosPublic.patch(`/tasks/${task._id}`, {
        title: updatedTitle,
        description: updatedDescription,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id
            ? { ...t, title: updatedTitle, description: updatedDescription }
            : t
        )
      );

      setIsEditing(false);
      toast.success("Task updated!");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosPublic.delete(`/tasks/${task._id}`);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task!");
    }
  };

  return (
    <div ref={drag} className="p-3 mb-8 bg-gray-300 rounded-md relative">
      {isEditing ? (
        <div>
          <input
            className="w-full p-1 border rounded-md mb-1"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            className="w-full p-1 border rounded-md mb-1"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-md"
              onClick={handleEdit}
            >
              Save
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-2xl text-center">{task.title}</h3>
          <p className="text-xl mt-3 font-semibold text-black">
            {task.description || "No description"}
          </p>
          <div className="absolute top-12 right-0 flex gap-1">
            <button
              className="text-black text-lg md:text-2xl px-2 py-1 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              <FaRegEdit />
            </button>
          </div>
          <div className="absolute -top-4 -right-4 flex gap-1 hover:bg-red-500 bg-gray-500 rounded-full">
            <button
              className="text-red-500 text-xl md:text-2xl hover:text-white p-1 rounded-md"
              onClick={handleDelete}
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
