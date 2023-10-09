import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/CartContext";
import { UserToken } from "../../context/UserToken";
import toast from "react-hot-toast";
import { Box, Modal } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let {
    getCart,
    deleteCart,
    updateCart,
    numOfCartItems,
    setNumOfCartItems,
    checkOut,
    cartId,
    setCartId,
    clearCart,
  } = useContext(CartContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };
  async function submitFormFunc(values) {
    let res = await checkOut(cartId, values);
    window.location.href = res.data.session.url;
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: submitFormFunc,
  });
  const [open, setOpen] = useState(false);
  let [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  let message = "Your Cart Updated successfully ";

  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState(null);
  let deleteCartfun = async (id) => {
    let res = await deleteCart(id);
    if (res.data?.status === "success") {
      toast.success(message);
      getFromTheCart();
    }
  };
  let clearCartfun = async () => {
    let res = await clearCart();
    console.log(res.data);

    if (res.data?.message === "success") {
      toast.success("Your cart have been cleared ");
      getFromTheCart();
      navigate("/");
    }
  };
  let updateCartfun = async (id, count) => {
    let res = await updateCart(id, count);
    setLoading(true);

    if (res.data.status === "success") {
      toast.success(message);
      setLoading(false);

      getFromTheCart();
    }
  };
  let getFromTheCart = async () => {
    let res = await getCart();

    if (res?.data?.status === "success") {
      setData(res?.data);
      setNumOfCartItems(res?.data?.numOfCartItems);
      setCartId(res?.data.data._id);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      return;
    }
    getFromTheCart();
  }, [isLogin]);

  if (!data?.data || numOfCartItems === 0) {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cart</title>
        </Helmet>

        <div className="container min-vh-100">
          <h1 className="text-center h3 py-3 my-3 product">
            Your Cart is Empty
          </h1>
          <div className=" align-items-center text-center my-4">
            <i
              className="fa-solid fa-shopping-cart text-center "
              style={{ fontSize: "50px" }}></i>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      {
        <div className="container min-vh-100">
          <h1 className="h3 my-4 py-4 text-center border border-1">
            Total Cart Price :{" "}
            <span className="text-main fw-bolder">
              {data?.data.totalCartPrice}
            </span>
          </h1>
          {data?.data.products.map((prod) => (
            <div key={prod._id} className="row my-3 product py-2">
              <div className="col-md-3">
                <img
                  src={prod.product.imageCover}
                  className="w-100 py-2"
                  alt=""
                />{" "}
              </div>
              <div className="col-md-4 py-2">
                <p className="text-main ">{prod.product.title}</p>
                <p className=" "> Price : {prod.price}</p>
                <p className=" text-main">Amount of Items : {prod.count}</p>
                <p className=" fs-6">
                  {" "}
                  Total Cost : {prod.count * prod.price}{" "}
                  <div
                    className="cursor-pointer my-2 "
                    onClick={() => {
                      deleteCartfun(prod.product._id);
                    }}>
                    <span className="small-text"> Delete </span>

                    <i className="fa-solid fa-trash text-danger small-text mx-1"></i>
                  </div>
                </p>
              </div>
              <div className="col-md-4 text-end my-2 py-3 text-center">
                <button
                  className="btn text-main border border-1"
                  onClick={() =>
                    updateCartfun(prod.product._id, prod.count - 1)
                  }>
                  -
                </button>
                <span className=" h5 fw-bolder mx-2"> {prod.count}</span>
                <button
                  className="btn text-main border border-1"
                  onClick={() =>
                    updateCartfun(prod.product._id, prod.count + 1)
                  }>
                  +
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={handleOpen}
            className="text-main btn form-btn py-2 m-2 my-3">
            Checkout
          </button>
          <button
            className="text-main btn form-btn py-2 m-2 my-3 ml-auto"
            onClick={() => clearCartfun()}>
            <span className=""> Clear Cart </span>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <form onSubmit={formik.handleSubmit}>
                <h3 className="text-main"> Enter Your Shipping Info </h3>
                <input
                  className="form-control my-1"
                  required
                  name="details"
                  onChange={formik.handleChange}
                  value={formik.values.details}
                  type="text"
                  placeholder="address"></input>
                <input
                  required
                  className="form-control my-1"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  type="tel"
                  placeholder="phone"></input>
                <input
                  required
                  className="form-control my-1"
                  type="text"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  placeholder="city"></input>
                <button className="btn bg-main text-white" type="submit">
                  {" "}
                  Enter
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      }
    </>
  );
}
