import React from "react";
import FeaturedProducts from "../FeaturedProducts";
import CategorySlider from "../CategorySlider";
import MainSlider from "../MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <MainSlider></MainSlider>
      <CategorySlider></CategorySlider>
      <FeaturedProducts></FeaturedProducts>
    </>
  );
}
