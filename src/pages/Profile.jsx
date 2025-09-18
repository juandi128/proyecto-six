// src/pages/Profile.jsx
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return <h1>Perfil de {user?.name}</h1>;
}