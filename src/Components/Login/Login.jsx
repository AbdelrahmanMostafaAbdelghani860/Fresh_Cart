import React, { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { UserToken } from "../../context/UserToken";
export default function Login() {
  let { setIsLogin } = useContext(UserToken);
  let baseUrl = "https://ecommerce.routemisr.com/api/v1";
  let [loading, setLoading] = useState(false);
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  const loginSubmit = async (values) => {
    setLoading(true);
    let { data } = await axios
      .post(`${baseUrl}/auth/signin`, values)
      .catch((err) => {
        setErr(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      setErr("");
      setLoading(false);
      localStorage.setItem("token", data.token);
      setIsLogin(data.token);
      navigate("/cart");
    }
    // console.log(isLogin);
  };

  const schmemaValidation = Yup.object({
    email: Yup.string().email("Email not valid").required("Email is Required "),

    password: Yup.string()
      .required("Password is Required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Password must follow the pattern Exmaple@123"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schmemaValidation,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <div className="container min-vh-100">
        <form className=" mx-auto w-75 my-5 " onSubmit={formik.handleSubmit}>
          {err ? <p className="alert alert-danger">{err}</p> : ""}
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
          <div className="row justify-content-between px-3 ">
            {loading ? (
              <button className="btn form-btn float py-2">
                <FallingLines
                  color="white"
                  height="10"
                  width="30"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-danger  float "
                onClick={() => navigate("/reset_password")}>
                Forget Password
              </button>
            )}
            {loading ? (
              <button className="btn form-btn float-end py-2">
                <FallingLines
                  color="white"
                  height="10"
                  width="30"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </button>
            ) : (
              <button
                type="submit"
                className="btn form-btn float-end "
                disabled={!(formik.isValid && formik.dirty)}>
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
