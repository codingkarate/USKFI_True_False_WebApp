import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import CreateQuestionModal from "../../components/ui/CreateQuestionModal";
import EditQuestionModal from "../../components/ui/EditQuestionModal";

const Questions = () => {

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const fetchQuestions = async () => {

        try {
            const res = await api.get("/questions");
            console.log(res.data.questions);
            setQuestions(res.data.questions);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (question) => {
        setSelectedQuestion(question);
        setShowEditModal(true);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );
        if (!confirmDelete) return;
        try {
            await api.delete(`/questions/${id}`);
            alert("Question deleted successfully");
            fetchQuestions();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Error deleting question"
            );
        }

};

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">
                    Questions
                </h1>
                <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    + Create Question
                </button>

            </div>

            {/* Table */}
            {loading ? (
                <p>Loading...</p>
            ) : (
            <div className="overflow-x-auto">    
            <table className="w-full bg-white shadow rounded-xl">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 text-left">Question</th>
                        <th className="p-4 text-left">Type</th>
                        <th className="p-4 text-left">Marks</th>
                        <th className="p-4 text-left">Test</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr
                        key={question._id}
                        className="border-b"
                        >
                            <td className="p-4 wrap-break-word max-w-sm">
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

                            <td className="p-4">
                                <button 
                                onClick={() => openEditModal(question)}
                                className="text-blue-600 mr-3">
                                    Edit
                                </button>

                                <button 
                                onClick={() => handleDelete(question._id)}
                                className="text-red-600">
                                    Delete
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            </div>
        )}
        {showModal && (
            <CreateQuestionModal
            onClose={() => setShowModal(false)}
            onQuestionCreated={fetchQuestions}
            />
        )}

        {showEditModal && (
            <EditQuestionModal
            question={selectedQuestion}
            onClose={() => setShowEditModal(false)}
            onQuestionUpdated={() => {
                fetchQuestions();
                setShowEditModal(false);
            }}
            />
            )}

    </DashboardLayout>
    );
};

export default Questions;