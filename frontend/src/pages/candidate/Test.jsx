import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const AvailableTests = () => {

    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const fetchTests = async () => {

        try {

            const res = await api.get("/tests");

            console.log(res.data);
            console.log(res.data.tests);

            setTests(res.data.tests);

        } catch (err) {
            console.log(err);
            console.log(err.response);
            console.log(err.response?.data);
        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTests();

    }, []);

    return (

        <DashboardLayout>

            <h1 className="text-4xl font-bold mb-8">
                Available Tests
            </h1>

            {
                loading
                ?
                <p>Loading...</p>
                :
                <div className="grid md:grid-cols-2 gap-6">

                    {tests.map((test) => (

                        <div
                            key={test._id}
                            className="bg-white shadow rounded-xl p-6"
                        >

                            <h2 className="text-2xl font-bold">
                                {test.testName}
                            </h2>

                            <p className="mt-2">
                                Duration : {test.duration} mins
                            </p>

                            <p>
                                Questions : {test.totalQuestions}
                            </p>

                            <button
                                onClick={() => navigate(`/candidate/exam/${test._id}`)}
                                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
                            >
                                Start Test
                            </button>

                        </div>

                    ))}

                </div>
            }

        </DashboardLayout>

    );

};

export default AvailableTests;