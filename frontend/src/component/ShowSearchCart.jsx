import React, { useContext } from "react";
import { Link } from "react-router";
import displayCurrency from "../helperFile/DisplayCurrency";
import AddCart from "../helperFile/AddCart";
import Context from "../context";

const ShowSearchCart = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { FetchAddCArtProduct } = useContext(Context);

  const handleAddCartBtn = async (e, _id) => {
    await AddCart(e, _id);
    FetchAddCArtProduct();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-between md:gap-2 overflow-x-scroll scrollbar-none ">
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
                className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow "
                key={idx}
              >
                <div className="bg-slate-200 h-44 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={el?.uploadProductImage[0]}
                    alt="productImage"
                    className="h-full object-scale-down hover:scale-125 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-2">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1">
                    {el?.product}
                  </h2>
                  <p className="capitalize text-slate-500">{el?.category} </p>

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
  );
};

export default ShowSearchCart;
