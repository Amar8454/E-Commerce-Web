import React from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet } from "react-router";

const Admin = () => {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className=" min-h-full w-full max-w-60 sidebarShadow ">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl flex justify-center ">
            {user?.profilePic ? (
              <img src={user?.profilePic} className="rounded-full w-20 h-20 mt-4" />
            ) : (
              <div className="flex items-center pt-4">
                <FaRegUserCircle />
              </div>
            )}
          </div>
          <div className="">
            <p className=" capitalize text-xl font-semibold">{user?.name} </p>
            <p className="text-sm">{user?.role}</p>
          </div>
        </div>

        <div>
          <nav className="grid p-4">
            <Link to={"allUsers"} className="px-2 py-2 hover:bg-slate-100">
              AllUsers
            </Link>
            <Link to={"product"} className="px-2 py-2 hover:bg-slate-100">
              Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
