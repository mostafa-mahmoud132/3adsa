import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import apiData from "../../../ComApi/Api.json";
import Pagination from "../../Pagination/Pagination";
import CompPrivacy from "../../CompPrivacy/CompPrivacy";

function PostCard({ post, viewMode }) {
  if (viewMode === "list") {
    return (
      <Link
        to={`/blog/${post.slug}`}
        className="group relative flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#262626] bg-[#111111] hover:border-orange-500/30 transition-all duration-500"
      >
        <div className="relative w-full md:w-72 h-64 md:h-auto shrink-0 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
            {post.category}
          </span>
        </div>

        <div className="p-8 flex flex-col justify-center w-full">
          <div className="mb-4 text-neutral-500 text-xs font-medium flex items-center gap-2">
            <i className="fa-regular fa-clock"></i>
            <span>{post.readTime}</span>
            <span className="w-1 h-1 bg-neutral-700 rounded-full" />
            <span>{post.date}</span>
          </div>

          <h3 className="font-bold text-white text-2xl mb-4 group-hover:text-orange-500 transition-colors leading-relaxed">
            {post.title}
          </h3>

          <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto border-t border-[#262626] pt-6">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#262626]"
              />
              <div>
                <span className="text-white text-sm font-bold">
                  {post.author.name}
                </span>
                <span className="text-neutral-500 text-xs block">
                  {post.author.role}
                </span>
              </div>
            </div>

            <span className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300">
              <i className="fa-solid fa-arrow-left -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative block rounded-3xl overflow-hidden border border-[#262626] bg-[#0a0a0a] hover:border-orange-500/30 transition-all duration-500 h-full flex flex-col"
    >
      <div className="relative w-full h-64 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4 text-neutral-500 text-xs font-medium flex items-center justify-end gap-2">
          <span>{post.readTime}</span>
          <i className="fa-regular fa-clock"></i>
          <span className="w-1 h-1 bg-neutral-700 rounded-full mx-1" />
          <span>{post.date}</span>
        </div>

        <h3 className="font-bold text-white text-xl mb-3 group-hover:text-orange-500 transition-colors leading-snug">
          {post.title}
        </h3>

        <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export default function SecSearch() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("جميع المقالات");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  useEffect(() => {
    let posts = apiData.posts;

    if (currentCategory !== "جميع المقالات") {
      posts = posts.filter((post) => post.category === currentCategory);
    }

    if (searchTerm.trim() !== "") {
      posts = posts.filter(
        (post) =>
          post.title.includes(searchTerm) ||
          post.excerpt.includes(searchTerm)
      );
    }

    setFilteredPosts(posts);
    setCurrentPage(1);
  }, [currentCategory, searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setCurrentCategory(category);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  }, [location.search]);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    navigate(`/blog?category=${encodeURIComponent(category)}`);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const numberOfpages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  return (
    <div className="bg-black border-b border-[#262626] relative">
      <div className="sticky top-[95px] z-[1000] bg-black backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 pl-4 pr-4 py-3 bg-[#111111] border border-[#262626] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
            />

            <div className="flex flex-wrap gap-2">
              {[
                "جميع المقالات",
                "إضاءة",
                "بورتريه",
                "مناظر طبيعية",
                "تقنيات",
                "معدات",
              ].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-xl text-sm transition ${
                    currentCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-[#161616] text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 flex-row-reverse">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid"
                  ? "bg-orange-500 text-white"
                  : "bg-[#161616] text-neutral-400"
              }`}
            >
              <i className="fa-solid fa-table-cells"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list"
                  ? "bg-orange-500 text-white"
                  : "bg-[#161616] text-neutral-400"
              }`}
            >
              <i className="fa-solid fa-list"></i>
            </button>
          </div>

          <p className="text-neutral-400 text-sm">
            عرض <span className="text-white font-bold">{filteredPosts.length}</span> مقالات
          </p>
        </div>

        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {currentPosts.map((post) => (
            <PostCard key={post.id} post={post} viewMode={viewMode} />
          ))}
        </div>
      </div>

      <Pagination
        numberOfpages={numberOfpages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    
    </div>
  );
}





