const addToOrderDetails = function (orderId, prodId, refetch) {
  //create row in order details table using order id and product id
  fetch(
    "http://planted.duckdns.org:8080/orderdetails/add/order/" +
      orderId +
      "/product/" +
      prodId,
    {
      method: "POST",
      credentials: "include",
    }
  ).then((response) => {
    response.json();
    refetch();
  });
};

export default addToOrderDetails;
