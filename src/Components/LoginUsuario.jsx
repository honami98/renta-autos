import React, { useState } from "react";
import db from "../Firestore";
import "../Css/Login.css";
import { Link } from "../../node_modules/react-router-dom/dist/index";

const LoginUsuario = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();

    const existingUserQuerySnapshot = await db
      .collection("users")
      .where("userName", "==", username)
      .get();

    if (!existingUserQuerySnapshot.empty) {
      // El usuario existe, inicia sesión o realiza alguna acción adicional
      setMessage("El usuario existe. Iniciando sesión...");
      // Agrega aquí la lógica para iniciar sesión o realizar la acción deseada con el usuario existente
    } else {
      setIsError("El usuario no existe");
    }
    // Restablece el estado
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(event);
  };
  

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {message && <p className={isError ? "error" : "sucess"}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
      <div>
        <Link to="/RegistrarUsuario">Registrar usuario</Link>
      </div>
      <div>
        <Link to="/forgot-passwor">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default LoginUsuario;
