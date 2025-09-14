import React, { useContext, useEffect, useState } from "react";
import { SummaryAPI } from "../commonFile/Summary";
import Context from "../context";
import displayCurrency from "../helperFile/DisplayCurrency";
import { MdDelete } from "react-icons/md";

const ShowCartProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingList = new Array(context.countADDCArt).fill(null);

  const fetchAllAddCartProduct = async () => {
    const fetchData = await fetch(SummaryAPI.showAllCartProducts.url, {
      method: SummaryAPI.showAllCartProducts.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataAPI = await fetchData.json();
    setData(dataAPI?.data);
  };

  const increamentQuantity = async (id, qty) => {
    const productQty = await fetch(SummaryAPI.updateAddCartProductQuanity.url, {
      method: SummaryAPI.updateAddCartProductQuanity.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: 1,
      }),
    });

    const dataAPI = await productQty.json();

    if (dataAPI.success) {
      fetchAllAddCartProduct();
    }
  };

  const decreamentQuantity = async (id, qty) => {
    if (qty >= 2) {
      const productQty = await fetch(
        SummaryAPI.updateAddCartProductQuanity.url,
        {
          method: SummaryAPI.updateAddCartProductQuanity.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: -1,
          }),
        }
      );

      const dataAPI = await productQty.json();
      if (dataAPI.success) {
        fetchAllAddCartProduct();
      }
    }
  };

  const handleFetchBtn = async () => {
    fetchAllAddCartProduct();
  };

  useEffect(() => {
    setLoading(true);
    handleFetchBtn();
    setLoading(false);
  }, []);

  const handleCartBtnDelete = async (id) => {
    const deleteCart = await fetch(SummaryAPI.deleteAddCartProduct.url, {
      method: SummaryAPI.deleteAddCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const resDataAPI = await deleteCart.json();
    if (resDataAPI.success) {
      fetchAllAddCartProduct();
      context.FetchAddCArtProduct();
    }
  };

  const totalQty = data.reduce(
    (preValue, currValue) => preValue + currValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (preVal, CurrVal) =>
      preVal + CurrVal.quantity * CurrVal.productId.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p>No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-center p-4">
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingList.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full bg-slate-200 h-32 my-2 rounded p-1 border-slate-300 animate-pulse"
                ></div>
              );
            })
          ) : (
            <div className="">
              {data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white h-full my-2 rounded grid grid-cols-[128px,1fr] p-1 border-slate-300"
                  >
                    <div className="w-32 h-ful bg-slate-200">
                      <img
                        src={product?.productId.uploadProductImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div className="absolute right-0 -top-1 text-red-600 rounded-full p-1 hover:bg-red-700 cursor-pointer hover:text-white">
                        <MdDelete
                          onClick={() => handleCartBtnDelete(product?._id)}
                        />
                      </div>
                      <h1 className=" text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product.productId.product}
                      </h1>
                      <p className="capitalize text-slate-700">
                        {product.productId.category}{" "}
                      </p>

                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-red-600 mt-1 text-xl">
                          {displayCurrency(product.productId.sellingPrice)}
                        </p>
                        <p className="font-base text-slate-700 mt-1 text-lg">
                          {displayCurrency(
                            product.productId.sellingPrice * product.quantity
                          )}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          className="border border-red-700 hover:bg-red-800 hover:text-white  h-6 w-6 rounded flex items-center justify-center "
                          onClick={() =>
                            decreamentQuantity(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity} </span>
                        <button
                          className=" border border-red-700 hover:bg-red-800 hover:text-white   h-6 w-6 rounded flex items-center justify-center"
                          onClick={() =>
                            increamentQuantity(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-full lg:mt-0 mt-5 lg:max-w-sm">
          {loading ? (
            <div className="bg-slate-200 h-32">Total</div>
          ) : (
            <div className="bg-slate-200 h-32 ">
              <h1 className="bg-red-700 text-white px-4">Summary</h1>
              <div className="px-4  flex justify-between items-center">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="px-4  flex justify-between items-center">
                <p>Total Price</p>
                <p>{displayCurrency(totalPrice)}</p>
              </div>
              <div>
                <button className="p-2 bg-blue-700 hover:bg-blue-900 text-white mt-3 tex-center w-full">
                  Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCartProduct;
