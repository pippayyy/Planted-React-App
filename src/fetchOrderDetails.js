async function fetchOrderDetails({ queryKey }) {
  const { orderId } = queryKey[1];

  const res = await fetch(
    `http://planted.duckdns.org:8080/getorders/orderid/${orderId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`fetchOrderDetails fetch is not ok`);
  }

  return res.json();
}

export default fetchOrderDetails;
