import React from "react";
import { FaUser } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";

const NavBar = () => {
  return (
    <>
      <div className="nav flex items-center justify-between px-[100px] h-[70px] border-b-[1px] border-gray-800">
        <div className="logo">
          <h3 className="text-[25px] font-[700] sp-text">WebGen AI</h3>
        </div>
        <div className="icons flex items-center gap-2">
          <div className="icon">
            <HiSun />
          </div>
          <div className="icon">
            <FaUser />
          </div>
          <div className="icon">
            <RiSettings3Fill />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
