import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import SuperAdminDashboard from "../pages/superadmin/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import CandidateDashboard from "../pages/candidate/Dashboard";

import Users from "../pages/superadmin/Users";
import Tests from "../pages/superadmin/Tests";
import Questions from "../pages/superadmin/Questions";
import Results from "../pages/superadmin/Results";

import CandidateTest from "../pages/candidate/Test";
import Exam from "../pages/candidate/Exam";
import Result from "../pages/candidate/Result";
import Review from "../pages/candidate/Review";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminUsers from "../pages/admin/Users";
import AdminTests from "../pages/admin/Tests";
import AdminQuestions from "../pages/admin/Questions";
import AdminResults from "../pages/admin/Results";
import AdminReview from "../pages/admin/Review";


function AppRoutes() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* ================= SUPERADMIN ================= */}

      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/users"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/tests"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <Tests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/questions"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <Questions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/superadmin/results"
        element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <Results />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
      path="/admin/dashboard"
      element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
      }
      />
     <Route
     path="/admin/users"
     element={
     <ProtectedRoute allowedRoles={["admin"]}>
      <AdminUsers />
    </ProtectedRoute>
    }
    />

    <Route
    path="/admin/tests"
    element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminTests />
    </ProtectedRoute>
    }
    />

   <Route
   path="/admin/questions"
   element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminQuestions />
    </ProtectedRoute>
   }
   />

   <Route
    path="/admin/results"
    element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminResults />
    </ProtectedRoute>
   }
   />

   <Route
    path="/admin/review/:attemptId"
    element={<AdminReview />}
   />

      {/* ================= CANDIDATE ================= */}

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/tests"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <CandidateTest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/exam/:testId"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Exam />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/result"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/review/:attemptId"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
            <Review />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;



















// import { Routes, Route } from "react-router-dom";

// import Login from "../pages/auth/Login";
// import ProtectedRoute from "../components/ProtectedRoute";
// import SuperAdminDashboard from "../pages/superadmin/Dashboard";
// import AdminDashboard from "../pages/admin/Dashboard";
// import CandidateDashboard from "../pages/candidate/Dashboard";
// import Users from "../pages/superadmin/Users";
// import Tests from "../pages/superadmin/Tests";
// import Questions from "../pages/superadmin/Questions";
// import CandidateTest from "../pages/candidate/Test";
// import Exam from "../pages/candidate/Exam";
// import Result from "../pages/candidate/Result";
// import Review from "../pages/candidate/Review";
// import Results from "../pages/superadmin/Results";

// function AppRoutes() {
//   return (
//     <Routes>

//       <Route
//        path="/superadmin/results"
//        element={<Results />}
//       />

//       <Route
//       path="/candidate/result"
//       element={<Result />}
//       />

//       <Route
//       path="/candidate/review/:attemptId"
//       element={<Review />}
//       />

//       <Route
//       path="/candidate/tests"
//       element={<CandidateTest />}
//       />

//       <Route
//       path="/candidate/exam/:testId"
//       element={<Exam />}
//       />

//       <Route path="/" element={<Login />} />

//       <Route
//         path="/superadmin/tests"
//         element={<Tests />}
//       />

//       <Route
//         path="/superadmin/questions"
//         element={<Questions />}
//       />

//       <Route
//       path="/superadmin/dashboard"
//       element={
//       <ProtectedRoute
//       allowedRoles={["superadmin"]}
//       >
//         <SuperAdminDashboard />
//       </ProtectedRoute>
//       }
//      />
//       <Route
//         path="/admin/dashboard"
//         element={<AdminDashboard />}
//       />

//       <Route
//         path="/candidate/dashboard"
//         element={<CandidateDashboard />}
//       />

//       <Route 
//         path="/superadmin/users"
//         element={<Users />}
//       />


//     </Routes>

    
//   );
// }

// export default AppRoutes;