import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import CreateUserModal from "../../components/ui/CreateUserModal";
import EditUserModal from "../../components/ui/EditUserModal";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {

        try {

            const res = await api.get("/auth/users");

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmDelete) return;
        try {
            await api.delete(`/auth/delete-user/${id}`);
            alert("User deleted successfully");
            fetchUsers();
        } catch (error) {
            alert(error.response?.data?.message || "Error deleting user");
        }
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    return (


        <DashboardLayout>

            {
                showModal && (
                    <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onUserCreated={fetchUsers}
                    />
                )
            }

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">
                    Users
                </h1>

                <button
                    onClick={()=> setShowModal(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Create User
                </button>

            </div>

            {
                loading
                    ?

                    <p>Loading...</p>

                    :

                    <table className="w-full bg-white shadow rounded-xl">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-4 text-left">Username</th>

                                <th className="p-4 text-left">Full Name</th>

                                <th className="p-4 text-left">Email</th>

                                <th className="p-4 text-left">Role</th>

                                <th className="p-4 text-left">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-b"
                                    >

                                        <td className="p-4">
                                            {user.username}
                                        </td>

                                        <td className="p-4">
                                            {user.fullName}
                                        </td>

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        <td className="p-4 capitalize">
                                            {user.role}
                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => setSelectedUser(user)}
                                                className="text-blue-600 mr-3"
                                            >
                                                Edit
                                            </button>

                                            {user.role !== "superadmin" && (
                                                <button
                                                onClick={() => deleteUser(user._id)}
                                                className="text-red-600"
                                                >
                                                    Delete
                                                </button>
                                                )
                                            }

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

            }
            {selectedUser && (
                <EditUserModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onUserUpdated={fetchUsers}
                />
                )
            }

        </DashboardLayout>

    );

};

export default Users;