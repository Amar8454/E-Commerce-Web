import React, { useContext, useState } from "react";
import userIcons from "../assest/signin.gif";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { SummaryAPI } from "../commonFile/Summary";
import Context from "../context";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserDetials, FetchAddCArtProduct } = useContext(Context);

  const [showPassword, setshowPassword] = useState(false);
  const [InputData, setInputData] = useState({
    email: "",
    password: "",
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryAPI.login.url, {
      method: SummaryAPI.login.method,
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(InputData),
      credentials: "include",
    });

    const dataAPI = await response.json();
    if (dataAPI.success) {
      toast.success(dataAPI.message);
      navigate("/");
      fetchUserDetials();
      FetchAddCArtProduct();
    }

    if (dataAPI.error) {
      toast.error(dataAPI.message);
    }

    setInputData({
      email: "",
      password: "",
    });
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white w-full mx-auto p-2 py-5 max-w-sm rounded-md shadow-xl mt-4">
          <form onSubmit={handleSubmitForm}>
            <div className="grid px-2 py-2 gap-2">
              <label htmlFor="emailInput" className="font-medium">
                Email:
              </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  onChange={handleOnChangeInput}
                  name="email"
                  value={InputData.email}
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
                  type={showPassword ? "text" : "password"}
                  onChange={handleOnChangeInput}
                  name="password"
                  value={InputData.password}
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
              <div className="ml-auto text-sm hover:underline hover:text-red-600 block w-fit">
                <Link to={"/forgotPassword"}>Forgot password?</Link>
              </div>

              <div className="w-fit mx-auto bg-blue-700 text-white px-5 py-2 rounded-md mt-3 hover:bg-slate-800">
                <button>Login</button>
              </div>
              <div className="mt-5">
                <p>
                  Don't have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="hover:underline hover:text-red-600"
                  >
                    Sign up{" "}
                  </Link>{" "}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
