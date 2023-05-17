async function fetchDiscount({ queryKey }) {
  const discountcode = queryKey[1];

  var discountcodeParam = discountcode == "" ? "none" : discountcode;

  const res = await fetch(
    `https://plantedserver.onrender.com/checkdiscount/code/${discountcodeParam}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`discount fetch is not ok`);
  }

  return res.json();
}

export default fetchDiscount;
