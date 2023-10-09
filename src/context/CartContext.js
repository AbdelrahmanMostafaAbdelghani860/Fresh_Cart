import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";

export let CartContext = createContext(0);

export default function CartContextProvider({ children }) {
  let { isLogin } = useContext(UserToken);
  let BaseUrl = "https://ecommerce.routemisr.com";
  let headers = { token: isLogin };
  let [numOfCartItems, setNumOfCartItems] = useState(0);
  let [cartId, setCartId] = useState(0);
  function addCart(productId) {
    return axios
      .post(`${BaseUrl}/api/v1/cart`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function getCart() {
    return axios
      .get(`${BaseUrl}/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function getCategories() {
    return axios
      .get(`${BaseUrl}/api/v1/categories`)
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteCart(productId) {
    return axios
      .delete(`${BaseUrl}/api/v1/cart/${productId}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function updateCart(productId, count) {
    return axios
      .put(`${BaseUrl}/api/v1/cart/${productId}`, { count }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function checkOut(cartID, values) {
    return axios
      .post(
        `${BaseUrl}/api/v1/orders/checkout-session/${cartID}`,
        { values },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCart() {
    return axios
      .delete(`${BaseUrl}/api/v1/cart/`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <CartContext.Provider
      value={{
        addCart,
        getCart,
        deleteCart,
        updateCart,
        numOfCartItems,
        setNumOfCartItems,
        checkOut,
        cartId,
        setCartId,
        getCategories,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
