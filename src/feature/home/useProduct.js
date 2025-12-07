import { useCallback, useState } from "react";
import api from "../../lib/api";

export default function useProduct() {
  const [pages, setPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(null);

  const getProducts = useCallback(async ({ search: q = "", page: p = 1, limit: l = 12 } = {}) => {
  setLoading(true);
  setError(null);
  try {
    const response = await api.get("/products", { params: { search: q, page: p, limit: l } });

    const data = response?.data?.data ?? response?.data ?? [];
    setProducts(Array.isArray(data) ? data : []);
    setSearch(q);

    const pagination = response?.data?.pagination;
    if (pagination && typeof pagination === 'object') {
      const pg = Number(pagination.page);
      const lm = Number(pagination.limit);
      const tt = Number(pagination.total);
      const pgs = Number(pagination.pages);
      setPage(Number.isFinite(pg) ? pg : p);
      setLimit(Number.isFinite(lm) ? lm : l);
      setTotal(Number.isFinite(tt) ? tt : null);
      setPages(Number.isFinite(pgs) ? pgs : 1);
    } else {
      // fallback (older format)
      setPage(p);
      setLimit(l);
      const totalFromBody = response?.data?.total;
      const totalFromHeader = Number(response?.headers?.["x-total-count"]);
      const finalTotal = typeof totalFromBody === "number" ? totalFromBody : Number.isFinite(totalFromHeader) ? totalFromHeader : null;
      setTotal(finalTotal);
      setPages(finalTotal ? Math.max(1, Math.ceil(finalTotal / l)) : 1);
    }
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
}, []);

  const getProductById = useCallback(async (id) => {
    if (!id) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/products/${id}`);
      const data = res?.data?.data ?? res?.data ?? null;
      setProduct(data);
      return data;
    } catch (err) {
      setError(err);
      return null;
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
  product,
  loading,
  error,
  page,
  limit,
  total,
  pages,
  search,
  setSearch,
  setLimit,
  getProducts,
  getProductById,
  nextPage,
  prevPage,
};
}