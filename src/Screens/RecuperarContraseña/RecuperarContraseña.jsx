import React, { useState } from "react";
import Swal from "sweetalert2";
import db from "../../Firestore";
import Navbar from "../../Components/Navbar/Navbar";

const RecuperarContraseña = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reservedWord, setReservedWord] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "username") {
      setUsername(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "reservedWord") {
      setReservedWord(value);
    }
  };

  const handlePasswordRecovery = async (event) => {
    event.preventDefault();

    try {
      const userRef = db.collection("users").doc(username);
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();

        if (userData.reservedWord === reservedWord) {
          await db.auth().sendPasswordResetEmail(userData.email);

          // Mostrar un mensaje de éxito utilizando SweetAlert
          Swal.fire({
            icon: "success",
            text: "Se ha enviado un correo electrónico para restablecer la contraseña.",
          });

          // Restablecer los campos del formulario
          setUsername("");
          setNewPassword("");
          setReservedWord("");
          return;
        }
      }

      // Mostrar un mensaje de error si las credenciales no coinciden
      Swal.fire({
        icon: "error",
        text: "Credenciales inválidas",
      });
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error);
      // Mostrar un mensaje de error genérico utilizando SweetAlert
      Swal.fire({
        icon: "error",
        text: "Ocurrió un error al recuperar la contraseña",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Recuperar contraseña</h2>
        <form onSubmit={handlePasswordRecovery}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva contraseña:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservedWord">Palabra reservada:</label>
            <input
              type="password"
              id="reservedWord"
              name="reservedWord"
              value={reservedWord}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Recuperar
            </button>
          </div>
        </form>
        <div>
          <a href="/login">Iniciar sesión</a>
        </div>
      </div>
    </>
  );
};

export default RecuperarContraseña;
