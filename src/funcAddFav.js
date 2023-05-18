const addFav = function (prodId, refetch = null) {
  //create row in favourites table
  fetch("/api/favourites/add/prod/" + prodId, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    response.json();
    refetch !== null ? refetch() : null;
  });
};

export default addFav;
