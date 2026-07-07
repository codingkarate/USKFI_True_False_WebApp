import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminDashboard = () => {

    const [stats, setStats] = useState({
        candidates: 0,
        tests: 0,
        questions: 0,
        attempts: 0,
    });

    const fetchDashboard = async () => {

        try {

            const [
                usersRes,
                testsRes,
                questionsRes,
                attemptsRes,
            ] = await Promise.all([

                api.get("/users"),
                api.get("/tests"),
                api.get("/questions"),
                api.get("/attempts"),

            ]);

            const candidates =
                usersRes.data.users.filter(
                    (user) => user.role === "candidate"
                ).length;

            setStats({

                candidates,

                tests: testsRes.data.count,

                questions: questionsRes.data.count,

                attempts: attemptsRes.data.count,

            });

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchDashboard();

    }, []);

    return (

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-10">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">
                        Candidates
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {stats.candidates}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">
                        Tests
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {stats.tests}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">
                        Questions
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {stats.questions}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow p-6">

                    <h2 className="text-gray-500">
                        Attempts
                    </h2>

                    <p className="text-4xl font-bold mt-3">
                        {stats.attempts}
                    </p>

                </div>

            </div>

        </div>

    );

};

export default AdminDashboard;