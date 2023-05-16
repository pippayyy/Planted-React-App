import { useLocation, useNavigate } from "react-router-dom";
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
} from "reactstrap";
import CardIconText from "./CardIconText";
import fetchOrderDetails from "./fetchOrderDetails";

const OrderDetail = () => {
  //Get id of order selected on prev page
  const location = useLocation();
  const { orderId } = location.state;

  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  //Get prev orders
  const ordersResults = useQuery(
    ["getOrderDetails", { orderId: orderId }],
    fetchOrderDetails
  );
  //Get orders data
  const orderItems = ordersResults?.data?.outcome ?? [];
  //Get orders refetch to reload orders data
  //   const ordersRefetch = ordersResults?.refetch;
  //Get orders fetch status
  //   const ordersStatus = ordersResults?.status ?? "loading";

  console.log("orderItems: ", orderItems);

  const paymentTypes = [
    {
      paymentTypeId: 1,
      paymentName: "Visa",
      paymentPic: "../images/cardVisa.png",
    },
    {
      paymentTypeId: 2,
      paymentName: "Apple Pay",
      paymentPic: "../images/cardApple.png",
    },
    {
      paymentTypeId: 3,
      paymentName: "Mastercard",
      paymentPic: "../images/cardMastercard.png",
    },
    {
      paymentTypeId: 4,
      paymentName: "Paypal",
      paymentPic: "../images/cardPaypal.png",
    },
    {
      paymentTypeId: 5,
      paymentName: "Shop Pay",
      paymentPic: "../images/cardShop.png",
    },
  ];

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
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="mt-2">
              <h6 className="text-underline-green m-0">Order Details</h6>
            </Col>
          </Row>
          <Row className="my-1 mt-2 g-3">
            {orderItems.length > 0 ? (
              <Col xs="12" className="my-1">
                <Card className="rounded-5">
                  <CardBody className="p-0">
                    <Container className="px-0">
                      <Row className="">
                        <Col xs="12" className="">
                          <CardIconText
                            title={"ORDER ID " + orderItems[0].order_number}
                            descrip={
                              <span>
                                Status:
                                <strong>{orderItems[0].order_status}</strong>
                                <br /> Order date:
                                <strong>
                                  {orderItems[0].order_date_formatted}
                                </strong>
                              </span>
                            }
                            iconName="checkCircle"
                            iconClass="fs-1"
                            cardClass="my-2 border-0 bg-transparent"
                            colOne="2"
                            colTwo="10"
                          />
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
            ) : null}
            <Col xs="0" md="8" className="m-0"></Col>

            <Col xs="12" md="6" className="my-1">
              <Card className="rounded-5 text-center d-flex h-100">
                <CardBody className="">
                  <Container className="px-0">
                    <Row>
                      <Col xs="12" className="mb-2">
                        <h6 className="text-underline-green">Items</h6>
                      </Col>
                    </Row>
                    <Row className="my-1">
                      {orderItems.map((item) => (
                        <Col
                          xs="3"
                          className="d-flex justify-content-center align-items-end"
                          key={item.product_id}
                        >
                          <img
                            className={
                              item.category_id > 1
                                ? "rounded-circle img-product-small-circle"
                                : "img-product-small"
                            }
                            alt={item.name}
                            src={item.img}
                          />
                        </Col>
                      ))}
                    </Row>
                    <Row className="mt-4 mb-1">
                      <Col xs="3" md="2" className="my-auto">
                        <p className="mb-0"> {orderItems.length} items</p>
                      </Col>
                      <Col
                        xs="1"
                        className="px-0 d-flex justify-content-center align-items-center"
                      >
                        <div className="vr my-1"></div>
                      </Col>
                      <Col xs="8" md="4" className="my-auto text-start">
                        <CardTitle
                          className="mb-0"
                          tag={
                            !orderItems.length
                              ? "span"
                              : orderItems[0]["discount_id"] !== null
                              ? "del"
                              : "span"
                          }
                        >
                          {orderItems.length > 0
                            ? "£" +
                              orderItems
                                .map(
                                  (x) =>
                                    x.product_qty *
                                    (x.price * (1 - x.discount_percent * 0.01))
                                )
                                .reduce((a, b) => a + b)
                                .toFixed(2)
                            : null}
                        </CardTitle>
                        <span className="sale-text fw-bold ps-2">
                          {!orderItems.length
                            ? null
                            : orderItems[0].discount_id !== null
                            ? "£" +
                              (
                                orderItems
                                  .map(
                                    (x) =>
                                      x.product_qty *
                                      (x.price *
                                        (1 - x.discount_percent * 0.01))
                                  )
                                  .reduce((a, b) => a + b) *
                                (1 - orderItems[0].discount_value * 0.01)
                              ).toFixed(2)
                            : null}
                        </span>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="6" className="my-1">
              <Card className="rounded-5 d-flex h-100">
                <CardBody className="">
                  <Container className="px-0">
                    <Row>
                      <Col xs="12" className="mb-2">
                        <h6 className="text-underline-green">
                          Delivery Address
                        </h6>
                      </Col>
                      {orderItems.length > 0 ? (
                        <Col xs="12" className="mb-2">
                          <p className="mb-0">
                            {orderItems[0].address_house} <br />
                            {orderItems[0].street} <br />
                            {orderItems[0].city} <br />
                            {orderItems[0].county} <br />
                            {orderItems[0].postcode} <br />
                          </p>
                        </Col>
                      ) : null}
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="6" className="my-1">
              <Card className="rounded-5 d-flex h-100">
                <CardBody className="">
                  <Container className="px-0">
                    <Row>
                      <Col xs="12" className="mb-2">
                        <h6 className="text-underline-green">
                          Billing Address
                        </h6>
                      </Col>
                      {orderItems.length > 0 ? (
                        <Col xs="12" className="mb-2">
                          <p className="mb-0">
                            {orderItems[0].address_house_billing} <br />
                            {orderItems[0].street_billing} <br />
                            {orderItems[0].city_billing} <br />
                            {orderItems[0].county_billing} <br />
                            {orderItems[0].postcode_billing} <br />
                          </p>
                        </Col>
                      ) : null}
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
            <Col xs="12" md="6" className="my-1">
              <Card className="rounded-5 text-center">
                <CardBody className="">
                  <Container className="px-0">
                    <Row>
                      <Col xs="12" className="mb-2">
                        <h6 className="text-underline-green">
                          Payment Details
                        </h6>
                      </Col>
                      <Col xs="8" className="mb-2 mt-0">
                        <p className="mb-0 text-start">Payment Method</p>
                      </Col>
                      <Col xs="3" className="mb-2 mt-0 text-start">
                        {!orderItems.length ? null : orderItems[0]
                            .payment_type !== null ? (
                          <img
                            className="img-fluid"
                            alt={
                              paymentTypes.filter(
                                (d) =>
                                  d.paymentName == orderItems[0].payment_type
                              )[0].paymentName
                            }
                            src={
                              paymentTypes.filter(
                                (d) =>
                                  d.paymentName == orderItems[0].payment_type
                              )[0].paymentPic
                            }
                          />
                        ) : null}
                      </Col>
                      <Col xs="8" className="my-2 text-start">
                        <p className="mb-0 text-start">Sub-total</p>
                      </Col>
                      <Col xs="4" className="mb-2 text-start">
                        <CardTitle
                          className="mb-0"
                          tag={
                            !orderItems.length
                              ? "p"
                              : orderItems[0]["discount_id"] !== null
                              ? "del"
                              : "p"
                          }
                        >
                          {orderItems.length > 0
                            ? "£" +
                              orderItems
                                .map(
                                  (x) =>
                                    x.product_qty *
                                    (x.price * (1 - x.discount_percent * 0.01))
                                )
                                .reduce((a, b) => a + b)
                                .toFixed(2)
                            : null}
                        </CardTitle>
                        {!orderItems.length ? null : orderItems[0][
                            "discount_id"
                          ] !== null ? (
                          <p className="sale-text fw-bold mb-0">
                            {(
                              orderItems
                                .map(
                                  (x) =>
                                    x.product_qty *
                                    (x.price * (1 - x.discount_percent * 0.01))
                                )
                                .reduce((a, b) => a + b) *
                              (1 - orderItems[0].discount_value * 0.01)
                            ).toFixed(2)}
                          </p>
                        ) : null}
                      </Col>
                      <Col xs="8" className="mb-2 mt-0">
                        <p className="mb-0 text-start">Delivery</p>
                      </Col>
                      <Col xs="4" className="mb-2 mt-0 text-start">
                        <p className="mb-0 text-start">
                          {!orderItems.length
                            ? null
                            : orderItems[0].delivery_price == 0
                            ? "FREE"
                            : "£" + orderItems[0].delivery_price}
                        </p>
                      </Col>
                      <Col xs="8" className="my-3">
                        <h5 className="mb-0 text-start">Total to pay</h5>
                      </Col>
                      <Col
                        xs="4"
                        className="mb-2 mt-0 d-flex align-items-center"
                      >
                        <h5 className="mb-0 text-start">
                          £
                          {!orderItems.length
                            ? null
                            : orderItems[0].total_payment}
                        </h5>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default OrderDetail;
