import { useCallback, useState } from "react";
import api from "../../lib/api";

export default function useProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);

  const getProducts = useCallback(async ({ search: q = "", page: p = 1, limit: l = 12 } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/products", {
        params: { search: q, page: p, limit: l },
      });

      const data = response?.data?.data ?? response?.data ?? [];
      setProducts(Array.isArray(data) ? data : []);

      setPage(p);
      setLimit(l);
      setSearch(q);

      const totalFromBody = response?.data?.total;
      const totalFromHeader = Number(response?.headers?.["x-total-count"]);
      setTotal(typeof totalFromBody === "number" ? totalFromBody : Number.isFinite(totalFromHeader) ? totalFromHeader : null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    const next = page + 1;
    return getProducts({ search, page: next, limit });
  }, [getProducts, page, search, limit]);

  const prevPage = useCallback(() => {
    const prev = Math.max(1, page - 1);
    return getProducts({ search, page: prev, limit });
  }, [getProducts, page, search, limit]);

  return {
    products,
    loading,
    error,
    page,
    limit,
    total,
    search,
    setSearch,
    setLimit,
    getProducts,
    nextPage,
    prevPage,
  };
}