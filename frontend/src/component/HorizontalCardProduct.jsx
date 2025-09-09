import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchCategoryWiseProduct } from "../helperFile/FetchCategoryWiseProduct";
import displayCurrency from "../helperFile/DisplayCurrency";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router";
import AddCart from "../helperFile/AddCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();
  const { FetchAddCArtProduct } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setdata(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const RightScroll = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const LeftScroll = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const handleAddCartBtn = async (e, _id) => {
    await AddCart(e, _id);
    FetchAddCArtProduct();
  };

  return (
    <div className="container mx-auto px-4 my-4 relative">
      <div>
        <h1 className="text-2xl font-semibold py-2">{heading}</h1>

        <div
          className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
          ref={scrollElement}
        >
          <button
            className="bg-white shadow-md rounded-full p-1 absolute text-lg left-0 hidden md:block"
            onClick={LeftScroll}
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white shadow-md rounded-full p-1 absolute text-lg right-0 hidden md:block "
            onClick={RightScroll}
          >
            <FaAngleRight />
          </button>

          {loading
            ? loadingList.map((el, idx) => {
                return (
                  <div
                    className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                    key={idx}
                  >
                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                    <div className="p-4 grid w-full gap-2">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse rounded-full"></h2>
                      <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>

                      <div className="flex gap-3 w-full">
                        <p className="text-red-600 font-medium p-1 bg-slate-200 animate-pulse rounded-full"></p>
                        <p className="text-slate-500 line-through p-1 bg-slate-200 animate-pulse rounded-full"></p>
                      </div>

                      <button className=" text-white px-1 py-0.2 animate-pulse rounded-full bg-slate-200"></button>
                    </div>
                  </div>
                );
              })
            : data.map((el, idx) => {
                return (
                  <Link
                    to={"/product/" + el?._id}
                    className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                    key={idx}
                  >
                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                      <img
                        src={el.uploadProductImage[0]}
                        alt="productImage"
                        className="h-full object-scale-down hover:scale-125 transition-all"
                      />
                    </div>
                    <div className="p-4 grid ">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                        {el?.product}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {el.category}{" "}
                      </p>

                      <div className="flex gap-3">
                        <p className="text-red-600 font-medium">
                          {displayCurrency(el?.sellingPrice)}
                        </p>
                        <p className="text-slate-500 line-through">
                          {displayCurrency(el?.price)}
                        </p>
                      </div>

                      <button
                        className="bg-red-500 text-white px-1 py-0.2 rounded-full"
                        onClick={(e) => handleAddCartBtn(e, el._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
