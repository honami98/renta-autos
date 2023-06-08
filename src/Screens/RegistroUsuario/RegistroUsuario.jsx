import React, { useState } from "react";
import db from "../../Firestore";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";

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
        Swal.fire({
          icon: "error",
          title: "Campos vacíos",
          text: "Por favor, complete todos los campos",
        });
        return;
      }

      await db.collection("users").add(formData);

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: "Usuario registrado correctamente",
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
    <>
      <Navbar/>
      <div class="container">
        <h2>Registrar usuario</h2>
        {message && <p class="success">{message}</p>}
        {error && <p class="error">{error}</p>}
        <form class="form" onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              class="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              class="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="role">Rol:</label>
            <select
              id="role"
              name="role"
              class="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              class="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleClear}
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistroUsuario;
