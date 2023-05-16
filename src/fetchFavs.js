async function fetchFavs() {
  const res = await fetch(`http://planted.duckdns.org:8080/favourties`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`favs fetch is not ok`);
  }

  return res.json();
}

export default fetchFavs;
