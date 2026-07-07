import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Dashboard = () => {

    const [stats, setStats] = useState({
        candidates: 0,
        tests: 0,
        questions: 0,
        attempts: 0,
    });

    const fetchData = async () => {
        try {

            const [
                usersRes,
                testsRes,
                questionsRes,
                attemptsRes,
            ] = await Promise.all([
                api.get("/auth/users"),
                api.get("/tests"),
                api.get("/questions"),
                api.get("/attempts"),
            ]);

            console.log(usersRes.data);
            console.log(testsRes.data);
            console.log(questionsRes.data);
            console.log(attemptsRes.data);

            setStats({
                candidates: usersRes.data.users.filter(
                    user => user.role === "candidate"
                ).length,

                tests: testsRes.data.tests.length,
                questions: questionsRes.data.questions.length,
                attempts: attemptsRes.data.attempts.length,
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-6">

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Candidates
                    </p>
                    <h2 className="text-4xl font-bold">
                        {stats.candidates}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Tests
                    </p>
                    <h2 className="text-4xl font-bold">
                        {stats.tests}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Questions
                    </p>
                    <h2 className="text-4xl font-bold">
                        {stats.questions}
                    </h2>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <p className="text-gray-500">
                        Attempts
                    </p>
                    <h2 className="text-4xl font-bold">
                        {stats.attempts}
                    </h2>
                </div>

            </div>

        </DashboardLayout>

    );

};

export default Dashboard;