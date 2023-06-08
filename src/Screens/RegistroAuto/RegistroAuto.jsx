import React, { useState } from "react";
import db from "../../Firestore";
import Navbar from "../../Components/Navbar/Navbar";

const CarForm = () => {
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
    } catch (error) {
      console.error("Error adding car: ", error);
    }
  };

  return (
    <div class="container">
      <Navbar />
      <form class="form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="placa">Número de placa:</label>
          <input
            type="text"
            id="placa"
            name="placa"
            class="form-control"
            value={carData.plateNumber}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            name="modelo"
            class="form-control"
            value={carData.model}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="preciodia">Precio por día:</label>
          <input
            type="number"
            id="preciodia"
            name="preciodia"
            class="form-control"
            value={carData.dailyPrice}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="imagen">URL de la imagen:</label>
          <input
            type="text"
            id="imagen"
            name="imagen"
            class="form-control"
            value={carData.image}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <div class="form-check">
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              class="form-check-input"
              checked={carData.available}
              onChange={handleChange}
            />
            <label class="form-check-label" for="disponible">
              Disponible
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Registrar automóvil
        </button>
      </form>
    </div>
  );
};

export default CarForm;
