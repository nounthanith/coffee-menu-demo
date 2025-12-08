import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useProduct from "./useProduct";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FaBookOpen } from 'react-icons/fa'; // Changed icon to represent 'learning/menu'

function Home() {
  const {
    products,
    loading,
    error,
    page,
    limit,
    total,
    setLimit,
    getProducts,
    nextPage,
    prevPage,
  } = useProduct();

  const [typing, setTyping] = useState(null);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  // Debounce for smooth searching (Kept functional logic)
  useEffect(() => {
    if (typing) clearTimeout(typing);

    const t = setTimeout(() => {
      getProducts({ search: q, page, limit });
    }, 400);

    setTyping(t);
  }, [q, page, limit, getProducts]);

  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    // Simple, neutral background
    <div className="min-h-[calc(100vh-56px)]">
      <div className="max-w-7xl mx-auto px-4 space-y-10">

        {/* Title / Hero - **Squared/Bordered Style** */}
        <div className="relative overflow-hidden bg-white border-2 border-gray-700"> {/* Strong border and no rounding */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6 p-6">

            {/* Left side: Icon and Text */}
            <div className="flex items-center gap-4">
              {/* Icon container is square and uses the primary color (Emerald) */}
              <div className="shrink-0 h-12 w-12 bg-emerald-600 text-white grid place-content-center border-2 border-gray-700">
                <FaBookOpen size={24} />
              </div>
              <div className="text-center sm:text-left">
                {/* Bolder, clean title */}
                <h1 className="text-3xl font-mono font-bold text-gray-900">Product Catalog Explorer</h1>
                <p className="text-base text-gray-600 mt-1">{q ? `Search results for “${q}”` : 'A structured view of all available items.'}</p>
              </div>
            </div>

            {/* Right side: Total and Limit Selector */}
            <div className="flex items-center gap-4 shrink-0 mt-4 sm:mt-0">
              <div className="text-sm text-gray-700 font-medium">Total: <span className="font-extrabold text-emerald-600">{total ?? 0}</span></div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Per page</label>
                <select
                  // Selector is square with a prominent border
                  className="border-2 border-gray-700 px-3 py-2 bg-white text-gray-900 focus:ring-0 focus:border-emerald-600"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          // Error box is now square with a strong red border
          <div className="border-2 border-red-700 bg-red-100 p-4 text-red-800 font-medium">
            <span className="font-bold">ERROR:</span> Failed to retrieve data.
          </div>
        )}

        {/* Loading skeletons (Adjusted styling) */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // Skeletons are square with gray borders
              <div key={i} className="bg-white border border-gray-300 overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-200 animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-700">
            <p className="text-xl font-bold text-gray-800">No Items Found</p>
            <p className="text-gray-600 mt-2">Try adjusting your search query.</p>
          </div>
        )}

        {/* Product List - **Squared/Bordered Card** */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => (
              <div
                key={p._id}
                // The main card style: sharp corners, prominent border, hover effect using border color
                className="group bg-white overflow-hidden border rounded-sm hover:shadow-[-5px_5px] hover:-translate-y-3 transition-all ease-out duration-500 border-gray-700"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden border-b-2 border-gray-700 group-hover:border-emerald-600">
                  <img
                    src={import.meta.env.VITE_BASE_URL + "/" + `${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out"
                  />
                  {p.category?.name && (
                    // Category tag is square and uses the accent color
                    <span className="absolute top-0 right-0 inline-flex items-center px-3 py-1 text-xs font-semibold bg-emerald-600 text-white border-l-2 border-b-2 border-gray-700">
                      {p.category.name}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-1 space-y-2">
                  <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{p.name}</h2>

                  <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                    {/* Price styled with accent color */}
                    <p className="text-sm font-extrabold text-emerald-600">
                      {p.price.toLocaleString()}៛
                    </p>
                    {/* Simple button style */}
                    <Link
                      to={`/products/${p._id}`}
                      className="text-sm font-semibold px-3 py-1 border rounded-sm border-gray-700 bg-white text-gray-700 hover:bg-emerald-100 hover:border-emerald-600 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination - **Squared/Bordered Style** */}
        {products.length > 0 && (
          <div className="flex items-center justify-center gap-6 pt-6">
            <button
              onClick={prevPage}
              disabled={page === 1}
              // Pagination buttons are square, bordered, and use the accent color on hover
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg border-gray-700 bg-white text-gray-700 font-semibold transition duration-150 hover:bg-emerald-50 hover:border-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineChevronLeft size={18} />
              Previous
            </button>

            <span className="text-base font-bold text-gray-800 border rounded-lg border-gray-700 px-4 py-2 bg-white">
              Page <span className="text-emerald-600">{page}</span> / {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={page >= totalPages}
              // Pagination buttons are square, bordered, and use the accent color on hover
              className="inline-flex items-center gap-2 px-4 py-2 border rounded-lg border-gray-700 bg-white text-gray-700 font-semibold transition duration-150 hover:bg-emerald-50 hover:border-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <HiOutlineChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;