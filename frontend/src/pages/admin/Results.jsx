import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Results = () => {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttempts = async () => {

        try {

            const res = await api.get("/attempts");

            setAttempts(res.data.attempts);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAttempts();

    }, []);

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Candidate Results
            </h1>

            {loading ? (

                <p>Loading...</p>

            ) : (
                <div className="overflow-x-auto">

                <table className="w-full bg-white shadow rounded-xl">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Candidate
                            </th>

                            <th className="p-4 text-left">
                                Test
                            </th>

                            <th className="p-4 text-left">
                                Score
                            </th>

                            <th className="p-4 text-left">
                                Percentage
                            </th>

                            <th className="p-4 text-left">
                                Submitted
                            </th>

                            <th className="p-4 text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {attempts.map((attempt) => (

                            <tr
                                key={attempt._id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {attempt.candidate?.fullName || "Deleted User"}
                                </td>

                                <td className="p-4">
                                    {attempt.test?.testName || "Deleted Test"}
                                </td>

                                <td className="p-4">
                                    {attempt.obtainedMarks} / {attempt.totalMarks}
                                </td>

                                <td className="p-4">
                                    {attempt.percentage}%
                                </td>

                                <td className="p-4">
                                    {new Date(attempt.createdAt).toLocaleString()}
                                </td>

                                <td className="p-4 flex justify-center flex-col sm:flex-row gap-2">

                                    

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/review/${attempt._id}`
                                            )
                                        }
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Review Answers
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
                </div>

            )}

        </DashboardLayout>

    );

};

export default Results;