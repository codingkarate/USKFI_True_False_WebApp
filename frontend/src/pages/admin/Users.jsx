import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {

        fetchUsers();

    }, []);

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">
                    Candidates
                </h1>

            </div>

            {
                loading ?

                    <p>Loading...</p>

                    :

                    <table className="w-full bg-white shadow rounded-xl">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-4 text-left">
                                    Username
                                </th>

                                <th className="p-4 text-left">
                                    Full Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Role
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                users
                                    .filter(user => user.role === "candidate")
                                    .map((user) => (

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

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

            }

        </DashboardLayout>

    );

};

export default Users;