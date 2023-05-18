const updateStock = function (prodId, qtyToUpdate = -1, refetch) {
  //create row in order details table using order id and product id
  fetch("/api/update/stock/product/" + prodId + "/productqty/" + qtyToUpdate, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    response.json();
    refetch();
  });
};

export default updateStock;
