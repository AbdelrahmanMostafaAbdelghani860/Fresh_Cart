import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
export default function CategorySlider() {
  let BaseUrl = "https://ecommerce.routemisr.com";

  const getData = () => {
    return axios.get(`${BaseUrl}/api/v1/categories/`);
  };
  const { isLoading, isSuccess, data, isFetching } = useQuery(
    "categorySlider",
    getData
  );
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
  };
  return (
    <div className="container  element-to-hide">
      <h2 className="font-sm my-4">Shop Popular Categories</h2>
      <Slider {...settings} className="my-3 ">
        {data?.data.data.map((ele) => (
          <div key={ele.image}>
            <img
              key={ele.image}
              src={ele.image}
              style={{ height: 200, objectFit: "cover" }}
              className="w-100"></img>
            <p className="text-center py-3 element-to-hide">
              {" "}
              {ele.name.split(" ").slice(0, 1).join(" ")}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
