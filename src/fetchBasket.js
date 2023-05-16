async function fetchBasket({ queryKey }) {
  const { orderStatus } = queryKey[1];

  const res = await fetch(
    `http://planted.duckdns.org:8080/order/getbasket/orderstatus/${orderStatus}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`basket fetch is not ok`);
  }

  return res.json();
}

export default fetchBasket;
