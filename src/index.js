import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import  from "./context/counterContext.js";
import UserTokenProvider from "./context/UserToken";
import { QueryClient, QueryClientProvider } from "react-query";
import CartContextProvider from "./context/CartContext";
import WhitelistContextProvider from "./context/WhiltListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <UserTokenProvider>
    <WhitelistContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CartContextProvider>
    </WhitelistContextProvider>
  </UserTokenProvider>
);

reportWebVitals();
