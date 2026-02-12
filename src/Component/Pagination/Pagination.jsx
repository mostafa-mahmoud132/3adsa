import React from "react";

export default function Pagination({
  numberOfpages,
  currentPage,
  setCurrentPage,
}) {
  if (numberOfpages <= 1) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numberOfpages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center mb-[60px] gap-2">
      <ul className="flex gap-3 justify-center items-center">
        <li
          onClick={prevPage}
          className={`border-2 flex justify-center items-center rounded-[10px]
            w-[45px] h-[40px] transition
            ${
              currentPage === 1
                ? "border-[#262626] text-neutral-600 cursor-not-allowed"
                : "border-[#262626] text-white cursor-pointer hover:border-orange-500 hover:text-orange-500"
            }`}
        >
          <i className="fa-solid fa-chevron-right text-sm"></i>
        </li>

        {Array.from({ length: numberOfpages }, (_, i) => (
          <li
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`border-2 flex justify-center items-center rounded-[10px]
              w-[45px] h-[40px] transition
              ${
                currentPage === i + 1
                  ? "bg-orange-500 border-orange-500 text-white"
                  : "border-[#262626] text-neutral-400 cursor-pointer hover:border-orange-500 hover:text-white"
              }`}
          >
            {i + 1}
          </li>
        ))}

        <li
          onClick={nextPage}
          className={`border-2 flex justify-center items-center rounded-[10px]
            w-[45px] h-[40px] transition
            ${
              currentPage === numberOfpages
                ? "border-[#262626] text-neutral-600 cursor-not-allowed"
                : "border-[#262626] text-white cursor-pointer hover:border-orange-500 hover:text-orange-500"
            }`}
        >
          <i className="fa-solid fa-chevron-left text-sm"></i>
        </li>
      </ul>

      <p className="text-[#a1a1a1] text-sm">
        صفحة {currentPage} من {numberOfpages}
      </p>
    </div>
  );
}
