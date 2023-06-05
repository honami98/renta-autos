import React, { useState } from "react";
import Swal from "sweetalert2";

const RentarAuto = () => {
  const [carList, setCarList] = useState([]);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    rentalNumber: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveRental = (event) => {
    event.preventDefault();

    if (!carList.length) {
      Swal.fire({
        title: "Error",
        text: "No hay autos disponibles",
        icon: "error",
      });
      return;
    }

    const { startDate, endDate, rentalNumber } = formData;

    if (!startDate || !endDate || !rentalNumber) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos",
        icon: "error",
      });
      return;
    }

    console.log("Número de renta:", rentalNumber);
    console.log("Fecha de inicio:", startDate);
    console.log("Fecha de fin:", endDate);

    setFormData({
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "",
      rentalNumber: "",
    });

    Swal.fire({
      title: "Éxito",
      text: "La renta se ha guardado correctamente",
      icon: "success",
    });
  };

  return (
    <div>
      <h2>Alquilar un auto</h2>
      <form onSubmit={handleSaveRental}>
        <div>
          <label htmlFor="carList">Autos disponibles:</label>
          <select id="carList">
            {carList.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Fecha de inicio:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">Fecha de fin:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="rentalNumber">Número de renta:</label>
          <input
            type="text"
            id="rentalNumber"
            name="rentalNumber"
            value={formData.rentalNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Guardar renta</button>
        </div>
      </form>
      <div>
        <a href="/available-cars">Ver autos disponibles</a>
      </div>
      <div>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </div>
  );
};

export default RentarAuto;
