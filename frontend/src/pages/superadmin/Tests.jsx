import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";
import CreateTestModal from "../../components/ui/CreateTestModal";
import EditTestModal from "../../components/ui/EditTestModal";

const Tests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const fetchTests = async () => {
    try {
      const res = await api.get("/tests");

      setTests(res.data.tests);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTest = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this test?"
    );
    
    if (!confirmDelete) return;
    try {
      await api.delete(`/tests/${id}`);

        alert("Test deleted successfully");

        fetchTests();

    } catch (err) {

        alert(err.response?.data?.message || "Error deleting test");
      }
    };

  useEffect(() => {
    fetchTests();
  }, []);

  const openEditModal = (test) => {
    console.log(test)
    setSelectedTest(test);
    setShowEditModal(true);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-2xl sm:text-4xl font-bold">
          Tests
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Create Test
        </button>

      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 text-left">
                  Test Name
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Questions
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

          <tbody>

            {tests.map((test) => (

              <tr
                key={test._id}
                className="border-b"
              >

                <td className="p-3 sm:p-4">
                  {test.testName}
                </td>

                <td className="p-3 sm:p-4">
                  {test.duration} mins
                </td>

                <td className="p-3 sm:p-4">
                  {test.totalQuestions}
                </td>

                <td className="p-3 sm:p-4">
                  {test.status}
                </td>

                <td className="p-3 sm:p-4">

                  <button
                     onClick={() => {
                        console.log("Edit clicked", test);
                        openEditModal(test);
                    }}
                    // onClick={() => openEditModal(test)} 
                    className="text-blue-600 mr-2 sm:mr-3">
                    Edit
                  </button>

                  <button
                  onClick={() => deleteTest(test._id)} 
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
        <CreateTestModal
        onClose={() => setShowModal(false)}
        onTestCreated={fetchTests}
        />
        )
      }
      {showEditModal && selectedTest && (
        <EditTestModal
        test={selectedTest}
        onClose={() => setShowEditModal(false)}
        onTestUpdated={() => {
            fetchTests();
            setShowEditModal(false);
        }}
        />
        )
       }
       
    </DashboardLayout>
  );
};

export default Tests;