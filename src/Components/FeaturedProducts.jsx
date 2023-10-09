import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserToken } from "../context/UserToken";
import toast from "react-hot-toast";
import { WhitelistContext } from "../context/WhiltListContext";
import { Skeleton } from "@mui/material";

export default function FeaturedProducts() {
  let { isLogin } = useContext(UserToken);
  let { addCart, setNumOfCartItems } = useContext(CartContext);
  let { addWhitelist, setNumOfWhitelistItems } = useContext(WhitelistContext);

  let [currentPage, setcurrentPage] = useState(1);
  let [productsperpage, setProductsPerPage] = useState(8);
  let [currentProduct, setCurrentProduct] = useState([]); // <-- add this line
  //
  const indexOfLastProduct = currentPage * productsperpage;
  const indexOfFirstProduct = indexOfLastProduct - productsperpage;
  // const currentProduct = Products.slice(indexOfFirstPost, indexOfLastProduct);
  //
  const paginate = (event, pageNumber) => {
    event.preventDefault();
    setcurrentPage(pageNumber);
  };

  const Pagination = () => {
    const pageNumbers = [];

    // Check if data is defined and isSuccess is true before trying to access data.length
    if (isSuccess && data?.data?.data) {
      for (
        let i = 1;
        i <= Math.ceil(data.data.data.length / productsperpage);
        i++
      ) {
        pageNumbers.push(i);
      }
    }
    return (
      isSuccess &&
      data?.data?.data && (
        <nav>
          <ul className="pagination justify-content-center fw-bolder mb-5 ">
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <a
                  onClick={(e) => paginate(e, number)}
                  className="page-link cursor-pointer mt-3"
                  style={{ color: "green" }}>
                  {number}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )
    );
  };

  let BaseUrl = "https://ecommerce.routemisr.com";

  let addToTheCart = async (id) => {
    let res = await addCart(id);
    if (!isLogin) {
      toast.error(res.response.data.message);
      return;
    }
    toast.success(res.data.message);
    setNumOfCartItems(res.data.numOfCartItems);
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
  const getData = () => {
    return axios.get(`${BaseUrl}/api/v1/products`);
  };

  const { isLoading, isSuccess, data, isFetching, isRefetching } = useQuery(
    "products",
    getData
  );
  useEffect(() => {
    if (data?.data?.data && data.data.data.length > 0) {
      const indexOfLastProduct = currentPage * productsperpage;
      const indexOfFirstProduct = indexOfLastProduct - productsperpage;
      const slicedProducts = data.data.data.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      setCurrentProduct(slicedProducts);
    }
  }, [data, currentPage, productsperpage]);

  return (
    <div className="container">
      <div className="row">
        {!isLoading ? (
          currentProduct.map((product) => (
            <div className="product col-md-3 p-3" key={product._id}>
              <Link
                to={`/productdetails/${product._id}`}
                key={product._id}
                className=" cursor-pointer  ">
                <img src={product.imageCover} className="w-100"></img>

                <p className="card-title text-main small-text">
                  {product.category.name}
                </p>
                <p>{product.title.split(" ").slice(0, 3).join(" ")}</p>
                <div className="d-flex justify-content-between">
                  <span className=" ">{product.price} EG</span>
                  <span className=" ">
                    {product.ratingsAverage}
                    <i className="fa-solid fa-star rating-color"></i>
                  </span>
                </div>
              </Link>
              <button
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add to the Cart"
                onClick={() => {
                  addToTheCart(product._id);
                }}
                className="btn text-white bg-main my-2 col-7 small-text">
                {" "}
                Add to Cart
              </button>{" "}
              <button
                data-toggle="tooltip"
                data-placement="bottom"
                title="Add to My Favourites"
                onClick={() => {
                  addToTheWhitelist(product._id);
                }}
                className="btn text-white bg-main my-2 col-4 small-text ">
                <i className="fa-solid fa-heart "></i>
              </button>
            </div>
          ))
        ) : (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                <Skeleton variant="rectangular" width={210} height={100} />

                <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
              </React.Fragment>
            ))}
          </>
        )}
      </div>

      <Pagination />
    </div>
  );
}
