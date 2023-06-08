import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import db from "../../Firestore"; // Importa la instancia de Firebase Firestore
import Navbar from "../../Components/Navbar/Navbar";

const DevolucionAuto = () => {
  const [licensePlateOptions, setLicensePlateOptions] = useState([]);
  const [formValues, setFormValues] = useState({
    licensePlate: "",
    returnDate: "",
    startDate: "",
    rentNumber: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLicensePlates = async () => {
      try {
        setLoading(true); // Activar el indicador de carga

        const snapshot = await db.collection("devolutions").get(); // Cambio de 'cars' a 'devolutions'
        const licensePlates = snapshot.docs.map((doc) => doc.data().rentNumber);
        setLicensePlateOptions(licensePlates);

        setLoading(false); // Desactivar el indicador de carga
        // Mostrar alerta de éxito
        Swal.fire({
          title: "Datos cargados",
          text: "Los datos se han cargado correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (error) {
        console.error("Error al obtener las placas de los vehículos:", error);
        // Mostrar alerta de error
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

    const { licensePlate, returnDate, startDate, rentNumber } = formValues;

    if (
      licensePlate === "" ||
      returnDate === "" ||
      startDate === "" ||
      rentNumber === ""
    ) {
      // Mostrar alerta de campos vacíos
      Swal.fire({
        title: "Campos vacíos",
        text: "Por favor, complete todos los campos.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      // Guardar la devolución en la base de datos de Firebase
      await db.collection("devolutions").add({
        // Cambio de 'cars' a 'devoluciones'
        rentalNumber: rentNumber, // Cambio de 'rentNumber' a 'rentalNumber'
        licensePlate: licensePlate,
        returnDate: returnDate,
        startDate: startDate,
      });

      // Actualizar el campo "disponible" del auto a false
      await db.collection("cars").doc(licensePlate).update({
        disponible: false,
      });

      // Mostrar alerta de éxito
      Swal.fire({
        title: "Devolución guardada",
        text: "La devolución se ha guardado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Restablecer los campos del formulario
      setFormValues({
        licensePlate: "",
        returnDate: "",
        startDate: "",
        rentNumber: "",
      });
    } catch (error) {
      console.error("Error al guardar la devolución:", error);
      // Mostrar alerta de error
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
            <label htmlFor="licensePlate">Número de placa:</label>
              <select
                 className="form-control"
              id="licensePlate"
              name="licensePlate"
              value={formValues.licensePlate}
              onChange={handleChange}
            >
              <option value="">Seleccione una placa</option>
              {licensePlateOptions.map((licensePlate) => (
                <option key={licensePlate} value={licensePlate}>
                  {licensePlate}
                </option>
              ))}
            </select>
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
            <label htmlFor="startDate">Fecha inicial:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formValues.startDate}
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
