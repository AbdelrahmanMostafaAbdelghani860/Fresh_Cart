import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
// import Bootstrap Modal

export default function Brands() {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  let BaseUrl = "https://ecommerce.routemisr.com";

  const getData = () => {
    return axios.get(`${BaseUrl}/api/v1/brands`);
  };
  const { isLoading, data, isFetching } = useQuery("branddetails", getData);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Brand</title>
      </Helmet>

      <div className="container p-3 my-2  ">
        <h1 className="text-main h2 text-center fw-bolder my-3">
          Our Partenrs
        </h1>
        <div className="row justify-content-center ">
          {!isLoading ? (
            data?.data.data.map((brand) => (
              <div
                key={brand._id}
                className="card m-2 col-md-2 cursor-pointer product">
                <img
                  className="card-img-top"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  src={brand.image}
                  alt="Card image cap"
                  onClick={() => {
                    setSelectedImage(brand.image);
                    setName(brand.name);
                  }}
                />

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {name}
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body text-center">
                        {<img src={selectedImage}></img>}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text">{brand.name}</p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="h3 mt-5 py-3">
              <Loader></Loader>
            </h1>
          )}
        </div>
      </div>
    </>
  );
}
