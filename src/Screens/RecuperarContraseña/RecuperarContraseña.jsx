import React, { useState } from "react";
import Swal from "sweetalert2";
import db from "../../Firestore";

const RecuperarContraseña = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reservedWord, setReservedWord] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleReservedWordChange = (event) => {
    setReservedWord(event.target.value);
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
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handlePasswordRecovery}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nueva contraseña:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="reservedWord">Palabra reservada:</label>
          <input
            type="password"
            id="reservedWord"
            value={reservedWord}
            onChange={handleReservedWordChange}
          />
        </div>
        <div>
          <button type="submit">Recuperar</button>
        </div>
      </form>
      <div>
        <a href="/login">Iniciar sesión</a>
      </div>
    </div>
  );
};

export default RecuperarContraseña;
