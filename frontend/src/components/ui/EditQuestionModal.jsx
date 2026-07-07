import { useState } from "react";
import api from "../../services/api";

const EditQuestionModal = ({
    question,
    onClose,
    onQuestionUpdated,
}) => {

    const [form, setForm] = useState({
        question: question.question,
        optionTrue: question.optionTrue,
        optionFalse: question.optionFalse,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        marks: question.marks,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(`/questions/${question._id}`, form);

            alert("Question updated successfully");

            onQuestionUpdated();

            onClose();

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Error updating question"
            );

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white w-[650px] max-h-[90vh] overflow-y-auto rounded-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Question
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <textarea
                        name="question"
                        value={form.question}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                        rows={3}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="optionTrue"
                            value={form.optionTrue}
                            onChange={handleChange}
                            className="border p-3 rounded"
                            required
                        />

                        <input
                            type="text"
                            name="optionFalse"
                            value={form.optionFalse}
                            onChange={handleChange}
                            className="border p-3 rounded"
                            required
                        />

                    </div>

                    <select
                        name="correctAnswer"
                        value={form.correctAnswer}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                    >
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>

                    <textarea
                        name="explanation"
                        value={form.explanation}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
                        rows={3}
                    />

                    <input
                        type="number"
                        name="marks"
                        value={form.marks}
                        onChange={handleChange}
                        className="border p-3 rounded w-full"
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
                            Update
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditQuestionModal;