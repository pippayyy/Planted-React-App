const fetchProduct = async ({ queryKey }) => {
  const selection = queryKey[1];

  const apiRes = await fetch(
    process.env.SERVER_URL + `/products/${selection}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!apiRes.ok) {
    throw new Error(`products fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchProduct;
