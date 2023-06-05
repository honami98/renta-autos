import React, { useState } from "react";
import db from "../Firestore";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    role: "usuario",
    password: "",
  });

  const [state, setState] = useState({
    error: "",
    message: "",
  });

  const { error, message } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (
        formData.username === "" ||
        formData.name === "" ||
        formData.password === ""
      ) {
        throw new Error("Por favor, complete todos los campos");
      }

      await db.collection("users").add(formData);

      setState({
        message: "Usuario registrado correctamente",
        error: "",
      });

      setFormData({
        username: "",
        name: "",
        role: "usuario",
        password: "",
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setState({
        message: "",
        error: "Ocurrió un error al registrar el usuario",
      });
    }
  };

  const handleClear = () => {
    setFormData({
      username: "",
      name: "",
      role: "usuario",
      password: "",
    });

    setState({
      error: "",
      message: "",
    });
  };

  return (
    <div>
      <h2>Registrar usuario</h2>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="administrador">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Registrar</button>
          <button type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistroUsuario;
