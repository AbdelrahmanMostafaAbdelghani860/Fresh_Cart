import axios from "axios";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserToken } from "../context/UserToken";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { Box, Modal, Typography } from "@mui/material";
import { WhitelistContext } from "../context/WhiltListContext";
import Loader from "./Loader";
export default function ProductDetails() {
  let { addWhitelist, setNumOfWhitelistItems } = useContext(WhitelistContext);

  let BaseUrl = "https://ecommerce.routemisr.com";
  let { id } = useParams();
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%", // Adjusted
    height: "50%", // Adjusted

    border: "2px solid #000",
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getData = () => {
    return axios.get(`${BaseUrl}/api/v1/products/${id}`);
  };
  const { isLoading, isSuccess, data, isFetching } = useQuery(
    "productsdetails",
    getData
  );
  let { isLogin } = useContext(UserToken);
  let { addCart, setNumOfCartItems } = useContext(CartContext);

  let addToTheCart = async (id) => {
    let res = await addCart(id);

    if (!isLogin) {
      toast.error(res.response.data.message);
      return;
    }
    setNumOfCartItems(res.data.numOfCartItems);

    toast.success(res.data.message);
  };
  let addToTheWhitelist = async (id) => {
    let res = await addWhitelist(id);
    if (!isLogin) {
      toast.error(res.response.data.message);
      return;
    }
    toast.success(res.data.message);
    console.log(res.data.data);
    setNumOfWhitelistItems(res.data.data.length);
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  console.log(data?.data.data);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Details</title>
      </Helmet>
      <div className="container my-5 ">
        {!isLoading ? (
          <div className="row my-2 overFlow">
            <Slider {...settings} className="my-3  col-md-3 text-center ">
              {data?.data.data.images.map((ele) => (
                <div key={ele}>
                  <img
                    key={ele}
                    src={ele}
                    onClick={handleOpen}
                    style={{ height: 350, objectFit: "cover" }}
                    className="w-100 "></img>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <img
                          src={ele}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />{" "}
                        {/* Adjusted */}
                      </Typography>
                    </Box>
                  </Modal>
                </div>
              ))}
            </Slider>
            <div className="col-md-8 my-3 ">
              <h1 className="fw-bolder h5"> {data?.data.data.title}</h1>
              <p> {data?.data.data.description}</p>
              <p className="fw-bolder"> {data?.data.data.brand.name}</p>

              <p className="small-text text-main">
                {" "}
                {data?.data.data.category.name}
              </p>
              <div className="d-flex box justify-content-between">
                <span className="fw-bolder"> {data?.data.data.price} EGP</span>

                <span>
                  {data?.data.data.ratingsAverage}{" "}
                  <i className="fa-solid fa-star rating-color"></i>
                </span>
              </div>
              <div className="row my-3 ">
                <button
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Add to My Cart"
                  className="btn bg-main py-2  text-white my-2 col-md-9 respond mx-2"
                  onClick={() => {
                    addToTheCart(data?.data.data._id);
                  }}>
                  Add to Cart
                </button>

                <button
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Add to My Favourites"
                  onClick={() => {
                    addToTheWhitelist(data?.data.data._id);
                  }}
                  className="btn text-white bg-main my-2 col-md-1 respond-2 mx-2">
                  {" "}
                  {/* <div className="text-hovered">Add to Your Favourites</div> */}
                  <i className="fa-solid fa-heart "></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-4">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
