// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav >
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Logo_biblioteca_H.jpg" alt="" />
      <Link to="/">Inicio</Link>

      {!user ? (
        <Link to="/login">Iniciar sesión</Link>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/user">User</Link>
          <Link to="/escritores">Autores</Link>
          <Link to="/libros">Libros</Link>
          <Link to="/prestamos">Prestamo</Link>
          <Link to="/profile">Perfil</Link>
          <span>{user.name}</span>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
}