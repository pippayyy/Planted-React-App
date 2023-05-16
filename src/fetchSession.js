async function fetchSession() {
  const res = await fetch(`http://planted.duckdns.org:8080/checksession`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`checksession fetch is not ok`);
  }

  return res.json();
}

export default fetchSession;
