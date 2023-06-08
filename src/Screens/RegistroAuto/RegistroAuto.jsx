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
    <>
      <div className="container">
        <Navbar/>
        <form onSubmit={handleSubmit}>
          <label>
            Número de placa:
            <input
              type="text"
              name="placa"
              value={carData.plateNumber}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Modelo:
            <input
              type="text"
              name="modelo"
              value={carData.model}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Precio por día:
            <input
              type="number"
              name="preciodia"
              value={carData.dailyPrice}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            URL de la imagen:
            <input
              type="text"
              name="imagen"
              value={carData.image}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Disponible:
            <input
              type="checkbox"
              name="disponible"
              checked={carData.available}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Registrar automóvil</button>
        </form>
      </div>
    </>
  );
};

export default CarForm;
