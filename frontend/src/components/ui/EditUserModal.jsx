import { useState } from "react";
import api from "../../services/api";

const EditUserModal = ({ user, onClose, onUserUpdated }) => {
  const [form, setForm] = useState({
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/auth/update-user/${user._id}`, form);

      alert("User updated successfully");

      onUserUpdated();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-6">
          Edit User
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border p-3 w-full mb-4 rounded"
            placeholder="Full Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 w-full mb-4 rounded"
            placeholder="Email"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="border p-3 w-full mb-6 rounded"
          >
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
            <option value="candidate">Candidate</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditUserModal;