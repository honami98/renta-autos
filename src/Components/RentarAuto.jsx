import React, { useState, useEffect } from "react";
//import firebase from 'firebase'; // Importa la biblioteca de Firebase

const RentarAuto = () => {
  const [carList, setCarList] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState("");
  const [rentalNumber, setRentalNumber] = useState("");

  // Función para obtener los autos registrados en la base de datos de Firebase
  /*const fetchCars = async () => {
    try {
      const snapshot = await firebase.firestore().collection('car').get();
      const cars = snapshot.docs.map((doc) => doc.data());
      setCarList(cars);
    } catch (error) {
      console.error('Error al obtener los autos:', error);
    }
  };

  // Obtén la lista de autos al cargar el componente
  useEffect(() => {
    fetchCars();
  }, []);*/

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleRentalNumberChange = (event) => {
    setRentalNumber(event.target.value);
  };

  const handleSaveRental = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para guardar la renta en la base de datos de Firebase
    console.log("Número de renta:", rentalNumber);
    console.log("Fecha de inicio:", startDate);
    console.log("Fecha de fin:", endDate);
    // Luego puedes realizar acciones adicionales, como mostrar un mensaje de éxito
    // y restablecer los campos del formulario
    setStartDate(new Date().toISOString().slice(0, 10));
    setEndDate("");
    setRentalNumber("");
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
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">Fecha de fin:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div>
          <label htmlFor="rentalNumber">Número de renta:</label>
          <input
            type="text"
            id="rentalNumber"
            value={rentalNumber}
            onChange={handleRentalNumberChange}
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
