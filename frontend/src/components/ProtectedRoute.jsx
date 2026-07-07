import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(user.role)) {

        if (user.role === "superadmin") {
            return <Navigate to="/superadmin/dashboard" replace />;
        }

        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }

        if (user.role === "candidate") {
            return <Navigate to="/candidate/dashboard" replace />;
        }

        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;