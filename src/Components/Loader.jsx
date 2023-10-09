import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      height={150}
      width={150}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
