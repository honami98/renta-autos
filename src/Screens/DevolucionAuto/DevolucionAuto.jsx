import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
//import firebase from 'firebase'; // Importa la biblioteca de Firebase

const DevolucionAuto = () => {
  const [rentList, setRentList] = useState([]);
  const [rentalNumber, setRentalNumber] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Función para obtener los números de renta registrados en la base de datos de Firebase
  /*const fetchRents = async () => {
    try {
      const snapshot = await firebase.firestore().collection('rent').get();
      const rents = snapshot.docs.map((doc) => doc.data());
      setRentList(rents);
    } catch (error) {
      console.error('Error al obtener los números de renta:', error);
    }
  };

  // Obtén la lista de números de renta al cargar el componente
  useEffect(() => {
    fetchRents();
  }, []);

  const handleRentalNumberChange = (event) => {
    const selectedRentalNumber = event.target.value;
    setRentalNumber(selectedRentalNumber);
    // Obtén el número de placa correspondiente al número de renta seleccionado
    const selectedRent = rentList.find((rent) => rent.rentalNumber === selectedRentalNumber);
    if (selectedRent) {
      setLicensePlate(selectedRent.licensePlate);
    } else {
      setLicensePlate('');
    }
  };*/

  const handleReturnDateChange = (event) => {
    setReturnDate(event.target.value);
  };

  const handleSaveReturn = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para guardar la devolución en la base de datos de Firebase
    console.log('Número de renta:', rentalNumber);
    console.log('Número de placa:', licensePlate);
    console.log('Fecha de devolución:', returnDate);
    // Luego puedes realizar acciones adicionales, como mostrar un mensaje de éxito
    // y restablecer los campos del formulario
    setRentalNumber('');
    setLicensePlate('');
    setReturnDate('');
  };

  return (
    <div class="container">
      <Navbar />
      <h2>Devolver un auto</h2>
      <form class="form" onSubmit={handleSaveReturn}>
        <div class="form-group">
          <label for="rentalNumber">Número de renta:</label>
          {/* <select id="rentalNumber" value={rentalNumber} onChange={handleRentalNumberChange}>
        {rentList.map((rent) => (
          <option key={rent.rentalNumber} value={rent.rentalNumber}>
            {rent.rentalNumber}
          </option>
        ))}
      </select> */}
        </div>
        <div class="form-group">
          <label for="licensePlate">Número de placa:</label>
          <input
            type="text"
            id="licensePlate"
            value={licensePlate}
            disabled
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="returnDate">Fecha de devolución:</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={handleReturnDateChange}
            class="form-control"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary">
            Guardar devolución
          </button>
        </div>
      </form>
      <div>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </div>
  );
};

export default DevolucionAuto;
