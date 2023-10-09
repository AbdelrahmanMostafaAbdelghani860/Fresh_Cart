import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader";

export default function Categories() {
  let BaseUrl = "https://ecommerce.routemisr.com";

  const getData = () => {
    return axios.get(`${BaseUrl}/api/v1/categories`);
  };
  const { isLoading, data } = useQuery("categorydetails", getData);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories</title>
      </Helmet>
      <div className="container my-5">
        <h1 className="text-main h2 text-center fw-bolder my-3">
          Our Categories
        </h1>
        <div className="row justify-content-center ">
          {!isLoading ? (
            data?.data?.data.map((ele) => (
              <div key={ele._id} className=" product col-md-4 my-2 py-4 card ">
                <div className="card-img">
                  <img
                    className="img-fluid ratio-4x3 w-100"
                    src={ele.image}
                    alt="Card image cap"
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                </div>

                <div className="card-body">
                  <p className="text-success h3 text-center">{ele.name}</p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="h2 mt-5">
              <Loader></Loader>
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
