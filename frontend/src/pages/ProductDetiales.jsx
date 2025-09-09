import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { SummaryAPI } from "../commonFile/Summary";
import { FaStar } from "react-icons/fa";
import displayCurrency from "../helperFile/DisplayCurrency";
import GetCategoryWiseProduct from "../component/GetCategoryWiseProduct";
import Context from "../context";
import AddCart from "../helperFile/AddCart";

const ProductDetiales = () => {
  const [loading, setLoading] = useState(false);
  const [ActiveImage, setActiveImage] = useState("");
  const params = useParams();
  const [data, setData] = useState({
    product: "",
    brandName: "",
    category: "",
    uploadProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const loadingList = new Array(13).fill(null);
  const { FetchAddCArtProduct } = useContext(Context);
  const navigate = useNavigate();

  const getProductDetaile = async () => {
    setLoading(false);
    const fetchData = await fetch(SummaryAPI.getProductDetiales.url, {
      method: SummaryAPI.getProductDetiales.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataAPI = await fetchData.json();
    setData(dataAPI?.data);
    setActiveImage(dataAPI?.data?.uploadProductImage[0]);
  };

  useEffect(() => {
    getProductDetaile();
  }, [params?.id]);

  const HandleMouseEnterHover = (ele) => {
    setActiveImage(ele);
  };

  const handleAddCartBtn = async (e, _id) => {
    await AddCart(e, _id);
    FetchAddCArtProduct();
  };

  const handleBuyBtn = async (e, _id) => {
    await AddCart(e, _id);
    FetchAddCArtProduct();
    navigate("/showCartProduct");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl py-4 font-semibold">Product Details</h1>
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex-col lg:flex-row-reverse gap-4 flex">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={ActiveImage}
              alt="productImage"
              className="w-full h-full object-scale-down mix-blend-multiply"
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {loadingList.map((el, idx) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded "
                      key={idx}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className=" flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.uploadProductImage.map((ele, idx) => {
                  return (
                    <div key={idx} className="h-20 w-20 bg-slate-200 rounded">
                      <img
                        src={ele}
                        alt="ProductImage"
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => HandleMouseEnterHover(ele)}
                        onClick={() => HandleMouseEnterHover(ele)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* product details */}

        {loading ? (
          <div>
            <div className="grid gap-1 w-full">
              <p className=" w-full text-center bg-slate-200 animate-pulse h-6  px-2 inline-block rounded-full"></p>
              <h1 className="font-semibold text-2xl rounded-full my-1 animate-pulse w-full h-6 lg:text-4xl bg-slate-200"></h1>
              <p className="bg-slate-200 my-1 min-w-[100px] rounded-full animate-pulse h-6 w-full"></p>
            </div>
            <div className="flex bg-slate-200 h-6  w-full items-center gap-1 animate-pulse rounded-full"></div>
            <div className="flex gap-2 items-center justify-center lg:text-2xl text-2xl my-1 font-medium animate-pulse h-6 w-full">
              <p className="bg-slate-200"></p>
              <p className="bg-slate-200  line-through"></p>
            </div>

            <div className="flex items-center  gap-3 my-2 animate-pulse rounded-full">
              <button className="border-2 bg-slate-200 rounded px-3 py-1 min-w-[120px] w-full h-6"></button>
              <button className="border-2 bg-slate-200 rounded px-3 py-1 min-w-[120px] w-full h-6"></button>
            </div>

            <div>
              <p className="font-medium my-1 h-6 bg-slate-200 rounded-full animate-pulse "></p>
              <p className="bg-slate-200 rounded-full h-6 animate-pulse font-medium mt-4">
                {" "}
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <div>
                <p className=" w-fit text-center bg-red-300 text-red-600 px-2 inline-block rounded-full">
                  {data?.brandName}
                </p>
                <h1 className="font-semibold text-xl my-1">{data?.product} </h1>
                <p className="text-slate-500 my-1">{data?.category} </p>
              </div>
              <div className="flex text-red-500 items-center gap-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="flex gap-2 items-center lg:text-2xl text-2xl my-1 font-medium">
                <p className="text-red-600 ">
                  {displayCurrency(data?.sellingPrice)}{" "}
                </p>
                <p className="text-slate-400 line-through">
                  {displayCurrency(data?.price)}{" "}
                </p>
              </div>

              <div className="flex items-center  gap-3 my-2">
                <button
                  className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={(e) => handleBuyBtn(e, data._id)}
                >
                  Buy
                </button>
                <button
                  className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px]  text-white bg-red-700 hover:bg-white font-medium hover:text-red-600"
                  onClick={(e) => handleAddCartBtn(e, data?._id)}
                >
                  Add To Cart
                </button>
              </div>

              <div>
                <p className="text-slate-600 font-medium mt-4">
                  Description :-
                </p>
                <p>{data?.description} </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {data.category && (
        <GetCategoryWiseProduct
          category={data?.category}
          heading={"Recommended Product"}
        />
      )}
    </div>
  );
};

export default ProductDetiales;
