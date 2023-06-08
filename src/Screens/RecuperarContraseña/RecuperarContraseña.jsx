import React, { useState } from "react";
import Swal from "sweetalert2";
import db from "../../Firestore";
import Navbar from "../../Components/Navbar/Navbar";

const RecuperarContraseña = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reservedWord, setReservedWord] = useState("");
  const [canChangePassword, setCanChangePassword] = useState(false);

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
      if (username === "" || reservedWord === "") {
        // Mostrar una alerta de error si los campos están vacíos
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, complete todos los campos",
        });
        return;
      }

      const existingUserQuerySnapshot = await db
        .collection("users")
        .where("username", "==", username)
        .where("reservword", "==", reservedWord)
        .get();

      if (!existingUserQuerySnapshot.empty) {
        // Mostrar una alerta de éxito si el usuario existe
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "El usuario existe. Puede cambiar la contraseña.",
        });
        setCanChangePassword(true);
      } else {
        // Mostrar una alerta de error si el usuario no existe
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró el usuario",
        });
      }
    } catch (error) {
      console.error("Error al recuperar la contraseña:", error);
      // Mostrar una alerta de error genérico utilizando SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al recuperar la contraseña",
      });
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      const existingUserQuerySnapshot = await db
        .collection("users")
        .where("username", "==", username)
        .where("reservword", "==", reservedWord)
        .get();

      if (!existingUserQuerySnapshot.empty) {
        const userRef = existingUserQuerySnapshot.docs[0].ref;
        await userRef.update({
          password: newPassword,
        });

        // Mostrar una alerta de éxito si la contraseña se cambió correctamente
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Contraseña actualizada correctamente",
        });

        // Restablecer los campos del formulario
        setUsername("");
        setNewPassword("");
        setReservedWord("");
        setCanChangePassword(false);
      } else {
        // Mostrar una alerta de error si el usuario no existe
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró el usuario",
        });
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      // Mostrar una alerta de error genérico utilizando SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al cambiar la contraseña",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mt-4 mb-4">Recuperar contraseña</h2>
        <form
          onSubmit={
            canChangePassword ? handleChangePassword : handlePasswordRecovery
          }
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {canChangePassword && (
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Nueva contraseña:
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="reservedWord" className="form-label">
              Palabra reservada:
            </label>
            <input
              type="password"
              id="reservedWord"
              name="reservedWord"
              value={reservedWord}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              {canChangePassword ? "Cambiar contraseña" : "Recuperar"}
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
