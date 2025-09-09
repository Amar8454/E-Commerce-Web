import React, { useEffect, useState } from "react";
import { SummaryAPI } from "../commonFile/Summary";
import { Link } from "react-router";

const GetProductByCategory = () => {
  const [getProductByCategory, setgetProductByCategory] = useState([]);
  const [loading, setloading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const FetchProductByCategory = async () => {
    setloading(true);
    const fetchData = await fetch(SummaryAPI.getProductByCategory.url);
    const dataAPI = await fetchData.json();
    setloading(false);
    setgetProductByCategory(dataAPI.data);
  };

  useEffect(() => {
    FetchProductByCategory();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4 overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-spin"></div>
              );
            })
          : getProductByCategory.map((product, idx) => {
              return (
                <Link
                  to={"/category-product?category=" + product?.category}
                  className=""
                  key={idx}
                >
                  <div className="h-16 w-16 md:w-20 md:h-20 overflow-hidden rounded-full p-3 bg-slate-200 flex items-center justify-center">
                    <img
                      src={product?.uploadProductImage[0]}
                      alt={product.uploadProductImage}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  </div>

                  <p className="text-center text-sm md:text-base capitalize">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default GetProductByCategory;
