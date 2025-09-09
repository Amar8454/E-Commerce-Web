const { SummaryAPI } = require("../commonFile/Summary");

exports.fetchCategoryWiseProduct = async (category) => {
  const fetchData = await fetch(SummaryAPI.getCategoryWiseProduct.url, {
    method: SummaryAPI.getCategoryWiseProduct.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ category: category }),
  });

  const dataAPI = await fetchData.json();

  return dataAPI;
};
