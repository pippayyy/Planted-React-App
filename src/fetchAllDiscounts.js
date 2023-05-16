const fetchAllDiscounts = async () => {
  const apiRes = await fetch(`http://planted.duckdns.org:8080/discounts`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiRes.ok) {
    throw new Error(`discounts all fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchAllDiscounts;
