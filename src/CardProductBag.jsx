import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardBody,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import {
  Heart,
  DashCircle,
  PlusCircle,
  HeartFill,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import updateOrderDetails from "./funcUpdateOrderDetails";
import addToBasket from "./funcAddToBasket";
import addFav from "./funcAddFav";
import delFav from "./funcDelFav";

const CardProductBag = ({
  id,
  name,
  price,
  img,
  discount,
  category_id,
  stock,
  qty_in_bag,
  order_id,
  refetch,
  virtual_status,
  col_img,
  col_mainsection,
  textClass,
  imgSize,
  funcPassed,
  in_fav,
  refetchFav,
}) => {
  const imgClass =
    imgSize == "small" ? "img-product-small" : "img-product-medium";

  const imgClassCircle =
    imgSize == "small"
      ? "rounded-circle img-product-small-circle"
      : "rounded-circle img-product-medium-circle";

  const onHover = () => {
    in_fav ? delFav(id, refetchFav) : addFav(id, refetchFav);
  };

  return (
    <Card className="rounded-5 text-center" id={id}>
      <CardBody className="">
        <Container className="px-0">
          <Row>
            <Col xs="12" className="d-flex justify-content-end">
              {in_fav ? (
                <HeartFill className="fs-5 heart-icon-fill" onClick={onHover} />
              ) : (
                <Heart className="fs-5 heart-icon" onClick={onHover} />
              )}
            </Col>
          </Row>
          <Row>
            <Link
              to={`/products/detail`}
              state={{ prodId: { id } }}
              className={
                textClass == "text-center"
                  ? "category-button"
                  : "w-25 me-3 category-button"
              }
            >
              <Col xs={col_img} className="m-0">
                <img
                  className={category_id > 1 ? imgClassCircle : imgClass}
                  alt={name}
                  src={img}
                />
              </Col>
            </Link>
            <Col xs={col_mainsection} className="p-0">
              <Col xs="12" className={textClass}>
                <CardTitle tag="small" className={textClass}>
                  <strong>{name}</strong>
                </CardTitle>
              </Col>
              <Col xs="12" className={textClass}>
                <CardTitle
                  tag={discount == 0 ? "small" : "del"}
                  className={textClass}
                >
                  £{price}
                </CardTitle>
                <span className="sale-text fw-bold">
                  {discount == 0
                    ? ""
                    : " £" + (price * (1 - discount * 0.01)).toFixed(2)}
                </span>
              </Col>

              {virtual_status == "Active" ? (
                <Col xs="12" className="text-start mt-2">
                  <DashCircle
                    className="fs-4"
                    onClick={() =>
                      updateOrderDetails(order_id, id, qty_in_bag, -1, refetch)
                    }
                  />
                  <span className="mx-2">{qty_in_bag}</span>
                  <PlusCircle
                    className={stock < 1 ? "fs-4 icon-disabled" : "fs-4"}
                    onClick={() =>
                      updateOrderDetails(order_id, id, qty_in_bag, 1, refetch)
                    }
                  />
                </Col>
              ) : (
                <Col
                  xs="12"
                  className={`text-center mt-2 ${
                    textClass == "text-center" ? "px-2" : ""
                  }`}
                >
                  <Button
                    block
                    className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-2"
                    onClick={() => {
                      in_fav
                        ? funcPassed == undefined
                          ? addToBasket(id, refetch)
                          : (funcPassed(id, refetchFav),
                            addToBasket(id, refetch))
                        : updateOrderDetails(order_id, id, 0, 1, refetch);
                    }}
                    disabled={stock < 1 ? true : false}
                  >
                    <h6 className="m-0">Add To Bag</h6>
                  </Button>
                </Col>
              )}
            </Col>
          </Row>
        </Container>
      </CardBody>
    </Card>
  );
};

export default CardProductBag;
