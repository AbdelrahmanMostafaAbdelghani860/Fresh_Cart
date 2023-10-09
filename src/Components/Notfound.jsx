import React from "react";
import img from "../assets/error.svg";
export default function Notfound() {
  return (
    <div className="my-5 text-center mx-auto w-75 ">
      <h1 className="tect-center">Not Found</h1>
      <img src={img} alt="" className="my-4" />
    </div>
  );
}
