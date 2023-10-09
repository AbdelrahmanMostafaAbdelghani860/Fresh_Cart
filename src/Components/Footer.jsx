import React from "react";

export default function Footer() {
  return (
    <footer className="bg-main-light position-absolute w-100 ">
      <div className="container mt-5 py-5 ">
        <h1>Get the Fresh Cart</h1>
        <p> We Share this link Lorem, ipsum dolor.</p>
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control"
              placeholder="share link"
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success form-control">Share Link</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
