import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import useFetchProduct from "./useFetchProduct";
// import CallToActionButton from "./CallToActionButton";
import CardIconText from "./CardIconText";
import Modal from "./Modal";
import fetchBasket from "./fetchBasket";
import addToBasket from "./funcAddToBasket";
import addFav from "./funcAddFav";
import delFav from "./funcDelFav";
import fetchFavs from "./fetchFavs";
import fetchSession from "./fetchSession";

const Detail = () => {
  //Manage modal state
  const [showModal, setShowModal] = useState(false);
  //Get id of product selected on prev page
  const location = useLocation();
  const { prodId } = location.state;
  const productSelected = prodId.id;

  //Check if session exists
  const sessionResults = useQuery(["getSessionDetail"], fetchSession, 0, {
    retry: false,
  });
  //Get status of session
  const sessionExist = sessionResults?.data?.outcome?.message ?? [];
  const sessionFetchStatus = sessionResults?.status ?? "loading";
  const sessionRefetch = sessionResults?.refetch;

  //Refetch session on page load to ensure correct session status is set
  useEffect(() => {
    sessionRefetch();
  }, [sessionRefetch]);

  //Get products json based on product selected on prev page
  const [products, status] = useFetchProduct(productSelected);

  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  //Params used to get basket
  // eslint-disable-next-line no-unused-vars
  const [requestParams, setRequestParams] = useState({
    orderStatus: "Basket",
  });

  //Query to fetch basket data
  const { data, refetch } = useQuery(["getBasket", requestParams], fetchBasket);

  const basketAll = data?.outcome ?? [];

  //Get only Active items in basket
  const basket = basketAll.filter((d) => d.virtual_status == "Active");

  //Get items in customer favourites
  const favsResults = useQuery(["getFavs"], fetchFavs);
  //Get fav data
  const favs = favsResults?.data?.outcome ?? [];
  //Get fav refetch to reload fav data
  const favsRefetch = favsResults?.refetch;
  //Get fav fetch status
  const favStatus = favsResults?.status ?? "loading";

  const in_fav =
    favStatus == "success" && status == "success"
      ? !favs
        ? false
        : favs.filter((d) => d.product_id == products[0]["product_id"]).length >
          0
        ? true
        : false
      : null;

  // const [hover, setHover] = useState(in_fav ? true : false);

  const onHover = () => {
    sessionFetchStatus == "success"
      ? sessionExist == "success" && in_fav
        ? null
        : sessionExist == "success"
        ? addFav(products[0]["product_id"], favsRefetch)
        : navigate("/oops", {
            state: { message: "It seems like you are not signed in!" },
          })
      : null;
  };

  const onLeave = () => {
    sessionFetchStatus == "success"
      ? sessionExist == "success"
        ? delFav(products[0]["product_id"], favsRefetch)
        : navigate("/oops", {
            state: {
              message: "It seems like you are not signed in!",
              redirectFlag: true,
            },
          })
      : null;
  };

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row className="mt-3 mb-0">
            <Col xs="8">
              <Breadcrumb className="mb-1">
                <BreadcrumbItem>
                  <Button
                    className="btn btn-link p-0 pb-2 align-baseline"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                </BreadcrumbItem>
                <BreadcrumbItem active className="align-baseline">
                  Item
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>

          <Row className="mb-3">
            {!products.length && status == "success" ? (
              <div className="loading-pane">
                <h6 className="">No items found.</h6>
              </div>
            ) : !products.length && status == "loading" ? (
              <div className="loading-pane">
                Loading
                <h3 className="loader ms-2">꩜</h3>
              </div>
            ) : (
              products.map((product) => (
                <Col xs="12" key={product.product_id}>
                  <Card className="rounded-5" id={product.product_id}>
                    <CardBody className="">
                      <Container className="px-0">
                        <Row className="ps-2 mt-2">
                          <Col
                            xs="10"
                            md="11"
                            className="d-flex justify-content-start"
                          >
                            <h5 className="mb-0 fw-bold">{product.name}</h5>
                          </Col>
                          <Col xs="2" md="1" className="">
                            {in_fav ? (
                              <HeartFill
                                className="fs-5 heart-icon-fill"
                                onMouseEnter={onLeave}
                                onMouseLeave={onHover}
                              />
                            ) : (
                              <Heart
                                className="fs-5 heart-icon"
                                onMouseEnter={onHover}
                                onMouseLeave={onLeave}
                              />
                            )}
                          </Col>
                        </Row>
                        <Row className="ps-2">
                          <Col xs="9" className="d-flex justify-content-start">
                            <CardTitle
                              tag={
                                product.discount_percent == 0 ? "small" : "del"
                              }
                              className="text-center"
                            >
                              £{product.price}{" "}
                            </CardTitle>
                            <span className="sale-text fw-bold">
                              {product.discount_percent == 0
                                ? ""
                                : " £" +
                                  (
                                    product.price *
                                    (1 - product.discount_percent * 0.01)
                                  ).toFixed(2)}
                            </span>
                          </Col>
                          <Col xs="3" className=""></Col>
                        </Row>
                        <Row className="my-2">
                          <Col xs="12" md="6" className="px-0 text-center">
                            <div
                              className={
                                (product.virtual_stock_reserved !== null
                                  ? product.stock -
                                    product.virtual_stock_reserved
                                  : product.stock) < 1
                                  ? "card-blur"
                                  : ""
                              }
                            >
                              <img
                                className={
                                  product.category_id > 1
                                    ? "rounded-circle img-product-circle img-product-large-circle"
                                    : "img-product img-product-large"
                                }
                                alt={product.name}
                                src={product.img}
                              />
                            </div>
                            {(product.virtual_stock_reserved !== null
                              ? product.stock - product.virtual_stock_reserved
                              : product.stock) < 1 ? (
                              <div className="card-img-overlay d-flex justify-content-center align-items-center">
                                {/* <h6 className="mb-3">Out of stock</h6> */}
                              </div>
                            ) : null}
                          </Col>
                          <Col xs="12" md="6">
                            {product.product_details_json != null ? (
                              <Row className="mb-2 mx-1">
                                {product.product_details_json
                                  .slice(0, 3)
                                  .map((detailItem) => (
                                    <Col
                                      xs="4"
                                      className="px-0 m-0"
                                      key={detailItem.PropertyName}
                                    >
                                      <CardIconText
                                        title={detailItem.PropertyName}
                                        descrip={detailItem.Value}
                                        iconName={detailItem.IconName}
                                        iconClass="fs-1 mx-2 green-text"
                                        cardClass="m-0 px-0 border-0 bg-transparent"
                                        colOne="4"
                                        colTwo="8"
                                      />
                                    </Col>
                                  ))}
                              </Row>
                            ) : null}
                            <Col
                              xs="12"
                              md="12"
                              className="d-flex justify-content-start mb-2"
                            >
                              <div className="rounded-pill category-pill text-white py-1 px-2">
                                {product.category_name}
                              </div>
                            </Col>
                            <Col
                              xs="12"
                              md="12"
                              className="d-flex justify-content-start ps-2"
                            >
                              <p className="fw-bold mb-1">Description</p>
                            </Col>
                            <Col
                              xs="12"
                              md="12"
                              className="d-flex justify-content-start ps-2"
                            >
                              <p className="">{product.description}</p>
                            </Col>
                            <Col xs="12" md="12">
                              <Button
                                block
                                className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                                onClick={() => {
                                  sessionExist == "success"
                                    ? (setShowModal(true),
                                      addToBasket(product.product_id, refetch))
                                    : navigate("/oops", {
                                        state: {
                                          message:
                                            "It seems like you are not signed in!",
                                        },
                                      });
                                }}
                                disabled={
                                  (product.virtual_stock_reserved !== null
                                    ? product.stock -
                                      product.virtual_stock_reserved
                                    : product.stock) < 1
                                    ? true
                                    : false
                                }
                              >
                                <h5 className="m-0">Add To Bag</h5>
                              </Button>
                              {(product.virtual_stock_reserved !== null
                                ? product.stock - product.virtual_stock_reserved
                                : product.stock) < 1 ? (
                                <h6 className="mt-2">
                                  Sorry, this item is out of stock!
                                </h6>
                              ) : null}

                              {showModal ? (
                                <Modal>
                                  <ModalHeader className="mb-3">
                                    My Bag
                                  </ModalHeader>
                                  <ModalBody>
                                    <Alert fade={false}>
                                      <strong>It’s in your bag</strong> - we
                                      will hold it for an hour!
                                    </Alert>
                                    <Row className="my-3">
                                      <Col
                                        xs="12"
                                        className="d-flex justify-content-start"
                                      >
                                        <h6 className="text-underline-green">
                                          Summary
                                        </h6>
                                      </Col>
                                      <Col
                                        xs="12"
                                        className="d-flex justify-content-start"
                                      >
                                        <p> {basket.length} items</p>
                                      </Col>
                                      <Col
                                        xs="9"
                                        className="d-flex justify-content-start"
                                      >
                                        <h6>Sub Total</h6>
                                      </Col>
                                      <Col
                                        xs="3"
                                        className="d-flex justify-content-start"
                                      >
                                        £
                                        {basket.length > 0
                                          ? basket
                                              .map(
                                                (x) =>
                                                  x.product_qty *
                                                  (x.price *
                                                    (
                                                      1 -
                                                      x.discount_percent * 0.01
                                                    ).toFixed(2))
                                              )
                                              .reduce((a, b) => a + b)
                                              .toFixed(2)
                                          : null}
                                      </Col>
                                    </Row>
                                  </ModalBody>
                                  <ModalFooter>
                                    <Link
                                      to={`/checkout`}
                                      className="category-button me-0"
                                    >
                                      <Button
                                        block
                                        className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3 my-2"
                                      >
                                        Checkout
                                      </Button>
                                    </Link>
                                    <Button
                                      block
                                      className="button-colour-subtle border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3 my-2"
                                      onClick={() => setShowModal(false)}
                                    >
                                      Continue Shopping
                                    </Button>
                                  </ModalFooter>
                                </Modal>
                              ) : null}
                            </Col>
                          </Col>
                        </Row>
                      </Container>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default Detail;
