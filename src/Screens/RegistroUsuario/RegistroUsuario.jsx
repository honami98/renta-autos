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
    reservword: "", // Nuevo campo para reservword
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
        formData.password === "" ||
        formData.reservword === "" // Verifica que el campo de reservword no esté vacío
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
        reservword: "", // Restablece el campo de reservword a un valor vacío
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
      reservword: "", // Restablece el campo de reservword a un valor vacío
    });

    setState({
      error: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Registrar usuario</h2>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Rol:</label>
            <select
              id="role"
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="administrador">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservword">Palabra Reservada</label>
            <input
              type="text"
              id="reservword"
              name="reservword"
              className="form-control"
              value={formData.reservword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
