const addOrder = function (prodId, refetch, addToOrderDetails) {
  //create row in orders table using customer id
  fetch(process.env.SERVER_URL + "/order/create", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((response) => {
      const orderId = response.outcome.insertId;
      addToOrderDetails(orderId, prodId, refetch);
    });
};

export default addOrder;
