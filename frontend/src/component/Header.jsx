import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../pages/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { SummaryAPI } from "../commonFile/Summary";
import { toast } from "react-toastify";
import { setUserDetials } from "../featureSlice/CounterSlice";
import ROLE from "../commonFile/Role";
import Context from "../context";

const Header = () => {
  const [DisplayMenu, setDisplayMenu] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const context = useContext(Context);
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput.search);
  const searchQuery = urlSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleUserLoggOut = async () => {
    const response = await fetch(SummaryAPI.userLoggOut.url, {
      method: SummaryAPI.userLoggOut.method,
      credentials: "include",
    });

    const dataAPI = await response.json();
    if (dataAPI.success) {
      toast.success(dataAPI.message);
      dispatch(setUserDetials());
      navigate("");
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <>
      <div className="shadow-md h-18 bg-white fixed z-40 w-full">
        <div className="container mx-auto h-full items-center px-4 flex justify-between ">
          <div className="cursor-pointer">
            <Link to={"/"}>
              <Logo width={70} height={12} />
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center w-full max-w-sm border rounded-full focus-within:shadow-md pl-3">
            <input
              type="text"
              placeholder="Search items here..."
              className=" outline-none w-full h-10"
              onChange={handleSearch}
              value={search}
            />
            <div className="border text-lg rounded-sm items-center rounded-r-full flex justify-center h-10 w-14 bg-blue-700 text-white">
              <CiSearch />
            </div>
          </div>

          <div className="flex gap-8 items-center cursor-pointer">
            <div
              className="relative flex items-center justify-center "
              onClick={() => setDisplayMenu((preValue) => !preValue)}
            >
              {user?._id && (
                <div className="text-3xl h-12 w-12 ">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      className="rounded-full h-12 w-12"
                    />
                  ) : (
                    <div className="flex items-center pt-4">
                      <FaRegUserCircle />
                    </div>
                  )}
                </div>
              )}

              {DisplayMenu && (
                <div className="bg-white top-16 absolute bottom-0 h-fit p-2 shadow-xl rounded">
                  {user?.role === ROLE.GENERAL && (
                    <Link
                      to={"/admin/product"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block"
                    >
                      Admin Pannel
                    </Link>
                  )}
                </div>
              )}
            </div>

            {user?._id && (
              <Link to={"/showCartProduct"} className="text-3xl relative">
                <span>
                  <FaShoppingCart />
                </span>
                <div className="bg-red-700 text-white w-5 h-5 rounded-full p-0.5 flex items-center justify-center -top-1 absolute -right-1">
                  <p className="text-sm">{context.countADDCArt} </p>
                </div>
              </Link>
            )}

            <div className="bg-blue-700 text-white rounded-md px-4 py-2 text-center hover:bg-blue-900">
              {user?._id ? (
                <button onClick={handleUserLoggOut}>LogOut</button>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
