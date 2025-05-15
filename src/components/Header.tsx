import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseLargeFill } from "react-icons/ri";
import { assets } from "../assets/assets.ts";
import BaseButton from "./ui/BaseButton.tsx";
import { BsHandbag, BsHandbagFill } from "react-icons/bs";
import CartSidebar from "./CartSidebar.tsx";
import { useCart } from "../context/cart/CartContext.tsx";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  useEffect(() => {
    if (mobileMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenu]);

  return (
    <header className="bg-[#574964] text-white p-2 sticky top-0 left-0 right-0 z-50">
      <nav className="h-[60px] flex items-center justify-between bg-secondary max-w-6xl mx-auto">
        <div>
          <img
            onClick={() => navigate("/")}
            className="mx-2 w-24 cursor-pointer"
            src="/online-shopping.png"
            alt="Online-Shop logo"
          />
        </div>
        <ul className="hidden md:flex items-center text-2xl font-gelasio gap-6 mx-4 sm:mx-[10%]">
          <NavLink to="/" className="group relative">
            {({ isActive }) => (
              <li className="cursor-pointer">
                Home
                <hr
                  className={`absolute left-0 bottom-0 h-0.5 bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </li>
            )}
          </NavLink>
          <NavLink to="/contact">
            {({ isActive }) => (
              <li className="relative cursor-pointer group">
                Contact
                <hr
                  className={`absolute left-0 bottom-0 w-0 h-0.5 bg-black transition-all duration-300 ${
                    isActive ? "w-full" : "group-hover:w-full"
                  } `}
                />
              </li>
            )}
          </NavLink>
        </ul>

        <div className="flex ml-4 md:mx-[10%] text-2xl relative">
          <BaseButton
            variant="ghost"
            onClick={openCart}
            className="relative p-2 rounded-full"
            aria-label="Open cart window"
          >
            {totalItems > 0 ? (
              <>
                <BsHandbagFill size={30} />
                <span className="absolute bottom-1 right-1 bg-red-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              </>
            ) : (
              <BsHandbag size={30} />
            )}
          </BaseButton>
        </div>

        <BiMenuAltRight
          size={40}
          className="mr-4 md:hidden"
          onClick={toggleMobileMenu}
        />

        {mobileMenu && (
          <div className="md:hidden text-black fixed w-full top-0 bottom-0 z-40 overflow-hidden bg-white transition-all flex flex-col">
            <div className="flex justify-end p-4">
              <RiCloseLargeFill size={40} onClick={toggleMobileMenu} />
            </div>
            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-2xl font-medium flex-grow">
              <NavLink onClick={() => setMobileMenu(false)} to="/">
                <p className="px-4 py-2 rounded inline-block">HOME</p>
              </NavLink>
              <NavLink onClick={() => setMobileMenu(false)} to="/contact">
                <p className="px-4 py-2 rounded inline-block">CONTACT</p>
              </NavLink>
            </ul>
          </div>
        )}
      </nav>
      {isCartOpen && <CartSidebar isOpen={isCartOpen} onClose={closeCart} />}
    </header>
  );
};

export default Header;
