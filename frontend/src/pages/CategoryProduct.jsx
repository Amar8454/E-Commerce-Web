import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AllProductCatogory from "../helperFile/ProductCategory";
import { SummaryAPI } from "../commonFile/Summary";
import VerticalCart from "../component/VerticalCart";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const allCategoryQuery = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  allCategoryQuery.forEach((el) => {
    urlCategoryListObject[el] = true;
  });
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategory, setFilterCategory] = useState([]);
  const [sortBy, setsortBy] = useState("");

  const fetchAllDataProduct = async () => {
    const fetchdata = await fetch(SummaryAPI.filtercatergoryProduct.url, {
      method: SummaryAPI.filtercatergoryProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ category: filterCategory }),
    });
    const dataAPI = await fetchdata.json();
    setData(dataAPI.data || []);
  };

  useEffect(() => {
    fetchAllDataProduct();
  }, [filterCategory]);

  const handleSelectCategroy = (e) => {
    const { value, name, checked } = e.target;
    setSelectCategory((preVal) => {
      return {
        ...preVal,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryName) => {
        if (selectCategory[categoryName]) {
          return categoryName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategory(arrayOfCategory);

    const urlFomat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el} &&`;
    });
    navigate("/category-product?" + urlFomat.join(""));
  }, [selectCategory]);

  const handleSortbyProduct = (e) => {
    const { value } = e.target;
    setsortBy(value);
    if (value === "asc") {
      setData((pre) => pre.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((pre) => pre.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);
  return (
    <div className="container mx-auto p-4">
      <div className="lg:grid grid-cols-[200px,1fr] hidden">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div className="">
            <p className="text-base uppercase pb-1 border-b font-semibold text-slate-500">
              Sort By
            </p>

            <form className="text-sm flex flex-col gap-3 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleSortbyProduct}
                  value={"asc"}
                />
                <label htmlFor="">Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  onChange={handleSortbyProduct}
                  value={"dsc"}
                />
                <label htmlFor="">Price - High to Low</label>
              </div>
            </form>
          </div>

          <div className="">
            <p className="text-base uppercase pb-1 border-b font-semibold text-slate-500">
              Category
            </p>

            <form className="text-sm flex flex-col gap-3 py-2">
              {AllProductCatogory.map((category, idx) => {
                return (
                  <div className="flex items-center gap-3" key={idx}>
                    <input
                      type="checkbox"
                      name="category"
                      value={category.value}
                      checked={!!selectCategory[category?.value]}
                      id={category.value}
                      onChange={handleSelectCategroy}
                    />
                    <label htmlFor={category.value}>{category.lable} </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        <div className="p-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Result: {data.length}
          </p>

          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] scrollbar-none">
            {data.length !== 0 && (
              <VerticalCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
