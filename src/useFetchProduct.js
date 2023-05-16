import { useQuery } from "@tanstack/react-query";
import fetchProduct from "./fetchProduct";

export default function useFetchProduct(filterSelection) {
  const resultsProducts = useQuery(
    ["getProducts", filterSelection],
    fetchProduct
  );
  const products = resultsProducts?.data?.products ?? [];

  return [products, resultsProducts.status, resultsProducts.refetch];
}
