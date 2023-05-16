import CardProduct from "./CardProduct";
import { Row, Col } from "reactstrap";

const ResultsProduct = ({
  products,
  favs,
  refetch,
  prodstatus,
  sessionExist,
}) => {
  console.log("products from card", products);
  console.log("prodstatus", prodstatus);
  return (
    <Row className="g-2 my-2">
      {!products.length && prodstatus == "success" ? (
        <div className="loading-pane">
          <h6 className="">No items found.</h6>
        </div>
      ) : !products.length && prodstatus == "loading" ? (
        <div className="loading-pane">
          Loading
          <h3 className="loader ms-2">꩜</h3>
        </div>
      ) : (
        products.map((product) => (
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
