const fetchOrder = async ({ queryKey }) => {
  const selection = queryKey[1];

  const apiRes = await fetch(
    `https://plantedserver.onrender.com/order/getbasket/${selection}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!apiRes.ok) {
    throw new Error(`orders fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchOrder;
