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
                  <h3 className="loader ms-2">꩜</h3>
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
