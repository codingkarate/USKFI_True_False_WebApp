import { useState } from "react";
import api from "../../services/api";

const CreateTestModal = ({ onClose, onTestCreated }) => {

    const [form, setForm] = useState({
        testName: "",
        duration: "",
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

            await api.post("/tests/create", form);

            alert("Test created successfully");

            onTestCreated();

            onClose();

        } catch (err) {

            alert(err.response?.data?.message || "Error creating test");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white w-[500px] rounded-xl p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Create Test
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
                            Create
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateTestModal;