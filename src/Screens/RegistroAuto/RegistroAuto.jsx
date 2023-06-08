import React, { useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import db from "../../Firestore";
import Navbar from "../../Components/Navbar/Navbar";

const RegistroAuto = () => {
  const [carData, setCarData] = useState({
    placa: "",
    modelo: "",
    preciodia: 0,
    imagen: "",
    disponible: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await db.collection("cars").add(carData);

      // Mostrar alerta de éxito
      Swal.fire({
        title: "Registro exitoso",
        text: "El automóvil se ha registrado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar los campos del formulario
      setCarData({
        placa: "",
        modelo: "",
        preciodia: 0,
        imagen: "",
        disponible: true,
      });
    } catch (error) {
      console.error("Error al agregar el automóvil:", error);

      // Mostrar alerta de error
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al agregar el automóvil.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="container">
      <Navbar />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="placa">Número de placa:</label>
          <input
            type="text"
            id="placa"
            name="placa"
            className="form-control"
            value={carData.placa}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            className="form-control"
            value={carData.modelo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="preciodia">Precio por día:</label>
          <input
            type="number"
            id="preciodia"
            name="preciodia"
            className="form-control"
            value={carData.preciodia}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagen">URL de la imagen:</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            className="form-control"
            value={carData.imagen}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <div className="form-check">
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              className="form-check-input"
              checked={carData.disponible}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="disponible">
              Disponible
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar automóvil
        </button>
      </form>
    </div>
  );
};

export default RegistroAuto;
