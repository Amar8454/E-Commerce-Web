import React from "react";
import logo from "../assest/logo.jpg";

const Logo = ({ width, height }) => {
  return (
    <div>
      <img src={logo} alt="" width={width} height={height} />
    </div>
  );
};

export default Logo;
