import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Reset_password() {
  let baseUrl = "https://ecommerce.routemisr.com/api/v1";
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let [data, setData] = useState(false);
  let navigate = useNavigate();
  const enterSubmit = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/auth/forgotPasswords`, values)
      .catch((err) => {
        setErr(err.response.data.message);
        setLoading(false);
      });
    if (data.statusMsg === "success") {
      setErr("");
      setLoading(false);
      toast.success(data.message);
      setData(true);
    }
  };
  const schmemaValidation = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is Required "),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schmemaValidation,
    onSubmit: enterSubmit,
  });

  const enterCode = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/auth/verifyResetCode`, values)
      .catch((err) => {
        console.log();
        toast.error(err.response.data.statusMsg.toUpperCase());
        setErr(err.response.data.message);
        setLoading(false);
      });
    console.log(data);
    if (data.status === "Success") {
      console.log(data);
      setErr("");
      setLoading(false);
      toast.success(data.status);
      console.log("Navigating to updatepassword");
      navigate("/updatepassword");
    }
  };
  const schmema_2Validation = Yup.object({
    resetCode: Yup.string()
      .max(6, "Code must be 6 characters")
      .min(5, "Code must be at least 5 characters")
      .required("Code is Required "),
  });
  const formik_2 = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: schmema_2Validation,
    onSubmit: enterCode,
  });

  return (
    <div className="container min-vh-100">
      {" "}
      <h1 className="h2 text-main py-3 mt-4 text-center fw-bolder product">
        Reset Password
      </h1>
      {!data ? (
        <form className="" onSubmit={formik.handleSubmit}>
          {err ? <p className="alert alert-danger my-2">{err}</p> : ""}

          <label className="fw-bold"> Email : </label>
          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="form-control"
            type="text"></input>
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          {!loading ? (
            <button
              type="submit"
              className="form-btn product btn text-white mt-2">
              Submit
            </button>
          ) : (
            <button className="btn form-btn float-end">
              <Bars
                height="20"
                width="50"
                color="white"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          )}
        </form>
      ) : (
        <form className="" onSubmit={formik_2.handleSubmit}>
          {err ? <p className="alert alert-danger my-2">{err}</p> : ""}

          <label className="fw-bold"> Enter Code : </label>
          <input
            name="resetCode"
            placeholder="Your Code"
            onChange={formik_2.handleChange}
            value={formik_2.values.resetCode}
            onBlur={formik_2.handleBlur}
            className="form-control"
            type="text"></input>
          {formik_2.errors.resetCode && formik_2.touched.resetCode ? (
            <p className="alert alert-danger">{formik_2.errors.resetCode}</p>
          ) : (
            ""
          )}
          {!loading ? (
            <button
              type="submit"
              className="btn-danger product btn text-white mt-2">
              Enter
            </button>
          ) : (
            <button className="btn-danger product btn text-white mt-2">
              <Bars
                height="20"
                width="50"
                color="white"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </button>
          )}
        </form>
      )}
    </div>
  );
}
