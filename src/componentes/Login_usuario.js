import React, { useState } from 'react';

const Login_usuario = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de autenticación, como enviar una solicitud al servidor para verificar las credenciales del usuario
    console.log('Usuario:', username);
    console.log('Contraseña:', password);
    // Luego puedes redirigir al usuario a otra página o realizar otras acciones después del inicio de sesión exitoso
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="submit">Iniciar sesión</button>
        </div>
      </form>
      <div>
        <a href="/register">Registrar usuario</a>
      </div>
      <div>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default Login_usuario;