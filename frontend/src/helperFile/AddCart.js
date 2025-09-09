import { SummaryAPI } from "../commonFile/Summary";
import { toast } from "react-toastify";

const AddCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const fetchData = await fetch(SummaryAPI.addProductInCart.url, {
    method: SummaryAPI.addProductInCart.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  const dataAPI = await fetchData.json();

  if (dataAPI.success) {
    toast.success(dataAPI.message);
  }

  if (dataAPI.error) {
    toast.error(dataAPI.message);
  }

  return dataAPI;
};

export default AddCart;
