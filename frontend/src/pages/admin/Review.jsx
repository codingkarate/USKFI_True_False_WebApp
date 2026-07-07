import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Review = () => {

    const { attemptId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [review, setReview] = useState([]);
    const [candidate, setCandidate] = useState(null);
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchReview = async () => {

        try {

            const res = await api.get(
                `/attempts/review/${attemptId}`
            );

            console.log("Review API Response:", res.data);

            console.log(res.data);

            setReview(res.data.review);
            setCandidate(res.data.candidate);
            setTest(res.data.test);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchReview();
    }, []);

    if (loading) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    const isAdmin = location.pathname.startsWith("/admin");

    return (

        <DashboardLayout>

        <div className="min-h-screen bg-gray-100 p-4 sm:p-10">

            <h1 className="text-4xl font-bold mb-4">
                Review Solutions
            </h1>

            <div className="bg-white rounded-lg shadow p-6 mb-8">

                <h2 className="text-2xl font-semibold">
                    {test?.testName}
                </h2>

                <p>
                    Candidate :
                    {" "}
                    {candidate?.fullName}
                </p>

            </div>

            {review.map((item, index) => (

                <div
                    key={item.questionId}
                    className="bg-white rounded-lg shadow p-6 mb-6"
                >

                    <h3 className="font-bold text-xl mb-4">

                        Q{index + 1}. {item.question}

                    </h3>

                    <div className="space-y-2">

                        <p>

                            <strong>
                                {candidate?.fullName}'s Answer :
                            </strong>{" "}
                            <span
                            className={
                                item.isCorrect
                                ? "text-green-600 font-bold"
                                : "text-red-600 font-bold"
                            }
                            >
                                {item.selectedAnswer}
                            </span>

                        </p>

                        <p>

                            <strong>Correct Answer : </strong>

                            <span className="text-green-600 font-bold">

                                {item.correctAnswer}

                            </span>

                        </p>

                        <p>

                            <strong>Explanation :</strong>

                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">

                            {item.explanation}

                        </div>

                    </div>

                </div>

            ))}

            <div className="text-center mt-10">

                <button
                    onClick={() =>
                        navigate("/admin/results")
                    }
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg"
                >
                    Back to Dashboard
                </button>

            </div>

        </div>
        </DashboardLayout>

    );

};

export default Review;