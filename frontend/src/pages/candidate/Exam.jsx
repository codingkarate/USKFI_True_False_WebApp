import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Exam = () => {

    const { testId } = useParams();

    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeLeft, setTimeLeft] = useState(7 * 60); // 7 minutes
    const [submitting, setSubmitting] = useState(false);
    

    const fetchQuestions = async () => {
        try {

            const res = await api.get(
                `/questions/test/${testId}`
            );
            console.log(res.data);
            setQuestions(res.data.questions);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    useEffect(() => {
        console.log("Route Test ID:", testId);
        fetchQuestions();
    }, [testId]);

    useEffect(() => {
        if (loading) return;
        if (timeLeft <= 0) {
            handleSubmitExam();
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, loading]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;


    const handleSubmitExam = async () => {
        if (submitting) return;

        try {

            setSubmitting(true);

            const formattedAnswers =
                Object.entries(answers).map(
                ([questionId, selectedAnswer]) => ({
                    questionId,
                    selectedAnswer,
                })
            );

            const res = await api.post(
                "/attempts/submit",
                {
                    testId,
                    answers: formattedAnswers,
                    timeTaken: timeLeft,
                }
            );

            navigate("/candidate/result", {
                state: {
                    result: res.data.result,
                },
            });

    } catch (err) {

        console.log(err);

        alert(
            err.response?.data?.message ||
            "Failed to submit exam."
        );

    

        setSubmitting(false);

    }
};

    // const handleSubmitExam = async () => {
    //     try {
    //         const formattedAnswers = Object.entries(answers).map(
    //             ([questionId, selectedAnswer]) => ({
    //                 questionId,
    //                 selectedAnswer,
    //             })
    //         );
    //         console.log("Formatted Answers:", formattedAnswers);
    //         const res = await api.post("/attempts/submit", {
    //             testId,
    //             answers: formattedAnswers,
    //             timeTaken: timeLeft,
    //         });
    //         // console.log(res.data);
    //         console.log("Full Response:", res.data);
    //         console.log("Result:", res.data.result);
    //         console.log("Attempt:", res.data.attempt);
    //         navigate("/candidate/result", {
    //             state: {
    //                 result: res.data.result,
    //             },
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         alert(
    //             err.response?.data?.message ||
    //             "Failed to submit exam."
    //         );
    //     }
    // };

    return (
        <DashboardLayout>
        <div className="p-10">

            <h1 className="text-4xl font-bold mb-8">
                Candidate Examination
            </h1>

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">
                    Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-bold">
                    {minutes}:{seconds.toString().padStart(2, "0")}
                </div>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <div>

                    

                    {questions[currentQuestion] && (

                        <div
                            key={questions[currentQuestion]._id}
                            className="border rounded-xl p-6 mb-6 shadow"
                        >

                            <h3 className="font-semibold mb-4">
                                Q{currentQuestion + 1}. {questions[currentQuestion].question}
                            </h3>

                            <button
                            onClick={() =>
                                handleAnswer(questions[currentQuestion]._id, "True")
                            }
                            className={`block w-full text-left px-4 py-2 mb-2 rounded border ${
                                answers[questions[currentQuestion]._id] === "True"
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                                }`}
                            >
                                {questions[currentQuestion].optionTrue}
                            </button>

                            <button
                            onClick={() =>
                                handleAnswer(questions[currentQuestion]._id, "False")
                            }
                            className={`block w-full text-left px-4 py-2 rounded border ${
                                answers[questions[currentQuestion]._id] === "False"
                                ? "bg-blue-600 text-white"
                                : "bg-white"
                                }`}
                            >
                                {questions[currentQuestion].optionFalse}
                            </button>

                        </div>

                    )}

                </div>

                

            )}
            <div className="flex justify-between mt-8">
                {currentQuestion > 0 && (
                <button
                disabled={currentQuestion === 0}
                onClick={() =>
                    setCurrentQuestion(currentQuestion - 1)
                }
                className="bg-gray-500 text-white px-6 py-2 rounded disabled:opacity-40"
                >
                    Previous
                </button>
                )}

                {currentQuestion === questions.length - 1 ? (
                    <button
                    onClick={handleSubmitExam}
                    disabled={submitting}
                    className="
                     bg-green-600
                     text-white
                     px-6 py-2 rounded
                     disabled:opacity-50
                     disabled:cursor-not-allowed
                     "
                    >
                       {submitting
                       ? "Submitting..."
                       : "Submit Exam"}
                    </button>
                    // <button
                    // onClick={handleSubmitExam}
                    // className="bg-green-600 text-white px-6 py-2 rounded"
                    // >
                    //     Submit Exam
                    // </button>
                    ) : (
                    <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                    >
                        Next
                    </button>
                )}
            </div>

        </div>
        </DashboardLayout>
    );
};

export default Exam;









// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../services/api";

// const Exam = () => {

//     const { testId } = useParams();

//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(true);

//     return (
//         <div className="p-10">

//             <h1 className="text-4xl font-bold">
//                 Candidate Examination
//             </h1>

//             <p className="mt-5">
//                 Test ID:
//             </p>

//             <p className="text-blue-600 font-bold">
//                 {testId}
//             </p>

//         </div>
//     );
// };

// export default Exam;