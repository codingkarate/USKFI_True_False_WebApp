import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
        const response = await api.post("/auth/login", {
            username,
            password,
        });
        const user = response.data.user;
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        
        if (user.role === "superadmin") {
            navigate("/superadmin/dashboard");
        } else if (user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/candidate/dashboard");
        }
    
    } catch (error) {
        alert(
            error.response?.data?.message || "Login Failed"
        );
    } finally {
        setLoading(false);
    }
};


  return (

    <div className="min-h-screen bg-slate-900 flex items-center justify-center">

      <div className="bg-white rounded-xl shadow-xl w-96 p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          USKFI REFEREE JUDGE CLASS TEST WEB-APP
        </h1>

        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-3 rounded-lg mb-4"
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 rounded-lg mb-6"
        />

        <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
            {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>

  );
}

export default Login;