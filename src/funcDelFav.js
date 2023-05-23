const delFav = function (prodId, refetch = null) {
  //del row in favourties table using product id and cust id
  fetch("/api/favourites/del/prod/" + prodId, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    response.json();
    refetch !== null ? refetch() : null;
  });
};

export default delFav;
