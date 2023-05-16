async function fetchSessionAdmin() {
  const res = await fetch(
    `http://planted.duckdns.org:8080/checksession/admin`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`fetchSessionAdmin is not ok`);
  }

  return res.json();
}

export default fetchSessionAdmin;
