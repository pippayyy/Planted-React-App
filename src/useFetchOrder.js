import { useQuery } from "@tanstack/react-query";
import fetchOrder from "./fetchOrder";

export default function useFetchOrder(filterSelection) {
  const resultsOrder = useQuery(["createOrder", filterSelection], fetchOrder);
  const custOrder = resultsOrder?.data?.outcome ?? ["waiting"];

  return [custOrder, resultsOrder.status];
}
