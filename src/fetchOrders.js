async function fetchOrders() {
  const res = await fetch(`https://plantedserver.onrender.com/getorders`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`getorders fetch is not ok`);
  }

  return res.json();
}

export default fetchOrders;
