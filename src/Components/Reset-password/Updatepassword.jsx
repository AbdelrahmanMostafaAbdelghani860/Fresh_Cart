import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Bars } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserToken } from "../../context/UserToken";

export default function () {
  let baseUrl = "https://ecommerce.routemisr.com/api/v1";

  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let [data, setData] = useState(false);
  let { setIsLogin } = useContext(UserToken);

  let navigate = useNavigate();
  const enterSubmit = async (values) => {
    setLoading(true);
    let { data } = await axios
      .put(`${baseUrl}/auth/resetPassword`, values)
      .catch((err) => {
        setErr(err.response.data.message);
        setLoading(false);
      });
    if (data.token.length > 0) {
      setErr("");
      setLoading(false);
      toast.success("Password Changed Succesfully");
      setData(true);
      navigate("/cart");
      localStorage.setItem("token", data.token);
      setIsLogin(data.token);
    }
  };
  const schmemaValidation = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is Required "),
    newPassword: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must follow the pattern Exmaple@123"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: schmemaValidation,
    onSubmit: enterSubmit,
  });
  return (
    <>
      <div className="container mt-5 py-3 min-vh-100">
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

          <label className="fw-bold mt-3"> New Password : </label>
          <input
            name="newPassword"
            placeholder="Please Enter your New Password"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            className="form-control"
            type="password"></input>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <p className="alert alert-danger">{formik.errors.newPassword}</p>
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
      </div>
    </>
  );
}
