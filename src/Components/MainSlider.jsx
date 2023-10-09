import React from "react";
import sliderImage1 from "../assets/images/slider-image-1.jpeg";
import sliderImage2 from "../assets/images/slider-image-2.jpeg";
import sliderImage3 from "../assets/images/slider-image-3.jpeg";
import image1 from "../assets/images/slider-2.jpeg";
import image2 from "../assets/blog-img-2.jpeg";
import Slider from "react-slick";
export default function () {
  let sliders = [sliderImage1, sliderImage2, sliderImage3, sliderImage1];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="container d-flex my-3 ">
      <Slider {...settings} className=" col-md-9 p-0 ">
        {sliders.map((ele) => (
          <img src={ele} className="w-100 main-img "></img>
        ))}
      </Slider>
      <div className="col-md-3 p-0 hidden" style={{ height: 400 }}>
        <img
          className="w-100"
          src={image1}
          style={{ height: 200, objectFit: "cover" }}></img>
        <img
          className="w-100"
          src={image2}
          style={{ height: 200, objectFit: "cover" }}></img>
      </div>
    </div>
  );
}
