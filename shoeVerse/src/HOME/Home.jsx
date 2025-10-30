import React from "react";
import { Nav } from "../navbar/Nav";
import SubNav from "../navbar/SubNav";
import Footer from "./Footer";
import HomeProducts from "../product/HomeProducts";
import Qualityaboutus from "../Main/Qualityaboutus";
import Image1 from "../image/Image1";
import Image2 from "../image/Image2";

export const Home = () => {
  return (
    <div>
      <Nav />
      <SubNav />
      <Image1/>
      <HomeProducts />
      <Image2/>
      <Qualityaboutus/>
      <Footer />
    </div>
  );
};
