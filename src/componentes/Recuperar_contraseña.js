import React, { useState } from 'react';
//import firebase from 'firebase'; // Importa la biblioteca de Firebase

const Recuperar_contraseña = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reservedWord, setReservedWord] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    /*try {
      // Verifica si el usuario y la palabra reservada coinciden con los registrados en la base de datos de Firebase
      const userRef = firebase.firestore().collection('user').doc(username);
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();

        if (userData.reservedWord === reservedWord) {
          // Actualiza la contraseña en la base de datos de Firebase
          await userRef.update({
            password: newPassword,
          });

          // Mostrar un mensaje de éxito o redirigir a una página de éxito
          console.log('Contraseña actualizada con éxito');
          // Restablecer los campos del formulario
          setUsername('');
          setNewPassword('');
          setReservedWord('');
          setErrorMessage('');
          return;
        }
      }

      // Mostrar un mensaje de error si las credenciales no coinciden
      setErrorMessage('Credenciales inválidas');
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      // Mostrar un mensaje de error genérico
      setErrorMessage('Ocurrió un error al recuperar la contraseña');
    }*/
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handlePasswordRecovery}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
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

export default Recuperar_contraseña;
