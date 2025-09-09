import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

import imag1 from "../assest/banner/img1.webp";
import imag2 from "../assest/banner/img2.webp";
import imag3 from "../assest/banner/img3.jpg";
import imag4 from "../assest/banner/img4.jpg";
import imag5 from "../assest/banner/img5.webp";

import image1 from "../assest/banner/img1_mobile.jpg";
import image2 from "../assest/banner/img2_mobile.webp";
import image3 from "../assest/banner/img3_mobile.jpg";
import image4 from "../assest/banner/img4_mobile.jpg";
import image5 from "../assest/banner/img5_mobile.png";

const BannerPageLayout = () => {
  const [currentImage, setcurrentImage] = useState(0);
  const descktopImage = [imag1, imag2, imag3, imag4, imag5];
  const mobileImage = [image1, image2, image3, image4, image5];

  const nextImageRight = () => {
    if (descktopImage.length - 1 > currentImage) {
      setcurrentImage((pre) => pre + 1);
    }
  };

  const nextImageLeft = () => {
    if (currentImage != 0) {
      setcurrentImage((pre) => pre - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (descktopImage.length - 1 > currentImage) {
        nextImageRight();
      } else {
        setcurrentImage(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded-sm">
      <div className="md:h-72 h-60 w-full bg-slate-200 relative">
        <div className="flex h-full w-full overflow-hidden">
          <div className="absolute z-10 w-full h-full md:flex items-center hidden">
            <div className="flex justify-between  text-3xl w-full ">
              <button
                className="bg-white shadow-md rounded-full"
                onClick={nextImageLeft}
              >
                <FaAngleLeft />
              </button>
              <button
                className="bg-white shadow-md rounded-full"
                onClick={nextImageRight}
              >
                <FaAngleRight />
              </button>
            </div>
          </div>

          {descktopImage.map((el, idx) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={idx}
              >
                <img
                  src={el}
                  alt="bannerImage"
                  className="w-full h-full "
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                />
              </div>
            );
          })}

          {/* mobile version */}
          <div className="flex h-full w-full overflow-hidden md:hidden ">
            {mobileImage.map((ele, idx) => {
              return (
                <div
                  className="w-full h-full min-w-full min-h-full transition-all"
                  key={idx}
                >
                  <img
                    src={ele}
                    alt="bannerImage"
                    className="w-full h-full object-fill"
                    style={{ transform: `translateX(-${currentImage * 100}%)` }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPageLayout;
