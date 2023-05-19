import addToOrderDetails from "./funcAddToOrderDetails";
import updateOrderDetails from "./funcUpdateOrderDetails";
import addOrder from "./functionAddOrder";

const addToBasket = function (prodId, refetch) {
  fetch("/api/order/checkactiveorders/product/" + prodId, {
    method: "POST",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("addToBasket response.outcome: ", response.outcome);
      //If Active row in orders table for customer
      if (response.outcome.length > 0) {
        //If row for product already exists in order_details, add one to qty
        if (response.outcome[0].product_id !== null) {
          updateOrderDetails(
            response.outcome[0].order_id,
            prodId,
            response.outcome[0].product_qty,
            1,
            refetch
          );
        } else {
          //If no row for product in order_details, create row with a qty of 1
          addToOrderDetails(response.outcome[0].order_id, prodId, refetch);
        }
      } else {
        //Else create row in order table
        addOrder(prodId, refetch, addToOrderDetails);
      }
    });
};

export default addToBasket;
