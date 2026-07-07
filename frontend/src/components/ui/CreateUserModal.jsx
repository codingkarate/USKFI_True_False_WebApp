import { useState } from "react";
import api from "../../services/api";

const CreateUserModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/auth/create-user", formData);

      alert("User Created Successfully");

      onUserCreated();

      onClose();

    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to create user"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl w-[500px] p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          Create User
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="candidate">Candidate</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              {loading ? "Creating..." : "Create User"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateUserModal;