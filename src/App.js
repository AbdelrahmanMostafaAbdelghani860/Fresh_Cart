// import logo from "./logo.svg";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Products/Products";
import Categories from "./Components/Caregories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Notfound from "./Components/Notfound";
import { useContext, useEffect } from "react";
import { UserToken } from "./context/UserToken";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails";
import toast, { Toaster } from "react-hot-toast";
import Whitelist from "./Components/whitelist/Whitelist";
import Reset_password from "./Components/Reset-password/Reset_password";
import Updatepassword from "./Components/Reset-password/Updatepassword";
function App() {
  let { setIsLogin } = useContext(UserToken);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(localStorage.getItem("token"));
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              {" "}
              <Home></Home>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories></Categories>
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands></Brands>
            </ProtectedRoute>
          ),
        },
        {
          path: "product",
          element: (
            <ProtectedRoute>
              {" "}
              <Products></Products>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart></Cart>
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: <Register></Register>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },

        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails></ProductDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "whitlist",
          element: (
            <ProtectedRoute>
              <Whitelist></Whitelist>
            </ProtectedRoute>
          ),
        },
        {
          path: "reset_password",
          element: <Reset_password></Reset_password>,
        },
        {
          path: "updatepassword",
          element: <Updatepassword></Updatepassword>,
        },
        {
          path: "*",
          element: <Notfound></Notfound>,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
