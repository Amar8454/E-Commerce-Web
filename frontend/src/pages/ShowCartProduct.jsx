import React, { useContext, useEffect, useState } from "react";
import { SummaryAPI } from "../commonFile/Summary";
import Context from "../context";
import displayCurrency from "../helperFile/DisplayCurrency";
import { MdDelete } from "react-icons/md";

const ShowCartProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const loadingList = new Array(context?.countADDCArt || 3).fill(null);

  const fetchAllAddCartProduct = async () => {
    setLoading(true);
    try {
      const fetchData = await fetch(SummaryAPI.showAllCartProducts.url, {
        method: SummaryAPI.showAllCartProducts.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataAPI = await fetchData.json();

      // ✅ ALWAYS set array
      setData(Array.isArray(dataAPI?.data) ? dataAPI.data : []);
    } catch (error) {
      console.error("Cart fetch error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const increamentQuantity = async (id) => {
    try {
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
            quantity: 1,
          }),
        },
      );

      const dataAPI = await productQty.json();
      if (dataAPI.success) fetchAllAddCartProduct();
    } catch (err) {
      console.error(err);
    }
  };

  const decreamentQuantity = async (id, qty) => {
    if (qty < 2) return;

    try {
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
        },
      );

      const dataAPI = await productQty.json();
      if (dataAPI.success) fetchAllAddCartProduct();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCartBtnDelete = async (id) => {
    try {
      const deleteCart = await fetch(SummaryAPI.deleteAddCartProduct.url, {
        method: SummaryAPI.deleteAddCartProduct.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      const resDataAPI = await deleteCart.json();
      if (resDataAPI.success) {
        fetchAllAddCartProduct();
        context?.FetchAddCArtProduct?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllAddCartProduct();
  }, []);

  // ✅ SAFE reduce
  const totalQty = (data || []).reduce(
    (sum, item) => sum + (item?.quantity || 0),
    0,
  );

  const totalPrice = (data || []).reduce(
    (sum, item) =>
      sum + (item?.quantity || 0) * (item?.productId?.sellingPrice || 0),
    0,
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-center text-lg my-3">
        {!loading && data.length === 0 && <p>No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-center p-4">
        {/* CART LIST */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingList.map((_, idx) => (
              <div
                key={idx}
                className="w-full bg-slate-200 h-32 my-2 rounded animate-pulse"
              />
            ))
          ) : (
            <>
              {data.map((product) => (
                <div
                  key={product?._id}
                  className="w-full bg-white my-2 rounded grid grid-cols-[128px,1fr] p-2"
                >
                  <div className="w-32 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.uploadProductImage?.[0]}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="px-4 py-2 relative">
                    <MdDelete
                      className="absolute right-2 top-2 text-red-600 cursor-pointer"
                      onClick={() => handleCartBtnDelete(product?._id)}
                    />

                    <h1 className="text-lg font-semibold line-clamp-1">
                      {product?.productId?.product}
                    </h1>
                    <p className="text-slate-600 capitalize">
                      {product?.productId?.category}
                    </p>

                    <div className="flex justify-between mt-2">
                      <p className="text-red-600 font-semibold">
                        {displayCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <p>
                        {displayCurrency(
                          product?.productId?.sellingPrice * product?.quantity,
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        className="border px-2"
                        onClick={() =>
                          decreamentQuantity(product?._id, product?.quantity)
                        }
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="border px-2"
                        onClick={() => increamentQuantity(product?._id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* SUMMARY */}
        <div className="w-full lg:max-w-sm">
          <div className="bg-slate-200 rounded">
            <h1 className="bg-red-700 text-white px-4 py-1">Summary</h1>
            <div className="px-4 flex justify-between">
              <p>Quantity</p>
              <p>{totalQty}</p>
            </div>
            <div className="px-4 flex justify-between">
              <p>Total Price</p>
              <p>{displayCurrency(totalPrice)}</p>
            </div>
            <button className="w-full bg-blue-700 text-white mt-3 p-2">
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCartProduct;
