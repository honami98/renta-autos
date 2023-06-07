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
            modelo: carData.modelo,
            credit: `Disponible: ${carData.disponible ? "Sí" : "No"}`,
            precio: carData.preciodia
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
          <span className="precio">{car.precio} USD</span>
          <br />
          <span className="modelo">{car.modelo}</span>
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
              interval={4000}
            >
              {renderSlides()}
            </Carousel>
            <button onClick={() => handleRentCar("/RentarAuto")}>
              Rentar Auto
            </button>
          </div>
        </section>
        <div className="container mt-5">
          <div
            style={{
              display: "flex",
              color: "white",
              gap: "5px",
            }}
          >
            <section>
              <div>
                <h2>Nissan GTR R35</h2>
                <p>
                  El Nissan GT-R es un automóvil deportivo gran turismo cupé 2+2
                  con motor delantero montado longitudinalmente y tracción en
                  las cuatro ruedas, producido por el fabricante japonés Nissan,
                  lanzado en Japón el 6 de diciembre de 2007, en Estados Unidos
                  el 7 de julio de 2008 y en el resto del mundo en marzo de
                  2009.
                </p>
              </div>
            </section>
            <section>
              <div>
                <h2>Lamborghini Aventador</h2>
                <p>
                  El pensamiento revolucionario forma parte del ADN de
                  Automobili Lamborghini: hablar de diseño inspirado en la
                  aeronáutica o de tecnologías como el motor V12 o el uso de la
                  fibra de carbono e ir más allá de los límites comúnmente
                  aceptados forma parte de nuestra filosofía. El Aventador ha
                  sido diseñado para ir más allá del propio concepto de
                  rendimiento, convirtiéndose rápidamente en el punto de
                  referencia para el sector de los superdeportivos y
                  adelantándose ya hoy a los coches del futuro. Una familia de
                  superdeportivos que ya es leyenda.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
