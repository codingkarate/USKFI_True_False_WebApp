import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

const Questions = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuestions = async () => {

        try {

            const res = await api.get("/questions");

            setQuestions(res.data.questions);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchQuestions();

    }, []);

    return (

        <DashboardLayout>

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-4xl font-bold">
                    Questions
                </h1>

            </div>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <table className="w-full bg-white shadow rounded-xl">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Question
                            </th>

                            <th className="p-4 text-left">
                                Options
                            </th>

                            <th className="p-4 text-left">
                                Marks
                            </th>

                            <th className="p-4 text-left">
                                Test
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {questions.map((question) => (

                            <tr
                                key={question._id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {question.question}
                                </td>

                                <td className="p-4">
                                    {question.optionTrue} / {question.optionFalse}
                                </td>

                                <td className="p-4">
                                    {question.marks}
                                </td>

                                <td className="p-4">
                                    {question.test?.testName}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </DashboardLayout>

    );

};

export default Questions;