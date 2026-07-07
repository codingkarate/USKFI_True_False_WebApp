import { useState } from "react";
import api from "../../services/api";

const EditTestModal = ({ test, onClose, onTestUpdated }) => {

    const [form, setForm] = useState({
        testName: test.testName,
        duration: test.duration,
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

            await api.put(`/tests/${test._id}`, form);

            alert("Test editing done successfully");

            onTestUpdated();

            onClose();

        } catch (err) {

            alert(err.response?.data?.message || "Error updating test");

        }

    };

    return (


        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white w-[500px] rounded-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Edit Test
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="testName"
                        placeholder="Test Name"
                        value={form.testName}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                        required
                    />

                    <input
                        type="number"
                        name="duration"
                        placeholder="Duration (minutes)"
                        value={form.duration}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-6"
                        required
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

export default EditTestModal;