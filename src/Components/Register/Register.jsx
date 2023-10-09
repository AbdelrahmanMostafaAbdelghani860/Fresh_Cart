import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let baseUrl = "https://ecommerce.routemisr.com/api/v1";

  const registerSubmit = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/auth/signup`, values)
      .catch((err) => {
        setErr(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      setErr("");
      setLoading(false);
      navigate("login");
    }
  };
  // const validation = () => {};
  const schmemaValidation = Yup.object({
    name: Yup.string()
      .min(3, "Min Length is 3 characters")
      .max(20, "Max Length is 20 characters")
      .required("Name is Required"),
    email: Yup.string().email("Email not valid").required("Email is Required "),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "Phone not match")
      .required("Please Enter a phone number"),
    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must follow the pattern Exmaple@123"
      ),
    rePassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Password and Confirm password are not match"
      )
      .required("Confirm password is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: schmemaValidation,
    onSubmit: registerSubmit,
  });
  return (
    <>
      <div className="container min-vh-100">
        <form className=" mx-auto w-75 my-5 " onSubmit={formik.handleSubmit}>
          {err ? <p className="alert alert-danger">{err}</p> : ""}
          <label htmlFor="userName"> Name</label>
          <input
            type="text"
            className="form-control mb-3"
            id="userName"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}></input>
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger">{formik.errors.name}</p>
          ) : (
            ""
          )}

          <label htmlFor="email"> Email</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}></input>
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}

          <label htmlFor="password"> Password</label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}></input>
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger">{formik.errors.password}</p>
          ) : (
            ""
          )}
          <label htmlFor="phone"> Phone</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}></input>
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger">{formik.errors.phone}</p>
          ) : (
            ""
          )}
          <label htmlFor="rePassword"> Confirm Password</label>
          <input
            type="text"
            className="form-control mb-3"
            id="rePassword"
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}></input>
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger">{formik.errors.rePassword}</p>
          ) : (
            ""
          )}

          {loading ? (
            <button className="btn form-btn float-end">
              <Bars
                height="50"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          ) : (
            <button
              type="submit"
              className="btn form-btn float-end"
              disabled={!(formik.isValid && formik.dirty)}>
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
