import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Button } from "reactstrap";
import fetchBasket from "./fetchBasket";
import CardProductBag from "./CardProductBag";
import fetchFavs from "./fetchFavs";

const Mybag = () => {
  //Params used to get basket
  // eslint-disable-next-line no-unused-vars
  const [requestParams, setRequestParams] = useState({
    orderStatus: "Basket",
  });

  //Query to fetch basket data
  const { data, refetch, status } = useQuery(
    ["getBasket", requestParams],
    fetchBasket
  );
  const basketAll = data?.outcome ?? [];

  const basket = basketAll.filter((d) => d.virtual_status == "Active");
  const basketInactive = basketAll.filter(
    (d) => d.virtual_status == "Inactive"
  );

  //Get items in customer favourites
  const favsResults = useQuery(["getFavs"], fetchFavs);
  //Get fav data
  const favs = favsResults?.data?.outcome ?? [];
  //Get fav refetch to reload fav data
  const favsRefetch = favsResults?.refetch;
  //Get fav fetch status
  const favStatus = favsResults?.status ?? "loading";

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row>
            <Col xs="12" className="mt-4 mb-0">
              <h6 className="text-underline-green">My Bag</h6>
            </Col>
          </Row>
          {!basket.length ? null : basket[0].product_id == null ? null : (
            <Row className="me-1">
              <Col xs="3" className="mt-4">
                <p className="mb-0">Sub-total</p>
                <p className="">
                  £
                  {basket.length > 0
                    ? basket
                        .map(
                          (x) =>
                            x.product_qty *
                            (x.price * (1 - x.discount_percent * 0.01))
                        )
                        .reduce((a, b) => a + b)
                        .toFixed(2)
                    : null}
                </p>
              </Col>
              <Col
                xs="1"
                className="px-0 d-flex justify-content-center align-items-center"
              >
                <div className="vr my-3"></div>
              </Col>
              <Col
                xs="8"
                className="justify-content-center align-items-center mt-3"
              >
                <Link to={`/checkout`} className="category-button">
                  <Button
                    block
                    className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                  >
                    <h5 className="m-0">Checkout</h5>
                  </Button>
                </Link>
              </Col>
            </Row>
          )}

          {!basket.length && status == "loading" ? (
            <div className="loading-pane">
              <h6 className="">Loading basket...</h6>
            </div>
          ) : (!basket.length && status == "success") ||
            basket[0].product_id == null ? (
            <Row className="">
              <Col
                xs="12"
                className="justify-content-center align-items-center mt-3 text-center"
              >
                <h6 className="">Oops... your basket is empty!</h6>
                <p className="">
                  Items remain in your bag for 60 minutes and are then moved to
                  your favourites.
                </p>
              </Col>
              <Col xs="1"></Col>
              <Col
                xs="10"
                className="justify-content-center align-items-center my-3"
              >
                <Link to={`/`} className="category-button">
                  <Button
                    block
                    className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                  >
                    <h5 className="m-0">Continue Shopping</h5>
                  </Button>
                </Link>
              </Col>
              <Col xs="1"></Col>
            </Row>
          ) : (
            <Row className="mt-1 mb-3">
              {basket.map((basketItem) => (
                <Col
                  xs="12"
                  md="6"
                  className="my-1"
                  key={basketItem.product_id}
                >
                  <CardProductBag
                    name={basketItem.name}
                    img={basketItem.img}
                    price={basketItem.price}
                    discount={basketItem.discount_percent}
                    id={basketItem.product_id}
                    category_id={basketItem.category_id}
                    stock={
                      basketItem.virtual_stock_reserved !== null
                        ? basketItem.stock - basketItem.virtual_stock_reserved
                        : basketItem.stock
                    }
                    qty_in_bag={basketItem.product_qty}
                    order_id={basketItem.order_id}
                    refetch={refetch}
                    virtual_status={basketItem.virtual_status}
                    col_img={4}
                    col_mainsection={6}
                    textClass={"text-start"}
                    imgSize={"small"}
                    in_fav={
                      !favs && favStatus == "loading"
                        ? false
                        : !favs && favStatus == "success"
                        ? false
                        : favs.filter(
                            (d) => d.product_id == basketItem.product_id
                          ).length > 0
                        ? true
                        : false
                    }
                    refetchFav={favsRefetch}
                  />
                </Col>
              ))}
            </Row>
          )}

          {!basketInactive.length ? null : basketInactive[0].product_id ==
            null ? null : (
            <Row className="mt-1 mb-3">
              <Col xs="12" className="my-1 mt-3">
                <h6>Looking for these?</h6>
              </Col>
              {basketInactive.map((basketItem) => (
                <Col
                  xs="12"
                  md="6"
                  className="my-1"
                  key={basketItem.product_id}
                >
                  <CardProductBag
                    name={basketItem.name}
                    img={basketItem.img}
                    price={basketItem.price}
                    discount={basketItem.discount_percent}
                    id={basketItem.product_id}
                    category_id={basketItem.category_id}
                    stock={
                      basketItem.virtual_stock_reserved !== null
                        ? basketItem.stock - basketItem.virtual_stock_reserved
                        : basketItem.stock
                    }
                    qty_in_bag={basketItem.product_qty}
                    order_id={basketItem.order_id}
                    refetch={refetch}
                    virtual_status={basketItem.virtual_status}
                    col_img={4}
                    col_mainsection={6}
                    heartVisible={true}
                    textClass={"text-start"}
                    imgSize={"small"}
                    in_fav={
                      !favs && favStatus == "loading"
                        ? false
                        : !favs && favStatus == "success"
                        ? false
                        : favs.filter(
                            (d) => d.product_id == basketItem.product_id
                          ).length > 0
                        ? true
                        : false
                    }
                    refetchFav={favsRefetch}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default Mybag;
