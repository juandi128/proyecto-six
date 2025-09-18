
// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Obtener usuarios existentes del localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el usuario ya existe
    const userExists = existingUsers.some(
      user => user.username === formData.username || user.email === formData.email
    );

    if (userExists) {
      setError("El nombre de usuario o email ya está registrado");
      return;
    }

    // Crear nuevo usuario (en una app real, nunca almacenarías contraseñas en texto plano)
    const newUser = {
      id: Date.now(),
      username: formData.username,
      email: formData.email,
      password: formData.password, // En producción, esto debería estar hasheado
      createdAt: new Date().toISOString()
    };

    // Guardar usuario
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSuccess("¡Registro exitoso! Redirigiendo al login...");

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div>
      <h1>Crear Cuenta</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
};

export default Register;