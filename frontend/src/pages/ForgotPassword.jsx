import React, { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const ForgotPassword = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConformPassword, setshowConformPassword] = useState(false);

  const [InputData, setInputData] = useState({
    email: "",
    password: "",
    conformPassword: "",
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmitForgotPass = (e) => {
    e.preventDefault();
    console.log("submit");

    setInputData({
      email: "",
      password: "",
      conformPassword: "",
    });
  };

  return (
    <div>
      <section id="login">
        <div className="mx-auto container p-4">
          <div className="bg-white w-full mx-auto mt-4 p-2 py-5 max-w-sm rounded-md shadow-xl">
            <form onSubmit={handleSubmitForgotPass}>
              <div className="grid px-2 py-2 gap-2">
                <label htmlFor="emailInput" className="font-medium">
                  Email:
                </label>
                <div className="bg-slate-100 p-2">
                  <input
                    onChange={handleOnChangeInput}
                    name="email"
                    value={InputData.email}
                    type="email"
                    placeholder="enter email"
                    className="bg-slate-100 w-full outline-none bg-transparent"
                    id="emailInput"
                    required
                  />
                </div>

                <label htmlFor="passwordInput" className="font-medium">
                  Password:
                </label>
                <div className="bg-slate-100 p-2 flex justify-center items-center">
                  <input
                    onChange={handleOnChangeInput}
                    name="password"
                    value={InputData.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="enter password"
                    className="bg-slate-100 w-full outline-none bg-transparent "
                    id="passwordInput"
                    required
                  />
                  <div
                    className=" cursor-pointer"
                    onClick={() => setshowPassword((prev) => !prev)}
                  >
                    <span>{showPassword ? <FaEyeSlash /> : <FaRegEye />}</span>
                  </div>
                </div>

                <label htmlFor="passwordInput" className="font-medium">
                  Conform Password:
                </label>
                <div className="bg-slate-100 p-2 flex justify-center items-center">
                  <input
                    onChange={handleOnChangeInput}
                    type={showConformPassword ? "text" : "password"}
                    name="conformPassword"
                    value={InputData.conformPassword}
                    placeholder="enter conform password"
                    className="bg-slate-100 w-full outline-none bg-transparent "
                    id="passwordInput"
                    required
                  />
                  <div
                    className=" cursor-pointer"
                    onClick={() => setshowConformPassword((prev) => !prev)}
                  >
                    <span>
                      {showConformPassword ? <FaEyeSlash /> : <FaRegEye />}
                    </span>
                  </div>
                </div>

                <div className="w-fit mx-auto bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md mt-3">
                  <button>Forgot</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
