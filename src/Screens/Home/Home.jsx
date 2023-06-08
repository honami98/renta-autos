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
            precio: carData.preciodia,
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
              display: "block",
              color: "white",
              gap: "5px",
              textAlign: "justify",
            }}
          >
            <section
              style={{
                display: "flex",
                color: "white",
                gap: "30px",
                textAlign: "justify",
              }}
            >
              <div className="div-left">
                <h2>Porsche 918 Spyder</h2>
                <p>
                  El Porsche 918 Spyder es un automóvil híbrido de altas
                  prestaciones que combina elegancia y rendimiento excepcional.
                  Su diseño aerodinámico y sofisticado atrae las miradas, con
                  líneas suaves y agresivas que reflejan su naturaleza
                  deportiva. Equipado con un sistema de propulsión híbrido que
                  combina un motor de combustión interna y motores eléctricos,
                  el 918 Spyder ofrece una potencia impresionante y una
                  eficiencia notable. Su interior lujoso y tecnológicamente
                  avanzado brinda comodidad y un ambiente de alta gama. El
                  Porsche 918 Spyder es una obra maestra de ingeniería que
                  redefine los límites del rendimiento y establece nuevos
                  estándares en el mundo de los superdeportivos.
                </p>
              </div>
              <div  className="div-right">
                <h2>Nissan Silvia</h2>
                <p>
                  El Nissan Silvia es un icónico coupé deportivo que cautiva con
                  su estilo elegante y su rendimiento dinámico. Con líneas
                  limpias y aerodinámicas, este automóvil exhibe una apariencia
                  deportiva y sofisticada. El Silvia ofrece una experiencia de
                  conducción emocionante gracias a su motor potente y ágil, que
                  proporciona una aceleración rápida y una respuesta precisa. Su
                  chasis equilibrado y su suspensión deportiva garantizan una
                  conducción ágil y divertida. En el interior, el Silvia ofrece
                  comodidad y un diseño centrado en el conductor, con asientos
                  deportivos y una disposición intuitiva de los controles. El
                  Nissan Silvia es una elección perfecta para los entusiastas de
                  los deportivos que buscan estilo, rendimiento y diversión al
                  volante.
                </p>
              </div>
            </section>
            <section
              style={{
                display: "flex",
                color: "white",
                gap: "30px",
                textAlign: "justify",
              }}
            >
              <div className="div-left">
                <h2>Toyota Supra MK4</h2>
                <p>
                  El Toyota Supra MK4 es un icónico automóvil deportivo que ha
                  dejado una huella imborrable en la industria automotriz. Con
                  su diseño aerodinámico y líneas suaves, el Supra MK4 es un
                  verdadero deleite visual. Impulsado por un motor
                  turboalimentado de seis cilindros en línea, este automóvil
                  ofrece un rendimiento excepcional, con una potencia
                  impresionante y una aceleración rápida. Su conducción ágil y
                  precisa garantiza una experiencia emocionante en cada curva.
                  En el interior, el Supra MK4 combina comodidad y
                  funcionalidad, con asientos deportivos y una disposición
                  intuitiva de los controles. El Toyota Supra MK4 es un clásico
                  moderno que continúa capturando la imaginación de los
                  entusiastas de los automóviles y dejando una marca perdurable
                  en el mundo de los deportivos.
                </p>
              </div>
              <div className="div-right">
                <h2>Nissan GTR R35</h2>
                <p>
                  El Nissan GTR R35 es un legendario automóvil deportivo que
                  encarna la excelencia en ingeniería y el poder desenfrenado.
                  Su diseño agresivo y aerodinámico es un testimonio de su
                  rendimiento excepcional. Con líneas fluidas y detalles
                  estilizados, el GTR R35 emana una presencia imponente en la
                  carretera. Impulsado por un motor V6 twin-turbo de alta
                  potencia y tracción integral, este supercoche ofrece una
                  aceleración vertiginosa y una maniobrabilidad precisa. Su
                  interior de lujo combina comodidad y tecnología de vanguardia,
                  brindando una experiencia de conducción envolvente. El Nissan
                  GTR R35 es un símbolo de velocidad y rendimiento, cautivando a
                  los amantes de los automóviles en todo el mundo.
                </p>
              </div>
            </section>
            <section
              style={{
                display: "flex",
                color: "white",
                gap: "30px",
                textAlign: "justify",
              }}
            >
              <div className="div-left">
                <h2>Lamborghini Aventador</h2>
                <p>
                  El Lamborghini Aventador es un superdeportivo deslumbrante que
                  personifica el lujo y la potencia extrema. Su diseño audaz y
                  aerodinámico evoca una presencia imponente en la carretera,
                  con líneas angulosas y agresivas que capturan la atención de
                  todos los espectadores. Impulsado por un motor V12 de alto
                  rendimiento, el Aventador ofrece una aceleración vertiginosa y
                  una velocidad máxima impresionante. Su interior combina
                  artesanía y tecnología de vanguardia, con asientos envolventes
                  y acabados lujosos. Cada detalle del Lamborghini Aventador es
                  una expresión de rendimiento y exclusividad, convirtiéndolo en
                  un ícono de los supercoches y el sueño de todo amante de la
                  velocidad.
                </p>
              </div>
              <div className="div-right">
                <h2>Lamborghini Miura</h2>
                <p>
                  El Lamborghini Miura es un legendario automóvil deportivo que
                  revolucionó la industria automotriz. Su diseño audaz y
                  aerodinámico estableció nuevos estándares de elegancia y
                  agresividad. Con líneas suaves y curvas sensuales, el Miura es
                  una obra de arte sobre ruedas. Impulsado por un motor V12
                  ubicado en posición central, este supercoche ofrece un
                  rendimiento excepcional con una velocidad impresionante y una
                  aceleración vertiginosa. Su interior lujoso y ergonómico
                  brinda una experiencia de conducción envolvente. El
                  Lamborghini Miura es un hito en la historia de los
                  superdeportivos y sigue siendo un símbolo de exclusividad y
                  estilo inigualables.
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
