import React, { useContext, useEffect, useState } from "react";
import useAxios from "@/Hooks/useAxios";
import toast from "react-hot-toast";
import { AuthContext } from "@/Provider/AuthProvider";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import frame1 from "../assets/Frame-1.png";
import frame2 from "../assets/Frame-2.png";
import frame3 from "../assets/Frame-3.png";

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
        const updatedTasks = [];

        for (const task of res.data) {
          const deadline = new Date(task.deadline);
          const now = new Date();

          deadline.setHours(0, 0, 0, 0);
          now.setHours(0, 0, 0, 0);

          if (deadline < now && task.type !== "timeout") {
            await axiosPublic.patch(`/tasks/${task._id}`, { type: "timeout" });

            updatedTasks.push({ ...task, type: "timeout" });
          } else {
            updatedTasks.push(task);
          }
        }

        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks!");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [email]);

  return (
    <div className="w-full px-7 md:mx-auto my-10">
      {loading ? (
        <div className="text-center text-white text-lg">Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <div className="flex flex-col gap-5">
            <div className="bg-gray-200 text-gray-500 shadow-xl h-[180px] w-[268px] rounded-xl p-4 flex flex-col gap-2 font-medium justify-center">
              <img className="w-[46px]" src={frame1} alt="" />
              <h3>Expired Tasks</h3>
              <p>{tasks.filter((task) => task.type === "timeout").length}</p>
            </div>

            <div className="bg-gray-200 text-gray-500 shadow-xl h-[180px] w-[268px] rounded-xl p-4 flex flex-col gap-2 font-medium justify-center">
              <img className="w-[46px]" src={frame2} alt="" />
              <h3>All Active Tasks</h3>
              <p>{tasks.filter((task) => task.type === "active").length}</p>
            </div>
            <div className="bg-gray-200 text-gray-500  shadow-xl  h-[180px] w-[268px] rounded-xl p-4 flex flex-col gap-2 font-medium justify-center">
              <img className="w-[46px]" src={frame3} alt="" />
              <h3>Completed Tasks</h3>
              <p>{tasks.filter((task) => task.category === "Done").length}</p>
            </div>
            <Link to={"/addTask"}>
              <button className="bg-[#0D062D] px-3 py-2 text-white font-medium w-[268px] rounded-full">
                + Add Task
              </button>
            </Link>
          </div>
          {["To-Do", "In Progress", "Done"].map((category) => (
            <TaskColumn
              key={category}
              title={category}
              tasks={tasks}
              setTasks={setTasks}
              category={category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TaskColumn = ({ title, tasks, setTasks, category }) => {
  return (
    <div className="p-4 shadow-md rounded-xl bg-gray-200">
      <h2 className="text-2xl font-bold text-center mb-3">{title}</h2>
      {tasks
        .filter((task) => task.category === category)
        .map((task) => (
          <TaskCard key={task._id} task={task} setTasks={setTasks} />
        ))}
    </div>
  );
};

const TaskCard = ({ task, setTasks }) => {
  const axiosPublic = useAxios();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    task.description || ""
  );
  const [updatedCategory, setUpdatedCategory] = useState(task.category);

  const handleEdit = async () => {
    try {
      await axiosPublic.patch(`/tasks/${task._id}`, {
        title: updatedTitle,
        description: updatedDescription,
        category: updatedCategory,
      });

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id
            ? {
                ...t,
                title: updatedTitle,
                description: updatedDescription,
                category: updatedCategory,
              }
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
    <div className="p-3 mb-8 bg-white rounded-lg relative">
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
          <select
            className="w-full p-1 border rounded-md mb-1"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
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
          <h3 className="font-semibold text-xl">{task.title}</h3>
          <p className="text-sm mt-1 font-medium text-gray-500">
            {task.description || "No description"}
          </p>
          <h2 className="text-md font-semibold mt-4 text-gray-600">
            DeadLine: {task.deadline}
          </h2>
          <p className="text-sm font-medium text-gray-500">
            Category: {task.category}
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
