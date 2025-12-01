import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProduct from "./useProduct";

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

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">Product Dashboard</h1>

      {/* Limit */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow">
        <div className="text-sm text-gray-600">Search: <span className="font-medium">{q || 'All'}</span></div>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-600">Per page</label>
          <select
            className="border px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && <p className="text-indigo-600 font-medium animate-pulse">Loading…</p>}

      {/* Error */}
      {error && <p className="text-red-600 font-semibold">Failed to load products</p>}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={`http://localhost:3000/${p.image}`}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="mt-4 space-y-1">
              <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>

              <p className="text-gray-600 text-sm">
                Category: {p.category?.name}
              </p>

              <p className="text-indigo-600 font-bold text-lg">
                {p.price.toLocaleString()} ៛
              </p>
            </div>

            {/* Created date */}
            <p className="text-xs text-gray-500 mt-2">
              Added on: {new Date(p.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {page} / {total ? Math.ceil(total / limit) : 1}
        </span>

        <button
          onClick={nextPage}
          disabled={page >= Math.ceil(total / limit)}
          className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
