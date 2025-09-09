import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { SummaryAPI } from "../commonFile/Summary";
import ShowSearchCart from "../component/ShowSearchCart";

const SearchProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  const query = useLocation();

  const fetchSearchData = async () => {
    setloading(true);
    const fetchData = await fetch(
      SummaryAPI.searchProductSection.url + query.search
    );

    setloading(false);
    const dataAPI = await fetchData.json();
    setData(dataAPI.data);
  };

  useEffect(() => {
    fetchSearchData();
  }, [query]);

  return (
    <div className="container mx-auto">
      {loading && <p className="text-lg text-center">Loading...</p>}

      <p className="text-lg font-semibold my-3">Search Results:{data.length}</p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4"> No Data Found...</p>
      )}

      {data.length !== 0 && !loading && (
        <ShowSearchCart loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
