async function fetchSessionAdmin() {
  const res = await fetch(`/api/checksession/admin`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`fetchSessionAdmin is not ok`);
  }

  return res.json();
}

export default fetchSessionAdmin;
