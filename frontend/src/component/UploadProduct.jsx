import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import AllProductCatogory from "../helperFile/ProductCategory";
import uploadImage from "../helperFile/UploadImageoncloud";
import ShowFullImage from "./ShowFullImage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { SummaryAPI } from "../commonFile/Summary";

const UploadProduct = ({ onClose }) => {
  const [OpenfullProductModel, setOpenFullProductModel] = useState(false);
  const [showFullProductImage, setshowFullProductImage] = useState("");

  const [UploadProducts, setUploadProducts] = useState({
    product: "",
    brandName: "",
    category: "",
    uploadProductImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const handleUploadProduct = (e) => {
    const { name, value } = e.target;
    setUploadProducts((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleProductDeletBtn = (idx) => {
    const deleteProduct = [...UploadProducts.uploadProductImage];
    deleteProduct.splice(idx, 1);
    setUploadProducts((preValue) => {
      return {
        ...preValue,
        uploadProductImage: [...deleteProduct],
      };
    });
  };

  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    const uploadProductImageOnCloud = await uploadImage(file);
    setUploadProducts((preValue) => {
      return {
        ...preValue,
        uploadProductImage: [
          ...preValue.uploadProductImage,
          uploadProductImageOnCloud.url,
        ],
      };
    });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    const fetchData = await fetch(SummaryAPI.uploadProduct.url, {
      method: SummaryAPI.uploadProduct.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UploadProducts),
    });
    const dataAPI = await fetchData.json();

    if (dataAPI.success) {
      toast.success(dataAPI.message);
      onClose();
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
    setUploadProducts({
      product: "",
      brandName: "",
      category: "",
      uploadProductImage: [],
      description: "",
      price: "",
      sellingPrice: "",
    });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-30 ">
      <div className=" w-full p-4 max-h-[70%] h-full max-w-2xl bg-white rounded">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">UpLoade Product</h2>
          <div
            className=" cursor-pointer text-xl hover:text-red-500"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full"
          onSubmit={handleSubmitFormData}
        >
          <label htmlFor="product" className="text-xl">
            Product Name:
          </label>
          <input
            onChange={handleUploadProduct}
            type="text"
            name="product"
            value={UploadProducts.product}
            placeholder="enter product name"
            id="product"
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="brand" className="text-xl">
            Brand Name:
          </label>
          <input
            onChange={handleUploadProduct}
            name="brandName"
            value={UploadProducts.brandName}
            type="text"
            placeholder="enter brand name"
            id="brand"
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="product" className="text-xl">
            Category:
          </label>
          <select
            onChange={handleUploadProduct}
            className="p-2 bg-slate-100 border rounded"
            required
            name="category"
            value={UploadProducts.category}
          >
            <option value={""}>Select Category</option>
            {AllProductCatogory.map((el, index) => {
              return (
                <option value={el.value} key={index}>
                  {el.lable}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="text-xl">
            Product Image:
          </label>
          <label htmlFor="uploadImage">
            <div className="p-2 bg-slate-100 border rounded h-32 flex cursor-pointer justify-center items-center w-full">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl ">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  onChange={handleUploadProductImage}
                  type="file"
                  placeholder="Upload Product Image"
                  id="uploadImage"
                  hidden
                />
              </div>
            </div>
          </label>

          <div>
            {UploadProducts?.uploadProductImage[0] ? (
              <div className="flex items-center gap-2">
                {UploadProducts.uploadProductImage.map((el, idx) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        width={80}
                        height={80}
                        alt={el}
                        className="bg-slate-100 border cursor-pointer"
                        key={idx}
                        onClick={() => {
                          setOpenFullProductModel(true);
                          setshowFullProductImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white rounded-full bg-red-600 hidden cursor-pointer group-hover:block"
                        onClick={() => handleProductDeletBtn(idx)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-sm">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="Productprice" className="text-xl">
            Price:
          </label>
          <input
            onChange={handleUploadProduct}
            type="number"
            placeholder="enter product price"
            name="price"
            value={UploadProducts.price}
            className="p-2 bg-slate-100 border rounded"
            id="Productprice"
            required
          />

          <label htmlFor="sellingPrice" className="text-xl">
            Selling Price:
          </label>
          <input
            onChange={handleUploadProduct}
            type="number"
            placeholder="enter selling price"
            name="sellingPrice"
            value={UploadProducts.sellingPrice}
            className="p-2 bg-slate-100 border rounded"
            id="sellingPrice"
            required
          />

          <label htmlFor="descriptions" className="text-xl">
            Description:
          </label>
          <textarea
            rows={3}
            onChange={handleUploadProduct}
            type="text"
            placeholder="enter description here..."
            name="description"
            value={UploadProducts.description}
            className="p-2 bg-slate-100 border rounded h-28 "
            id="descriptions"
            required
          />

          <button className="bg-red-600 text-white hover:bg-red-800 mb-5 px-3 py-2 mt-5">
            Upload Product
          </button>
        </form>
      </div>

      <div>
        {OpenfullProductModel && (
          <ShowFullImage
            onClose={() => setOpenFullProductModel(false)}
            ImageUrl={showFullProductImage}
          />
        )}
      </div>
    </div>
  );
};

export default UploadProduct;
