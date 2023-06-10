import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import db from "../../Firestore";
import Navbar from "../../Components/Navbar/Navbar";

const DevolucionAuto = () => {
  const [rentalNumberOptions, setRentalNumberOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    licensePlate: "",
    rentalNumber: "",
    returnDate: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicensePlates = async () => {
      try {
        setLoading(true);
        const rentalNumber = await db.collection("rent");
        const snapshot = await rentalNumber.get();
        const rentalNumbers = snapshot.docs.map((doc) => doc.data().rentalNumber);

        setRentalNumberOptions(rentalNumbers);

        setLoading(false);
        Swal.fire({
          title: "Datos cargados",
          text: "Los datos se han cargado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al obtener las placas de los vehículos:", error);
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error al obtener los datos.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };
    fetchLicensePlates();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSaveReturn = async (event) => {
    event.preventDefault();
  
    const { licensePlate, returnDate, rentalNumber } = formValues;
  
    // Verificar campos vacíos
    if (!licensePlate || !returnDate || !rentalNumber) {
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }
  
    try {
      // Guardar la devolución en la colección "devolutions" de Firebase
      const devolutionRef = await db.collection("devolutions").add({
        rentalNumber,
        returnDate,
        licensePlate,
      });
  
      // Verificar si la devolución se guardó correctamente
      if (!devolutionRef.id) {
        throw new Error("Error al guardar la devolución.");
      }
  
      // Buscar el auto en la colección "cars" por la placa
      const carsRef = db.collection("cars");
      const querySnapshot = await carsRef.where("placa", "==", licensePlate).get();
  
      // Verificar si se encontró el auto
      if (!querySnapshot.empty) {
        const carRef = querySnapshot.docs[0].ref;
  
        // Actualizar el campo "disponible" del auto a true
        await carRef.update({
          disponible: true,
        });
  
        Swal.fire({
          title: "Devolución guardada",
          text: "La devolución se ha guardado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
  
        setFormValues({
          rentalNumber: "",
          licensePlate: "",
          returnDate: "",
        });
      } else {
        Swal.fire({
          title: "Placa no encontrada",
          text: "La placa ingresada no corresponde a ningún vehículo registrado.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al guardar la devolución:", error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al guardar la devolución.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Devolver un auto</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <form className="form" onSubmit={handleSaveReturn}>
            <div className="form-group">
              <label htmlFor="rentalNumber">Número de Renta:</label>
              <select
                className="form-control"
                id="rentalNumber"
                name="rentalNumber"
                value={formValues.rentalNumber}
                onChange={handleChange}
              >
                <option value="">Seleccione su número de Renta</option>
                {rentalNumberOptions.map((rentalNumber) => (
                  <option key={rentalNumber} value={rentalNumber}>
                    {rentalNumber}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="licensePlate">Número de Placa</label>
              <input
                type="text"
                id="licensePlate"
                name="licensePlate"
                value={formValues.licensePlate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="returnDate">Fecha de devolución:</label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                value={formValues.returnDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Guardar devolución
              </button>
            </div>
          </form>
        )}
        <div>
          <a href="/logout">Cerrar sesión</a>
        </div>
      </div>
    </>
  );
};

export default DevolucionAuto;
