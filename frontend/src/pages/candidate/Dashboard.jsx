import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";
const Dashboard = () => {
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAttempts = async () => {
        try {
            const res = await api.get("/attempts/my-attempts");

            console.log(res.data);

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

            <h1 className="text-4xl font-bold mb-10">
                Candidate Dashboard
            </h1>

            <h2 className="text-2xl font-semibold mb-6">
                My Previous Attempts
            </h2>

            {loading ? (

                <p>Loading...</p>

            ) : attempts.length === 0 ? (

                <div className="bg-white rounded-xl shadow p-8 text-center">
                    No attempts found.
                </div>

            ) : (

                attempts.map((attempt) => (

                    <div
                        key={attempt._id}
                        className="bg-white rounded-xl shadow p-6 mb-6"
                    >

                        <h3 className="text-2xl font-bold mb-3">
                            {attempt.test.testName}
                        </h3>

                        <p>
                            <strong>Score :</strong>{" "}
                            {attempt.obtainedMarks} / {attempt.totalMarks}
                        </p>

                        <p>
                            <strong>Percentage :</strong>{" "}
                            {attempt.percentage}%
                        </p>

                        <p>
                            <strong>Time Taken :</strong>{" "}
                            {Math.floor(attempt.timeTaken / 60)} min{" "}
                            {attempt.timeTaken % 60} sec
                        </p>

                        <p>
                            <strong>Submitted :</strong>{" "}
                            {new Date(attempt.createdAt).toLocaleString()}
                        </p>

                        <div className="flex gap-4 mt-5">

                            <button
                                onClick={() =>
                                    navigate("/candidate/result", {
                                        state: {
                                            result: {
                                                attemptId: attempt._id,
                                                totalMarks: attempt.totalMarks,
                                                obtainedMarks: attempt.obtainedMarks,
                                                percentage: attempt.percentage,
                                            },
                                        },
                                    })
                                }
                                className="bg-blue-600 text-white px-5 py-2 rounded"
                            >
                                View Result
                            </button>

                            <button
                                onClick={() =>
                                    navigate(`/candidate/review/${attempt._id}`)
                                }
                                className="bg-green-600 text-white px-5 py-2 rounded"
                            >
                                Review Solutions
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    </DashboardLayout>
    );

    
};

export default Dashboard;



// return (
//         <div className="p-10">

//             <h1 className="text-4xl font-bold mb-10">
//                 Candidate Dashboard
//             </h1>

//             <h2 className="text-2xl font-semibold mb-6">
//                 My Previous Attempts
//             </h2>

//             {loading ? (

//                 <p>Loading...</p>

//             ) : attempts.length === 0 ? (

//                 <div className="bg-white rounded-xl shadow p-8 text-center">
//                     No attempts found.
//                 </div>

//             ) : (

//                 attempts.map((attempt) => (

//                     <div
//                         key={attempt._id}
//                         className="bg-white rounded-xl shadow p-6 mb-6"
//                     >

//                         <h3 className="text-2xl font-bold mb-3">
//                             {attempt.test.testName}
//                         </h3>

//                         <p>
//                             <strong>Score :</strong>{" "}
//                             {attempt.obtainedMarks} / {attempt.totalMarks}
//                         </p>

//                         <p>
//                             <strong>Percentage :</strong>{" "}
//                             {attempt.percentage}%
//                         </p>

//                         <p>
//                             <strong>Time Taken :</strong>{" "}
//                             {Math.floor(attempt.timeTaken / 60)} min{" "}
//                             {attempt.timeTaken % 60} sec
//                         </p>

//                         <p>
//                             <strong>Submitted :</strong>{" "}
//                             {new Date(
//                                 attempt.createdAt
//                             ).toLocaleString()}
//                         </p>

//                         <div className="flex gap-4 mt-5">

//                             <button
//                                 onClick={() =>
//                                     navigate("/candidate/result", {
//                                         state: {
//                                             result: {
//                                                 attemptId: attempt._id,
//                                                 totalMarks:
//                                                     attempt.totalMarks,
//                                                 obtainedMarks:
//                                                     attempt.obtainedMarks,
//                                                 percentage:
//                                                     attempt.percentage,
//                                             },
//                                         },
//                                     })
//                                 }
//                                 className="bg-blue-600 text-white px-5 py-2 rounded"
//                             >
//                                 View Result
//                             </button>

//                             <button
//                                 onClick={() =>
//                                     navigate(
//                                         `/candidate/review/${attempt._id}`
//                                     )
//                                 }
//                                 className="bg-green-600 text-white px-5 py-2 rounded"
//                             >
//                                 Review Solutions
//                             </button>

//                         </div>

//                     </div>

//                 ))

//             )}

//         </div>
//     );