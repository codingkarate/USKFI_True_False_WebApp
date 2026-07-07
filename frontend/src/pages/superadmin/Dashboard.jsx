import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import api from "../../services/api";

// import DashboardLayout from "../../components/layout/DashboardLayout";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [resultCount, setResultCount] = useState(0);
   useEffect(() => {
    fetchUsers();
  }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const response = await api.get("/auth/users");
  //     setUserCount(response.data.count);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/auth/users");
      
      console.log("Users API Response:", response.data);
      setUserCount(response.data.count);

      const tests = await api.get("/tests");
      setTestCount(tests.data.count);

      const questions = await api.get("/questions");
      setQuestionCount(questions.data.count);

      const attempts = await api.get("/attempts");
      setResultCount(attempts.data.count);

      console.log("Setting userCount =", response.data.count);
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Response:", error.response);
    }
  };

  console.log("Current userCount =", userCount);

  return (

    
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8">
        Superadmin Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-3xl mt-4">{userCount}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Tests</h2>
          <p className="text-3xl mt-4">{testCount}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Questions</h2>
          <p className="text-3xl mt-4">{questionCount}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold">Results</h2>
          <p className="text-3xl mt-4">{resultCount}</p>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;









// const SuperAdminDashboard = () => {
//   return (
//     <h1 className="text-4xl font-bold p-10">
//       Superadmin Dashboard
//     </h1>
//   );
// };

// export default SuperAdminDashboard;