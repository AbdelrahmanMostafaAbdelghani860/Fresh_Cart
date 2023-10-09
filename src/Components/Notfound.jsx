import React from "react";
import img from "../assets/error.svg";
export default function Notfound() {
  return (
    <div className="container">
      <div className="my-5 text-center mx-auto w-75 min-vh-100 ">
        <h1 className="tect-center bg-main">Not found </h1>
        <img src={img} alt="" className="my-4" />
      </div>
    </div>
  );
}
