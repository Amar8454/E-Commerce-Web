import React, { useState } from "react";
import userIcons from "../assest/signin.gif";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { SummaryAPI } from "../commonFile/Summary";
import { toast } from "react-toastify";
import imageTobase64 from "../helperFile/ProfilePic";

const Signup = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [InputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleOnPicProfile = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);

    setInputData((preValue) => {
      return {
        ...preValue,
        profilePic: imagePic,
      };
    });
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (InputData.password === InputData.confirmPassword) {
      const response = await fetch(SummaryAPI.signup.url, {
        method: SummaryAPI.signup.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InputData),
      });

      const dataAPI = await response.json();
      if (dataAPI.success) {
        toast.success(dataAPI.message);
        navigate("/login");
      }
      if (dataAPI.error) {
        toast.error(dataAPI.message);
      }
    } else {
      toast.error("Please check confirm password");
    }

    setInputData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white w-full mx-auto p-2 py-5 max-w-sm rounded-md shadow-xl">
          <div className="h-20 w-20 mx-auto bg-white relative overflow-hidden rounded-full ">
            <div>
              <img src={InputData.profilePic || userIcons} alt="userIcons" />
            </div>
            <form>
              <label>
                <input type="file" hidden onChange={handleOnPicProfile} />
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  upload photo
                </div>
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmitSignUp}>
            <div className="grid px-2 py-2 gap-2">
              <label htmlFor="nameInput" className="font-medium">
                Name:
              </label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={handleOnChangeInput}
                  type="text"
                  name="name"
                  value={InputData.name}
                  placeholder="enter name"
                  className="bg-slate-100 w-full outline-none bg-transparent"
                  id="nameInput"
                  required
                />
              </div>

              <label htmlFor="emailInput" className="font-medium">
                Email:
              </label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={handleOnChangeInput}
                  type="email"
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

              <label htmlFor="passwordInput" className="font-medium">
                Confirm Password:
              </label>
              <div className="bg-slate-100 p-2 flex justify-center items-center">
                <input
                  onChange={handleOnChangeInput}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={InputData.confirmPassword}
                  placeholder="enter confirm password"
                  className="bg-slate-100 w-full outline-none bg-transparent "
                  id="passwordInput"
                  required
                />
                <div
                  className=" cursor-pointer"
                  onClick={() => setshowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
                  </span>
                </div>
              </div>

              <div className="w-fit mx-auto bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md mt-3">
                <button>Sign up</button>
              </div>
              <div className="mt-5">
                <p>
                  Allready have an account?{" "}
                  <Link
                    to={"/login"}
                    className="hover:underline hover:text-red-600"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
