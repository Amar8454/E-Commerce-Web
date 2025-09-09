import React, { useContext, useEffect, useRef, useState } from "react";
import { fetchCategoryWiseProduct } from "../helperFile/FetchCategoryWiseProduct";
import displayCurrency from "../helperFile/DisplayCurrency";
import { Link } from "react-router";
import AddCart from "../helperFile/AddCart";
import Context from "../context";

const GetCategoryWiseProduct = ({ category, heading }) => {
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

  const handleAddCartBtn = async (e, _id) => {
    AddCart(e, _id);
    FetchAddCArtProduct();
  };
  return (
    <div className="container mx-auto px-4 my-4 relative">
      <div>
        <h1 className="text-2xl font-semibold py-2">{heading}</h1>

        <div
          className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between items-center gap-4 md:gap-6 overflow-scroll scrollbar-none "
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((el, idx) => {
                return (
                  <div
                    className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                    key={idx}
                  >
                    <div className="bg-slate-200 h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse "></div>
                    <div className="p-4 grid gap-2">
                      <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse rounded-full p-2"></h2>
                      <p className="capitalize text-slate-500 bg-slate-200 animate-pulse rounded-full p-1"></p>

                      <div className="flex gap-3">
                        <p className="text-red-600 font-medium bg-slate-200 animate-pulse rounded-full p-2"></p>
                        <p className="text-slate-500 line-through bg-slate-200 animate-pulse rounded-full p-2"></p>
                      </div>

                      <button className=" text-white px-1 p-2 bg-slate-200 animate-pulse rounded-full"></button>
                    </div>
                  </div>
                );
              })
            : data.map((el, idx) => {
                return (
                  <Link
                    to={"/product/" + el._id}
                    className="w-full min-w-[250px] md:min-w-[320px] max-w-[250px] md:max-w-[320px]  bg-white rounded-sm shadow "
                    key={idx}
                  >
                    <div className="bg-slate-200 h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center">
                      <img
                        src={el.uploadProductImage[0]}
                        alt="productImage"
                        className="h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply"
                      />
                    </div>
                    <div className="p-4 grid gap-2">
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

export default GetCategoryWiseProduct;
