import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const navClass = (path) =>
    `px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
      location.pathname !== "/privacy" && location.pathname === path
        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        : "text-neutral-400 hover:text-white"
    }`;

  const mobileNavClass = (path) =>
    `px-4 py-2 rounded transition-colors ${
      location.pathname !== "/privacy" && location.pathname === path
        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
        : "text-neutral-400 hover:text-white hover:bg-[#262626]"
    }`;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black py-2 border-b border-[#262626] text-white px-4 md:px-10">
      <div className="flex w-[85%] mx-auto justify-between items-center h-20">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setMenuOpen(false);
            handleScrollToTop();
          }}
        >
          <div className="relative w-12 h-12 rounded-xl overflow-hidden group-hover:scale-105 transition-all duration-300">
            <img
              alt="Photography Logo"
              className="w-full h-full object-cover"
              src="/image/imgi_1_logo-GdqARQRt.png"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold gradient-text">عدسة</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center">
          <div className="flex items-center bg-[#161616] rounded-full p-1.5 border border-[#262626]">
            <Link to="/" className={navClass("/")} onClick={handleScrollToTop}>
              الرئيسية
            </Link>
            <Link
              to="/blog"
              className={navClass("/blog")}
              onClick={handleScrollToTop}
            >
              المدونة
            </Link>
            <Link
              to="/about"
              className={navClass("/about")}
              onClick={handleScrollToTop}
            >
              من نحن
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/blog"
            className="btn-primary text-white"
            onClick={handleScrollToTop}
          >
            ابدأ القراءة
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden icon-btn"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col mt-2 bg-[#161616] rounded-lg p-2 space-y-2 md:hidden">
          <Link
            to="/"
            className={mobileNavClass("/")}
            onClick={() => {
              setMenuOpen(false);
              handleScrollToTop();
            }}
          >
            الرئيسية
          </Link>
          <Link
            to="/blog"
            className={mobileNavClass("/blog")}
            onClick={() => {
              setMenuOpen(false);
              handleScrollToTop();
            }}
          >
            المدونة
          </Link>
          <Link
            to="/about"
            className={mobileNavClass("/about")}
            onClick={() => {
              setMenuOpen(false);
              handleScrollToTop();
            }}
          >
            من نحن
          </Link>
        </div>
      )}
    </div>
  );
}
