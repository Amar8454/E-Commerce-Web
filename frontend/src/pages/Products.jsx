import React, { useEffect, useState } from "react";
import UploadProduct from "../component/UploadProduct";
import { SummaryAPI } from "../commonFile/Summary";
import ShowProductImage from "../component/ShowProductImage";

const Products = () => {
  const [OpenProductModel, setOpenProductModel] = useState(false);
  const [showProductData, setshowProductData] = useState([]);

  const getAllProduct = async () => {
    const fetchAllData = await fetch(SummaryAPI.getAllProduct.url);
    const dataAPI = await fetchAllData.json();
    setshowProductData(dataAPI?.data || []);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center bg-white py-2 -x-4">
        <h2 className="font-bold text-lg pl-2">All Product</h2>
        <button
          className="bg-blue-700 text-white hover:bg-blue-900 px-2 py-2
         rounded-full pr-2"
          onClick={() => setOpenProductModel(true)}
        >
          Upload Product
        </button>
      </div>

      <div className="flex-wrap flex items-center gap-14 py-4 h-[calc(100vh-190px)] overflow-y-scroll ">
        {showProductData.map((el, idx) => {
          return (
            <div>
              <ShowProductImage
                data={el}
                key={idx}
                fetchDataPage={getAllProduct}
              />
            </div>
          );
        })}
      </div>

      <div>
        {OpenProductModel && (
          <UploadProduct onClose={() => setOpenProductModel(false)} />
        )}
      </div>
    </>
  );
};

export default Products;
