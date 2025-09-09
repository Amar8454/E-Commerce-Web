import React from "react";
import { IoClose } from "react-icons/io5";

const ShowFullImage = ({ ImageUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center z-10 bg-slate-200 bg-opacity-30">
      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
        <button
          className="block ml-auto text-xl  hover:text-red-500 "
          onClick={onClose}
        >
          <IoClose />
        </button>
        <div className="flex justify-center p-4 mx-w-[80vh] max-h[75vh] ">
          <img src={ImageUrl} className="w-full max-h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default ShowFullImage;
