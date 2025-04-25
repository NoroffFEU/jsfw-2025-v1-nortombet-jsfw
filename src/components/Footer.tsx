import React from "react";
import { assets } from "../assets/assets.ts";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-secondary/40">
      <div className="md:mx-10 mx-4 sm:mx-[10%]">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-base text-text">
          {/* Left section */}
          <div>
            <img
              className="mb-5 w-40"
              src={assets.logo_online_shop}
              alt="RainyDays Logo"
            />
            <p className="w-full md:w2/3 leading-6">
              Welcome to our store! We're an online shop dedicated to bring you
              quality products.
            </p>
          </div>
          {/* Center section */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex text-lg flex-col gap-2">
              <li>
                <NavLink to="/" className="hover:text-primary transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-primary transition">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-primary transition"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          {/* Right section */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2">
              <li>+47 999 99 999</li>
              <li>noor.tom@senbet.no</li>
            </ul>
          </div>
        </div>
        {/* Copyright Text */}
        <div>
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright 2025 @ Online-Shop - All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
