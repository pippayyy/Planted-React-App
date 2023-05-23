import { useState } from "react";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from "reactstrap";
import fetchFavs from "./fetchFavs";
import CardProductBag from "./CardProductBag";
import fetchBasket from "./fetchBasket";
import Modal from "./Modal";
import delFav from "./funcDelFav";

const Favs = () => {
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

  //Manage modal state
  const [showModal, setShowModal] = useState(false);

  //Sub function to handle other functionality needed when adding to basket - including showing modal, deleting from fav and a refetch (basket updated done by funcAddToBasket)
  function addFavToBag(prodId, refetch) {
    setShowModal(true);
    delFav(prodId, refetch);
    refetch();
  }

  //Get items in customer favourites
  const favsResults = useQuery(["getFavs"], fetchFavs);
  //Get fav data
  const favs = favsResults?.data?.outcome ?? [];
  //Get fav fetch status
  const favStatus = favsResults?.status ?? "loading";
  //Get fav refetch to reload fav data
  const favsRefetch = favsResults?.refetch;

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row>
            <Col xs="12" className="mt-4 mb-0">
              <h6 className="text-underline-green">My Favourites</h6>
            </Col>
          </Row>
          <Row className="mb-3">
            <div>
              {!favs.length && favStatus == "loading" ? (
                <div className="loading-pane">
                  <h6 className="">Loading favourties...</h6>
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
              ) : !favs.length && favStatus == "success" ? (
                <Row className="">
                  <Col
                    xs="12"
                    className="justify-content-center align-items-center mt-3 text-center"
                  >
                    <h6 className="">Oops... your favourites is empty!</h6>
                    <p className="">
                      Items remain in your bag for 60 minutes and are then moved
                      to your favourites.
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
                <Row className="g-2 my-2">
                  {favs.map((favItem) => (
                    <Col xs="6" md="4" key={favItem.product_id}>
                      <CardProductBag
                        name={favItem.name}
                        img={favItem.img}
                        price={favItem.price}
                        discount={favItem.discount_percent}
                        id={favItem.product_id}
                        category_id={favItem.category_id}
                        stock={
                          favItem.virtual_stock_reserved !== null
                            ? favItem.stock - favItem.virtual_stock_reserved
                            : favItem.stock
                        }
                        qty_in_bag={favItem.product_qty}
                        order_id={favItem.order_id}
                        refetch={refetch}
                        virtual_status={favItem.virtual_status}
                        col_img={12}
                        col_mainsection={12}
                        textClass={"text-center"}
                        imgSize={"medium"}
                        funcPassed={addFavToBag}
                        in_fav={true}
                        refetchFav={favsRefetch}
                      />
                    </Col>
                  ))}
                </Row>
              )}

              {showModal ? (
                <Modal>
                  <ModalHeader className="mb-3">My Bag</ModalHeader>
                  <ModalBody>
                    <Alert fade={false}>
                      <strong>It’s in your bag</strong> - we will hold it for an
                      hour!
                    </Alert>
                    <Row className="my-3">
                      <Col xs="12" className="d-flex justify-content-start">
                        <h6 className="text-underline-green">Summary</h6>
                      </Col>
                      <Col xs="12" className="d-flex justify-content-start">
                        <p> {basket.length} items</p>
                      </Col>
                      <Col xs="9" className="d-flex justify-content-start">
                        <h6>Sub Total</h6>
                      </Col>
                      <Col xs="3" className="d-flex justify-content-start">
                        £
                        {basket.length > 0
                          ? basket
                              .map(
                                (x) =>
                                  x.product_qty *
                                  (x.price *
                                    (1 - x.discount_percent * 0.01).toFixed(2))
                              )
                              .reduce((a, b) => a + b)
                              .toFixed(2)
                          : null}
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Link to={`/checkout`} className="category-button me-0">
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
            </div>
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default Favs;
