async function fetchSession() {
  const res = await fetch(`https://plantedserver.onrender.com/checksession`, {
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
