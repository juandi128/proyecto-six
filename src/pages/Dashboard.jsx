// src/pages/Dashboard.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, <strong>{user?.username}</strong>!</p>
      <p>Email: {user?.email}</p>
      <p>Te registraste el: {new Date(user?.createdAt).toLocaleDateString()}</p>

      <div>
        <h2>Opciones</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Dashboard;