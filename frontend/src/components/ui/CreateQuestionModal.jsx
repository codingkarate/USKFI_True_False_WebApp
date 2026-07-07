import { useEffect, useState } from "react";
import api from "../../services/api";

const CreateQuestionModal = ({ onClose, onQuestionCreated }) => {

    const [tests, setTests] = useState([]);

    const [form, setForm] = useState({
        test: "",
        questionNumber: "",
        question: "",
        optionTrue: "True",
        optionFalse: "False",
        correctAnswer: "True",
        explanation: "",
        marks: 1,
    });

    useEffect(() => {
        fetchTests();
    }, []);

    const fetchTests = async () => {
        try {
            const res = await api.get("/tests");
            setTests(res.data.tests);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.post("/questions/add", form);

            alert("Question created successfully");

            onQuestionCreated();

            onClose();

        } catch (err) {
            console.log(err.response);
            console.log(err.response?.data);
            alert(
                JSON.stringify(err.response?.data || err.message)
            );
        }
    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white w-162.5 rounded-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Create Question
                </h2>

                <form onSubmit={handleSubmit}>

                    <select
                        name="test"
                        value={form.test}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                        required
                    >
                        <option value="">
                            Select Test
                        </option>

                        {tests.map((test) => (
                            <option
                                key={test._id}
                                value={test._id}
                            >
                                {test.testName}
                            </option>
                        ))}

                    </select>

                    <input
                        type="number"
                        name="questionNumber"
                        placeholder="Question Number"
                        value={form.questionNumber}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                        required
                    />

                    <textarea
                        name="question"
                        placeholder="Enter Question"
                        value={form.question}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                        rows="3"
                        required
                    />

                    <input
                        type="text"
                        name="optionTrue"
                        value={form.optionTrue}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />

                    <input
                        type="text"
                        name="optionFalse"
                        value={form.optionFalse}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />

                    <select
                        name="correctAnswer"
                        value={form.correctAnswer}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    >
                        <option value="True">
                            True
                        </option>

                        <option value="False">
                            False
                        </option>
                    </select>

                    <textarea
                        name="explanation"
                        placeholder="Explanation"
                        value={form.explanation}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                        rows="3"
                    />

                    <input
                        type="number"
                        name="marks"
                        value={form.marks}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-6"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 px-5 py-2 rounded"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Create
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateQuestionModal;