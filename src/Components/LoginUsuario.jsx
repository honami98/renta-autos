import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import db from "../Firestore";
import "../Css/Login.css";
import { Link, useNavigate } from "react-router-dom";

const LoginUsuario = () => {
  const navigate = useNavigate();
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

  const handleInicioSesion = (ruta) => {
    Swal.fire({
      title: "Iniciando sesión",
      text: "Por favor, espera un momento...",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          navigate(ruta);
          Swal.close();
        }, 2000); // Simula un inicio de sesión que tarda 2 segundos
      },
    });
  };

  const handleUsuarioNoExistente = (ruta) => {
    Swal.fire({
      title: "Usuario no encontrado",
      text: "Este usuario no existe",
      icon: "error",
      confirmButtonText: "Aceptar",
    }).then(() => {
      navigate(ruta);
    });
  };

  const handleCamposVacios = () => {
    Swal.fire({
      title: "Campos vacíos",
      text: "Por favor, completa todos los campos",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const onSave = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      handleCamposVacios();
      return;
    }

    const existingUserQuerySnapshot = await db
      .collection("users")
      .where("userName", "==", username)
      .where("password", "==", password)
      .get();

    if (!existingUserQuerySnapshot.empty) {
      // El usuario existe, inicia sesión o realiza alguna acción adicional
      setMessage("El usuario existe. Iniciando sesión...");
      handleInicioSesion("/RegistrarUsuario");
      // Agrega aquí la lógica para iniciar sesión o realizar la acción deseada con el usuario existente
    } else {
      handleUsuarioNoExistente("/RegistrarUsuario");
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
      {message && <p className={isError ? "error" : "success"}>{message}</p>}
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
