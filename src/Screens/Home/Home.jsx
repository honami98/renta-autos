import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";
import db from "../../Firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      Swal.fire({
        title: "Cargando...",
        text: "Obteniendo datos",
        icon: "info",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const carsRef = db.collection("cars");
        const snapshot = await carsRef.get();

        const fetchedCars = snapshot.docs.map((doc) => {
          const carData = doc.data();
          return {
            id: doc.id,
            src: carData.imagen,
            alt: carData.placa,
            caption: carData.placa,
            credit: `Disponible: ${carData.disponible ? "Sí" : "No"}`,
          };
        });

        setCars(fetchedCars);
        Swal.close();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se ha podido obtener los datos. Revisa la conexión a internet.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    fetchCars();
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleRentCar = (ruta) => {
    navigate(ruta);
  };

  const renderSlides = () => {
    return cars.map((car) => (
      <div key={car.id} className="carousel__slide">
        <img src={car.src} alt={car.alt} />
        <p className="legend">
          {car.caption}
          <br />
          <br />
          <span className="credit">{car.credit}</span>
        </p>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div>
        <section>
          <div className="container">
            <Carousel
              selectedItem={currentSlide}
              onChange={handleSlideChange}
              showThumbs={true}
              infiniteLoop={true}
              autoPlay={true}
              interval={2000}
            >
              {renderSlides()}
            </Carousel>
            <button onClick={() => handleRentCar("/RentarAuto")}>
              Rentar Auto
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
