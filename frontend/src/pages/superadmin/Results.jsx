import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Results = () => {

    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttempts = async () => {

        try {

            const res = await api.get("/attempts");

            res.data.attempts.forEach((attempt, index) => {
                console.log(index, attempt);
            });

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

        <div className="p-10">

            <h1 className="text-4xl font-bold mb-8">
                Candidate Results
            </h1>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <table className="w-full border shadow rounded">

                    <thead className="bg-gray-100">

                        <tr>

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
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {attempts.map((attempt) => (

                            <tr
                                key={attempt._id}
                                className="border-t hover:bg-gray-50"
                            >

                                <td className="p-4">
                                    {attempt.candidate.fullName}
                                </td>

                                <td className="p-4">
                                    {attempt.test.testName}
                                </td>

                                <td className="p-4">
                                    {attempt.obtainedMarks} /
                                    {attempt.totalMarks}
                                </td>

                                <td className="p-4">
                                    {attempt.percentage}%
                                </td>

                                <td className="p-4">
                                    {new Date(
                                        attempt.createdAt
                                    ).toLocaleString()}
                                </td>

                                <td className="p-4 flex gap-3 justify-center">

                                    <td>
                                        <button
                                        onClick={() =>
                                            navigate(`/admin/review/${attempt._id}`)
                                        }
                                        className="bg-green-600 text-white px-5 py-2 rounded"
                                        >
                                            Review Answers
                                        </button>
                                    </td>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
        </DashboardLayout>

    );

};

export default Results;