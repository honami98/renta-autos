import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import db from "../../Firestore";
import { Link } from "react-router-dom";
import "./RentarAuto.module.css";

const RentarAuto = () => {
  const [carList, setCarList] = useState([]);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    rentalNumber: "",
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsRef = db.collection("cars");
        const snapshot = await carsRef.get();
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarList(carsData);
        console.log("carList:", carsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSaveRental = async (event) => {
    event.preventDefault();

    if (carList.length === 0) {
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

    try {
      const rentalRef = db.collection("rentals");
      await rentalRef.add({
        startDate,
        endDate,
        rentalNumber,
      });

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
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al guardar la renta",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="text-center">Alquilar un auto</h2>
      <div className="container">
        <form onSubmit={handleSaveRental}>
          <div className="form-group">
            <label htmlFor="carList">Autos disponibles:</label>
            <select
              id="carList"
              className="form-control"
              value={formData.carId}
              name="carId"
              onChange={handleChange}
            >
              {carList.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.modelo}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Fecha de inicio:</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Fecha de fin:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rentalNumber">Número de renta:</label>
            <input
              type="number"
              id="rentalNumber"
              className="form-control"
              name="rentalNumber"
              value={formData.rentalNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Guardar renta
            </button>
          </div>
          <div>
            <Link to="/">Cerrar sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RentarAuto;
