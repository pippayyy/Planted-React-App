const fetchCategory = async () => {
  const apiRes = await fetch(`http://planted.duckdns.org:8080/categories`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!apiRes.ok) {
    throw new Error(`categories fetch is not ok`);
  }

  return apiRes.json();
};

export default fetchCategory;
