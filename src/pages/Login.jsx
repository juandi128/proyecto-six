// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Buscar usuario por username y contraseña
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Iniciar sesión exitosamente
      login(user);
      navigate("/dashboard"); // Cambiado: ahora redirige al dashboard
    } else {
      setError("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div>
        <h1>Iniciar Sesión</h1>
        {error && <p style={{color: "red"}}>{error}</p>}
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar sesión</button>
            <p>
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
            <p>
                ¿Olvidaste tu contraseña? <Link to="/forgot-password">Recupera tu contraseña</Link>
            </p>
        </form>
    </div>
  );
};

export default Login;