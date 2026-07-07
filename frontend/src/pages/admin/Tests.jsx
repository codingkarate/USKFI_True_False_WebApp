import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Tests = () => {

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTests = async () => {

        try {

            const res = await api.get("/tests");

            setTests(res.data.tests);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTests();

    }, []);

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">
                    Tests
                </h1>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <table className="w-full bg-white shadow rounded-xl">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Test Name
                            </th>

                            <th className="p-4 text-left">
                                Duration
                            </th>

                            <th className="p-4 text-left">
                                Questions
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tests.map((test) => (

                            <tr
                                key={test._id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {test.testName}
                                </td>

                                <td className="p-4">
                                    {test.duration} mins
                                </td>

                                <td className="p-4">
                                    {test.totalQuestions}
                                </td>

                                <td className="p-4">
                                    {test.status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Tests;