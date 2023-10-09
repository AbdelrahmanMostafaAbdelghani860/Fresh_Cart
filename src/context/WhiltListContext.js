import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserToken } from "./UserToken";

export let WhitelistContext = createContext(0);

export default function WhitelistContextProvider({ children }) {
  let { isLogin } = useContext(UserToken);
  let BaseUrl = "https://ecommerce.routemisr.com";
  let headers = { token: isLogin };
  let [numOfWhitelistItems, setNumOfWhitelistItems] = useState(0);
  function addWhitelist(productId) {
    return axios
      .post(`${BaseUrl}/api/v1/wishlist`, { productId }, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function getWhitelist() {
    return axios
      .get(`${BaseUrl}/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteWhitelist(productId) {
    return axios
      .delete(`${BaseUrl}/api/v1/wishlist/${productId}`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WhitelistContext.Provider
      value={{
        addWhitelist,
        getWhitelist,
        deleteWhitelist,
        numOfWhitelistItems,
        setNumOfWhitelistItems,
      }}>
      {children}
    </WhitelistContext.Provider>
  );
}
