import { useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import { Row, Col } from "reactstrap";

const ResultsProduct = ({
  products,
  favs,
  favStatus,
  refetch,
  prodstatus,
  sessionExist,
  sortProducts,
}) => {
  console.log("products from card", products);
  console.log("prodstatus", prodstatus);
  console.log("favStatus", favStatus);

  const [productsSorted, setProductsSorted] = useState(products);

  console.log("sortProducts", sortProducts);
  console.log("productsSorted", productsSorted);

  useEffect(() => {
    switch (sortProducts) {
      case "dateDesc":
        //Sort by created date
        setProductsSorted(
          products.sort(
            (a, b) => parseFloat(b.product_id) - parseFloat(a.product_id)
          )
        );
        break;
      case "priceAsc":
        //Sort by price ascending
        setProductsSorted(
          products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
        );
        break;
      case "priceDesc":
        //Sort by price descending
        setProductsSorted(
          products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
        );
        break;
      default:
        //Default - no sort
        setProductsSorted(products);
    }
    console.log("productsSorted in effect ", productsSorted);
  }, [sortProducts, products]);

  return (
    <Row className="g-2 my-2">
      {!products.length && prodstatus == "success" && favStatus == "success" ? (
        <div className="loading-pane">
          <h6 className="">No items found.</h6>
        </div>
      ) : (!products.length && prodstatus == "loading") ||
        favStatus == "loading" ? (
        <div className="loading-pane">
          Loading
          <h3 className="loader ms-2">꩜</h3>
        </div>
      ) : (
        productsSorted.map((product) => (
          <Col xs="6" md="4" key={product.product_id}>
            <CardProduct
              name={product.name}
              img={product.img}
              price={product.price}
              discount={product.discount_percent}
              id={product.product_id}
              category_id={product.category_id}
              stock={
                product.virtual_stock_reserved !== null
                  ? product.stock - product.virtual_stock_reserved
                  : product.stock
              }
              in_fav={
                !favs
                  ? false
                  : favs.filter((d) => d.product_id == product.product_id)
                      .length > 0
                  ? true
                  : false
              }
              refetch={refetch}
              sessionExist={sessionExist}
            />
          </Col>
        ))
      )}
    </Row>
  );
};

export default ResultsProduct;
