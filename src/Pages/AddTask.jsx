import useAxios from "@/Hooks/useAxios";
import { AuthContext } from "@/Provider/AuthProvider";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("To-Do");
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }
    if (title.length > 50) {
      toast.error("Title must be within 50 characters!");
      return;
    }
    if (description.length > 200) {
      toast.error("Description must be within 200 characters!");
      return;
    }

    const newTask = {
      email: user.email,
      title,
      description,
      timestamp: new Date().toLocaleString(),
      category,
    };

    try {
      setLoading(true);
      const res = await axiosPublic.post("/tasks", newTask);

      if (res.data.insertedId) {
        toast.success("Task Added Successfully");
        setTitle("");
        setDescription("");
        setCategory("To-Do");
      } else {
        toast.error("Failed to add task, please try again!");
      }
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-32 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title (max 50 chars) *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={50}
            required
          />
        </div>

        <div>
          <label className="block font-medium">
            Description (optional, max 200 chars)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
