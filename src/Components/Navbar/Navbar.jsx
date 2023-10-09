import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoPic from "../../assets/freshcart-logo.svg";
import { UserToken } from "../../context/UserToken";
import { CartContext } from "../../context/CartContext";
import { WhitelistContext } from "../../context/WhiltListContext";
export default function Navbar() {
  let { isLogin, setIsLogin } = useContext(UserToken);
  let { numOfCartItems, setNumOfCartItems, getCart } = useContext(CartContext);
  let { numOfWhitelistItems, setNumOfWhitelistItems, getWhitelist } =
    useContext(WhitelistContext);
  let navigate = useNavigate();
  let logout = () => {
    localStorage.removeItem("token");
    setIsLogin(null);

    navigate("/register");
  };
  let getFromTheWhitelist = async () => {
    let res = await getWhitelist();

    setNumOfWhitelistItems(res?.data.count);
  };
  let getFromTheCart = async () => {
    let res = await getCart();
    if (res?.data?.status === "success") {
      setNumOfCartItems(res.data?.numOfCartItems);
    }
    if (res?.response?.data?.message) setNumOfCartItems(0);
  };
  useEffect(() => {
    if (!isLogin) {
      return;
    }
    getFromTheWhitelist();
    getFromTheCart();
  }, [isLogin]);
  // console.log(isLogin);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        id="myNavbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logoPic} alt="logo"></img>
          </Link>

          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {isLogin ? (
              <>
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="cart">
                      Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="product">
                      Products
                    </Link>
                  </li>{" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="brands">
                      Brands
                    </Link>
                  </li>{" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="categories">
                      Categories
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              ""
            )}
            <ul className="navbar-nav ml-auto  mt-lg-0">
              {!isLogin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item d-flex align-items-center">
                  <Link
                    className="fa-solid fa-cart-shopping mx-3 "
                    style={{ position: "relative" }}
                    to="cart">
                    <span
                      className="small-text  p-1 "
                      style={{
                        color: "white",
                        top: "-14px",
                        opacity: ".6",
                        right: "-5px",
                        position: "absolute",
                        backgroundColor: "green",
                        borderRadius: "5px",
                      }}>
                      {numOfCartItems}
                    </span>
                  </Link>{" "}
                  {/* <i className="fa-brands fa-facebook mx-2"> </i>
                  <i className="fa-brands fa-youtube mx-2"> </i>
                  <i className="fa-brands fa-instagram mx-2"> </i> */}
                  <Link
                    className="fa-solid fa-heart mx-3 fs-4 "
                    style={{ position: "relative" }}
                    to="whitlist">
                    <span
                      className="small-text p-1 "
                      style={{
                        color: "white",
                        zIndex: "",
                        top: "-10px",
                        opacity: ".6",
                        right: "-3px",
                        position: "absolute",
                        backgroundColor: "red",
                        borderRadius: "4px",
                      }}>
                      {numOfWhitelistItems}
                    </span>
                  </Link>
                </li>
              )}
              {isLogin ? (
                <li className="nav-item">
                  <span className="nav-link cursor-pointer" onClick={logout}>
                    Sign Out
                  </span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
