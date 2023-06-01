import React, { useState } from 'react';

const Registro_usuario = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('usuario');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica para registrar al usuario, como enviar una solicitud al servidor para guardar los datos
    console.log('Nombre de usuario:', username);
    console.log('Nombre:', name);
    console.log('Rol:', role);
    console.log('Contraseña:', password);
    // Luego puedes realizar acciones adicionales, como mostrar un mensaje de éxito o redirigir al usuario a otra página
    // También puedes limpiar los campos llamando a las funciones de estado correspondientes
    setUsername('');
    setName('');
    setRole('usuario');
    setPassword('');
  };

  const handleClear = () => {
    // Limpiar los campos llamando a las funciones de estado correspondientes
    setUsername('');
    setName('');
    setRole('usuario');
    setPassword('');
  };

  return (
    <div>
      <h2>Registrar usuario</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="role">Rol:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="administrador">Administrador</option>
            <option value="usuario">Usuario</option>
          </select>
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
          <button type="submit">Registrar</button>
          <button type="button" onClick={handleClear}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default Registro_usuario;
