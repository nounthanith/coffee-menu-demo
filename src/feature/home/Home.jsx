import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProduct from "./useProduct";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { MdLocalCafe } from 'react-icons/md';

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

  // Debounce for smooth searching
  useEffect(() => {
    if (typing) clearTimeout(typing);

    const t = setTimeout(() => {
      getProducts({ search: q, page, limit });
    }, 400);

    setTyping(t);
  }, [q, page, limit, getProducts]);

  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Title / Hero */}
        <div className="relative overflow-hidden rounded-2xl bg-white">
          <div className="absolute inset-0 bg-amber-100/50" />
          <div className="relative flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8">
            <div className="shrink-0 h-14 w-14 rounded-xl bg-amber-600 text-white grid place-content-center shadow">
              <MdLocalCafe size={28} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Discover your next coffee</h1>
              <p className="text-gray-600 mt-1">{q ? `Showing results for “${q}”` : 'Browse our latest drinks and desserts'}</p>
            </div>
            <div className="sm:ml-auto flex items-center gap-3">
              <div className="text-sm text-gray-600 hidden sm:block">Total: <span className="font-medium">{total ?? 0}</span></div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Per page</label>
                <select
                  className="border px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border-red-200 bg-red-50 p-4 text-red-700">Failed to load products</div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="h-44 bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-5 w-2/3 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-1/3 bg-gray-100 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20 rounded-2xl bg-white">
            <p className="text-lg font-semibold text-gray-800">No products found</p>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Product List */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-2xl hover:border-amber-200 transition overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={`http://localhost:3000/${p.image}`}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.category?.name && (
                    <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 text-xs rounded-full bg-white/90 border shadow-sm">
                      {p.category.name}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h2 className="text-base font-semibold text-gray-900 line-clamp-1">{p.name}</h2>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-amber-700 font-bold text-lg">
                      {p.price.toLocaleString()} ៛
                    </p>
                    <p className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-white hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineChevronLeft />
            Prev
          </button>

          <span className="text-sm font-medium text-gray-700">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={page >= totalPages}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border bg-white hover:bg-amber-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
