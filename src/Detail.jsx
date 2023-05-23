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

  const onHover = () => {
    sessionFetchStatus == "success"
      ? sessionExist == "success" && in_fav
        ? delFav(products[0]["product_id"], favsRefetch)
        : sessionExist == "success"
        ? addFav(products[0]["product_id"], favsRefetch)
        : navigate("/oops", {
            state: { message: "It seems like you are not signed in!" },
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
                <h3 className="loader ms-2">
                  {" "}
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25.000000pt"
                    height="25.000000pt"
                    viewBox="0 0 1210.000000 1280.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                      fill="#000000"
                      stroke="none"
                    >
                      <path
                        d="M7220 12785 c-120 -27 -254 -108 -337 -205 -82 -94 -143 -262 -143
-389 1 -168 61 -314 179 -432 90 -90 124 -109 318 -185 677 -264 1225 -599
1758 -1076 966 -864 1633 -2097 1819 -3363 50 -334 70 -828 47 -1135 -129
-1733 -1058 -3219 -2561 -4095 -565 -329 -1232 -556 -1885 -639 -416 -53 -918
-46 -1325 20 -1277 205 -2393 925 -3105 2004 -134 203 -211 338 -310 545 -212
440 -344 877 -409 1350 -59 431 -44 938 39 1361 286 1444 1314 2606 2725 3077
219 73 469 129 760 169 150 21 711 17 870 -5 819 -117 1494 -444 2045 -992
581 -578 934 -1301 1026 -2105 28 -241 11 -650 -37 -895 -98 -502 -304 -951
-610 -1335 -95 -119 -339 -361 -464 -460 -778 -618 -1761 -806 -2631 -504
-777 270 -1372 918 -1574 1713 -49 195 -59 281 -59 521 0 242 10 332 61 525
149 575 552 1051 1090 1289 649 288 1380 148 1799 -342 308 -360 405 -798 263
-1186 -81 -223 -264 -414 -485 -506 -99 -41 -217 -62 -301 -54 -35 4 -63 10
-62 13 0 3 37 24 82 45 110 53 200 144 256 258 57 116 73 183 78 334 5 123 3
137 -25 236 -112 393 -511 621 -972 554 -258 -38 -446 -131 -611 -302 -222
-231 -329 -502 -330 -831 0 -211 46 -407 142 -612 227 -481 668 -809 1214
-901 114 -19 154 -22 325 -17 138 4 223 11 291 26 416 85 761 272 1064 576
403 402 625 945 625 1531 0 391 -85 742 -267 1103 -353 701 -1013 1214 -1783
1385 -240 53 -315 61 -615 60 -299 0 -380 -8 -613 -59 -941 -208 -1762 -876
-2164 -1760 -487 -1071 -366 -2313 326 -3340 446 -661 1089 -1156 1846 -1419
409 -143 786 -205 1238 -206 480 0 888 69 1331 227 893 317 1646 920 2165
1733 99 156 276 503 343 675 163 416 256 818 294 1263 17 205 6 682 -20 877
-62 460 -181 893 -355 1285 -337 759 -847 1401 -1507 1901 -1131 855 -2630
1155 -4044 809 -994 -244 -1885 -764 -2594 -1514 -370 -391 -651 -796 -891
-1281 -475 -961 -646 -2037 -495 -3125 122 -882 481 -1777 1013 -2525 948
-1333 2381 -2196 3992 -2404 296 -39 411 -45 765 -45 528 0 892 42 1390 160
1558 370 2936 1332 3832 2674 533 799 883 1748 1002 2715 37 298 46 446 46
800 0 444 -27 755 -101 1160 -409 2242 -1915 4155 -3998 5074 -133 59 -393
161 -475 187 -69 22 -224 27 -301 9z"
                      />
                    </g>
                  </svg>
                </h3>
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
                                onClick={onHover}
                              />
                            ) : (
                              <Heart
                                className="fs-5 heart-icon"
                                onClick={onHover}
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
                          <Col xs="12" lg="6" className="px-0 text-center">
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
                          <Col xs="12" lg="6">
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
                                        iconClass="fs-3 mx-2 green-text"
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
                                          redirectUrl: "/",
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
