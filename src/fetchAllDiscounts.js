const fetchAllDiscounts = async () => {
  const apiRes = await fetch(`/api/discounts`, {
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
