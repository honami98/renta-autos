import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import "./Home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const renderSlides = () => {
    const slides = [
      {
        id: 1,
        src: "https://newevolutiondesigns.com/images/freebies/4k-car-wallpaper-8.jpg",
        alt: "Lamborghini Aventador SV Coupe",
        caption: "Lamborghini Aventador SV Coupe",
        credit: "Photo: Daniel",
      },
      {
        id: 2,
        src: "https://th.bing.com/th/id/R.fc7af22c00742be4f98b2bc8d8e0ddf4?rik=NC5uCzExMgVY3w&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2018%2f07%2f4K-Cars-Best-Wallpaper.jpg&ehk=h84rIcqwJ9jlGR%2b41IdV0GrC%2flAShfnFE5IC2YsV%2b4k%3d&risl=&pid=ImgRaw&r=0",
        alt: "Car 2",
        caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        credit: "Photo: Jane Smith",
      },
      {
        id: 3,
        src: "https://cutewallpaper.org/21/wallpaper-jdm/My-List-Of-Jdm-Wallpaper-Pictures-For-Your-Phone-Enjoy-Jdm-.jpg",
        alt: "Car 3",
        caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        credit: "Photo: Alex Johnson",
      },
      // ...rest of the slides
    ];

    return slides.map((slide, index) => (
      <div key={slide.id} className="carousel__slide">
        <img src={slide.src} alt={slide.alt} />
        <p className="legend">
          {slide.caption}
          <br />
          <br />
          <span className="credit">{slide.credit}</span>
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
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
