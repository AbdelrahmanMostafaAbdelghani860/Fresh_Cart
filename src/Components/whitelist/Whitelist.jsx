import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/CartContext";
import { UserToken } from "../../context/UserToken";
import toast from "react-hot-toast";
import { WhitelistContext } from "../../context/WhiltListContext";
import Slider from "react-slick";

export default function Whitelist() {
  let message = "Your Wishlist Updated successfully ";
  let { addCart, setNumOfCartItems } = useContext(CartContext);

  let {
    getWhitelist,
    deleteWhitelist,
    numOfWhitelistItems,
    setNumOfWhitelistItems,
  } = useContext(WhitelistContext);
  let { isLogin } = useContext(UserToken);
  let [data, setData] = useState(null);
  let deleteWhitelistfun = async (id) => {
    let res = await deleteWhitelist(id);
    console.log(res);
    if (res.data.status === "success") {
      toast.success(message);
      getFromTheWhitelist();
    }
  };

  let getFromTheWhitelist = async () => {
    let res = await getWhitelist();
    console.log(res?.data);
    setData(res?.data);
    setNumOfWhitelistItems(res?.data?.count);
  };
  useEffect(() => {
    if (!isLogin) {
      return;
    }
    getFromTheWhitelist();
  }, [isLogin]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 4,
    autoplay: true,
  };
  let addToTheCart = async (id) => {
    let res = await addCart(id);
    if (!isLogin) {
      toast.error(res?.response.data.message);
      return;
    }
    toast.success(res.data.message);
    setNumOfCartItems(res?.data?.numOfCartItems);
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Wishlist</title>
      </Helmet>
      {numOfWhitelistItems ? (
        <div className="container overFlow min-vh-100">
          <h1 className="h2 py-3 text-center my-2"> Your Wishlist</h1>
          {data?.data.map((prod) => (
            <div key={prod._id} className="row my-3 product py-2">
              <div className="col-md-6">
                <Slider {...settings} className="my-3 ">
                  {prod.images.map((ele) => (
                    <div key={ele}>
                      <img
                        key={ele}
                        src={
                          "https://res.cloudinary.com/dwp0imlbj/image/upload/v1680747398/Route-Academy-products/" +
                          ele
                        }
                        style={{ height: 300, objectFit: "cover" }}
                        className="w-100 "></img>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="col-md-6 py-2">
                <p className="text-main ">{prod.title}</p>
                <p className=" fw-bold ">{prod.description}</p>
                <p className=" "> Price : {prod.price}</p>

                <p className=" fs-6">
                  {" "}
                  <button
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Add to the Cart"
                    onClick={() => {
                      addToTheCart(prod._id);
                    }}
                    className="btn text-white bg-main my-2 col-7 small-text">
                    {" "}
                    Add to Cart
                  </button>
                  <div
                    className="cursor-pointer my-2 "
                    onClick={() => {
                      deleteWhitelistfun(prod._id);
                    }}>
                    <span className="small-text"> Delete </span>

                    <i className="fa-solid fa-trash text-danger small-text mx-1"></i>
                  </div>
                </p>
              </div>
              <div className="col-md-4 text-end my-2 py-3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container min-vh-100">
          <h1 className="h3 text-main text-center pt-5">
            Your Whishlist is Empty
          </h1>
          <div className="h1 text-center">
            <i className="fa-regular fa-face-smile"></i>
          </div>
        </div>
      )}
    </>
  );
}
