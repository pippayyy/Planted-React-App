import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import CardIconText from "./CardIconText";
import fetchOrders from "./fetchOrders";

const MyAccount = () => {
  //Get prev orders
  const ordersResults = useQuery(["getOrders"], fetchOrders);
  //Get orders data
  const orders = ordersResults?.data?.outcome?.orders ?? [];
  const status = ordersResults?.status ?? "loading";

  //Get user details
  const userEmail = ordersResults?.data?.outcome?.userEmail ?? [];
  const userFName = ordersResults?.data?.outcome?.userFname ?? [];

  //Used to nav to order confirm page
  const navigate = useNavigate();

  //function to place order
  function logout() {
    fetch("http://planted.duckdns.org:8080/logout", {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("response:", response.outcome);
        //If logout successful
        if (response.outcome.message == "success") {
          navigate("/", {});
        }
      });
  }

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row className="mb-3">
            <Col xs="12">
              <Card className="rounded-5 my-3">
                <CardBody className="">
                  <Container className="px-0">
                    <Row className="mt-2">
                      <Col xs="12" className="text-center my-2">
                        <img
                          className="img-product-medium"
                          alt="Planted Logo Circular"
                          src="../images/PlantedLogoGreen.png"
                        />
                        <h4 className="text-center mt-3">
                          Hi {!userFName ? null : userFName}
                        </h4>
                        <h5 className="text-center">
                          {!userEmail ? null : userEmail}
                        </h5>
                      </Col>
                      <Col
                        xs="12"
                        className="justify-content-center align-items-center my-1"
                      >
                        <Link
                          onClick={logout}
                          className="text-black text-center"
                        >
                          <h5 className="m-0">Logout</h5>
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="mb-2">
              <h6 className="text-underline-green m-0">My Orders</h6>
            </Col>
          </Row>
          <Row className="mb-2">
            {!orders.length && status == "success" ? (
              <div className="loading-pane">
                <h6 className="">No orders found.</h6>
              </div>
            ) : !orders.length && status == "loading" ? (
              <div className="loading-pane">
                Loading
                <h3 className="loader ms-2">꩜</h3>
              </div>
            ) : (
              orders.map((item) => (
                <Col xs="12" md="4" className="my-2" key={item.order_id}>
                  <Card className="rounded-5">
                    <CardBody className="p-0">
                      <Container className="px-0">
                        <Row className="">
                          <Col xs="12" className="">
                            <CardIconText
                              title={"ORDER ID " + item.order_number}
                              descrip={
                                <span>
                                  Status: <strong>{item.order_status}</strong>
                                  <br /> Order date:{" "}
                                  <strong>{item.order_date_formatted}</strong>
                                  <Link
                                    to={`/order/detail`}
                                    state={{ orderId: item.order_id }}
                                    className="category-button"
                                  >
                                    <Button
                                      block
                                      className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3 mt-2"
                                    >
                                      <h5 className="m-0">View Order</h5>
                                    </Button>
                                  </Link>
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
              ))
            )}
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default MyAccount;
