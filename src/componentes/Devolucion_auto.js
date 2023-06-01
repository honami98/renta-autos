import React, { useState, useEffect } from 'react';
//import firebase from 'firebase'; // Importa la biblioteca de Firebase

const Devolucion_auto = () => {
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
    <div>
      <h2>Devolver un auto</h2>
      <form onSubmit={handleSaveReturn}>
        <div>
          <label htmlFor="rentalNumber">Número de renta:</label>
          <select id="rentalNumber" value={rentalNumber} onChange={handleRentalNumberChange}>
            {rentList.map((rent) => (
              <option key={rent.rentalNumber} value={rent.rentalNumber}>
                {rent.rentalNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="licensePlate">Número de placa:</label>
          <input type="text" id="licensePlate" value={licensePlate} disabled />
        </div>
        <div>
          <label htmlFor="returnDate">Fecha de devolución:</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={handleReturnDateChange}
          />
        </div>
        <div>
          <button type="submit">Guardar devolución</button>
        </div>
      </form>
      <div>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </div>
  );
};

export default Devolucion_auto;
