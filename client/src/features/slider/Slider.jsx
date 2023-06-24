import "./slider.scss";
// import EastOutlineIcon from "@mui/icons-material/EastOutlined";
// import WestOutlineIcon from "@mui/icons-material/WestOutlined";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Slider = () => {
  const [slide, setSlide] = useState(0);
  const SliderImages = [
    "https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1153&q=80",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1665815844395-06f64f44b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://plus.unsplash.com/premium_photo-1664908468347-0ae7cb2ac037?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  ];

  const prevSlide = () => {
    if (slide === 0) {
      setSlide(SliderImages.length - 1);
    } else {
      setSlide(slide - 1);
    }
  };
  const nextSlide = () => {
    if (slide === SliderImages.length - 1) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  return (
    <div className="slider">
      <div
        className="Container"
        style={{
          width: `${SliderImages.length * 100}vw`,
          transform: `translateX(-${slide * 100}vw)`,
        }}
      >
        {SliderImages.map((image, i) => (
          <img src={image} alt="" key={i} />
        ))}
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <ChevronLeftIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
