import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import EditProductImage from "./EditProductImage";
import ShowFullImage from "./ShowFullImage";
import displayCurrency from "../helperFile/DisplayCurrency";

const ShowProductImage = ({ data, fetchDataPage }) => {
  const [OpenfullProductModel, setOpenFullProductModel] = useState(false);
  const [showFullProductImage, setshowFullProductImage] = useState("");
  const [openEditProductModel, setopenEditProductModel] = useState(false);

  return (
    <>
      <div className="bg-white p-4 rounded">
        <div className="w-40">
          <div className="w-32 h-32 flex justify-center items-center">
            <img
              className="cursor-pointer w-fit mx-auto object-fill h-full"
              src={data.uploadProductImage[0]}
              alt="productImage"
              onClick={() => {
                setOpenFullProductModel(true);
                setshowFullProductImage(data.uploadProductImage[0]);
              }}
            />
          </div>

          <p className="text-ellipsis line-clamp-2">{data.product} </p>

          <div className="font-semibold">
            {displayCurrency(data.sellingPrice)}
          </div>

          <div
            className="bottom-0 right-0 ml-auto p-1 w-fit text-white rounded-full bg-red-600 cursor-pointer  "
            onClick={() => setopenEditProductModel(true)}
          >
            <MdModeEdit />
          </div>
        </div>
      </div>

      <div>
        {openEditProductModel && (
          <EditProductImage
            onClose={() => setopenEditProductModel(false)}
            productData={data}
            fetchDataPage={fetchDataPage}
          />
        )}
      </div>

      <div>
        {OpenfullProductModel && (
          <ShowFullImage
            onClose={() => setOpenFullProductModel(false)}
            ImageUrl={showFullProductImage}
          />
        )}
      </div>
    </>
  );
};

export default ShowProductImage;
