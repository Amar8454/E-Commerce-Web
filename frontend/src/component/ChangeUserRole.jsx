import React, { useState } from "react";
import ROLE from "../commonFile/Role";
import { toast } from "react-toastify";
import { SummaryAPI } from "../commonFile/Summary";
import { IoClose } from "react-icons/io5";

const ChangeUserRole = ({ name, email, role, onClose, userId, callFun }) => {
  const [userRole, setuserRole] = useState(role);

  const handleOnChangeRole = (e) => {
    setuserRole(e.target.value);
  };

  const changeUserRoleAndUpadte = async (req, res) => {
    const response = await fetch(SummaryAPI.changeUserRoleFunction.url, {
      method: SummaryAPI.changeUserRoleFunction.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId, role: userRole }),
    });

    const dataAPI = await response.json();

    if (dataAPI.success) {
      toast.success(dataAPI.message);
      onClose();
      callFun();
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }
  };

  return (
    <div className="top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-30 fixed">
      <div className="mx-auto w-96 shadow-md max-w-sm p-6 bg-white rounded-md">
        <button className="block ml-auto text-xl " onClick={onClose}>
          <IoClose />
        </button>

        <h2 className="pb-4 text-lg font-medium">Change User Role</h2>
        <p>Name: {name}</p>
        <p>Email : {email}</p>

        <div className="flex items-center justify-between my-2">
          <p>Role: </p>
          <select
            className="border px-4 py-1"
            onChange={handleOnChangeRole}
            value={userRole}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={changeUserRoleAndUpadte}
          className="w-fit mx-auto mt-1 block  py-1 px-3 rounded-md bg-green-700 text-white hover:bg-green-900"
        >
          Change role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
