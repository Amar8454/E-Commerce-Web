import React from "react";
import { SummaryAPI } from "../commonFile/Summary";
import GetProductByCategory from "../component/GetProductByCategory";
import BannerPageLayout from "../component/BannerPageLayout";
import HorizontalCardProduct from "../component/HorizontalCardProduct";
import VerticaCardProduct from "../component/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <GetProductByCategory />
      <BannerPageLayout />
      <HorizontalCardProduct category={"airpods"} heading={"Top's Airpods"} />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watch"} />

      <VerticaCardProduct category={"mobile"} heading={"Top's Mobiles"} />
      <VerticaCardProduct category={"mouse"} heading={"Mouse"} />
      <VerticaCardProduct category={"camera"} heading={"Top Brand's Camera"} />
      <VerticaCardProduct
        category={"earphones"}
        heading={"Top's Earphones and Bluetooth"}
      />
      <VerticaCardProduct
        category={"printers"}
        heading={"Top's Model Printers"}
      />
      <VerticaCardProduct
        category={"speakers"}
        heading={"Top's Bluetooth Speakers"}
      />
      <VerticaCardProduct category={"trimmers"} heading={"Brand's Trimmers"} />
      <VerticaCardProduct category={"tv"} heading={"Top Brand's Tv"} />
      <VerticaCardProduct
        category={"refrigeretor"}
        heading={"Top Brand's Refrigeretor"}
      />
      <VerticaCardProduct category={"processor"} heading={"Top Processor"} />
    </div>
  );
};

export default Home;
