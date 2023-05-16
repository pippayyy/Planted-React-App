import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardTitle, CardBody, Container, Row, Col } from "reactstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import delFav from "./funcDelFav";
import addFav from "./funcAddFav";

const CardProduct = ({
  id,
  name,
  price,
  img,
  discount,
  category_id,
  stock,
  in_fav,
  refetch,
  sessionExist,
}) => {
  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  const [hover, setHover] = useState(in_fav ? true : false);
  const onHover = () => {
    sessionExist == "success" && in_fav
      ? setHover(true)
      : sessionExist == "success"
      ? (addFav(id, refetch), setHover(true))
      : navigate("/oops");
  };

  const onLeave = () => {
    sessionExist == "success"
      ? (setHover(false), delFav(id, refetch))
      : navigate("/oops");
  };

  return (
    <Card className="rounded-5 text-center" id={id}>
      <CardBody className="">
        <Container className="px-0">
          <Row>
            <Col xs="9" className=""></Col>
            <Col xs="2" className="p-0">
              {hover ? (
                <HeartFill
                  className="fs-4 heart-icon-fill"
                  onMouseEnter={onLeave}
                  onMouseLeave={onHover}
                />
              ) : (
                <Heart
                  className="fs-4 heart-icon"
                  onMouseEnter={onHover}
                  onMouseLeave={onLeave}
                />
              )}
            </Col>
            <Col xs="1" className=""></Col>
          </Row>
          <Link
            to={`/products/detail`}
            state={{ prodId: { id } }}
            className="category-button"
          >
            <Row>
              <Col xs="1" className="px-0"></Col>
              <Col xs="10" className="px-0">
                <div className={stock < 1 ? "card-blur out-of-stock-div" : ""}>
                  <img
                    className={
                      category_id > 1
                        ? "rounded-circle img-product-circle"
                        : "img-product"
                    }
                    alt={name}
                    src={img}
                  />
                  <div className="overlay-text justify-content-center align-items-center">
                    <h6 className="mb-3 text-black">
                      {stock < 1 ? "Out of stock" : ""}
                    </h6>
                  </div>
                </div>
              </Col>
              <Col xs="1" className="px-0"></Col>
            </Row>
            <Row>
              <Col xs="12" className="px-0">
                <CardTitle tag="small" className="fw-bold text-center">
                  {name}
                </CardTitle>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="">
                <CardTitle
                  tag={discount == 0 ? "small" : "del"}
                  className="text-center"
                >
                  £{price}{" "}
                </CardTitle>
                <span className="sale-text fw-bold">
                  {discount == 0
                    ? ""
                    : " £" + (price * (1 - discount * 0.01)).toFixed(2)}
                </span>
              </Col>
            </Row>
          </Link>
        </Container>
      </CardBody>
    </Card>
  );
};

export default CardProduct;
