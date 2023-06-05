import React, { useState } from "react";
import db from "../Firestore";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    role: "usuario",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      await db.collection("users").add(formData);

      setMessage("Usuario registrado correctamente");
      setError("");
      // Luego puedes realizar acciones adicionales, como mostrar un mensaje de éxito o redirigir al usuario a otra página
      // También puedes limpiar los campos llamando a la función setFormData con los valores iniciales
      setFormData({
        username: "",
        name: "",
        role: "usuario",
        password: "",
      });
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("Ocurrió un error al registrar el usuario");
      setMessage("");
    }
  };

  const handleClear = () => {
    // Limpiar los campos llamando a la función setFormData con los valores iniciales
    setFormData({
      username: "",
      name: "",
      role: "usuario",
      password: "",
    });
    setError("");
    setMessage("");
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
