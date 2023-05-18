const delFav = function (prodId, refetch = null) {
  //create row in order details table using order id and product id
  fetch("/api/favourites/del/prod/" + prodId, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    response.json();
    refetch !== null ? refetch() : null;
  });
};

export default delFav;
