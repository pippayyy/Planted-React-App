import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  FormFeedback,
  CardTitle,
} from "reactstrap";
import fetchBasket from "./fetchBasket";
import fetchDiscount from "./fetchDiscount";
import fetchDeliveryOptions from "./fetchDeliveryOptions";
import fetchLatestOrder from "./fetchLatestOrder";

const Checkout = () => {
  //Used to nav to order confirm page
  const navigate = useNavigate();

  //Params used to get basket
  // eslint-disable-next-line no-unused-vars
  const [requestParams, setRequestParams] = useState({
    orderStatus: "Basket",
  });

  //Query to fetch basket data
  // eslint-disable-next-line no-unused-vars
  const { data, refetch, status } = useQuery(
    ["getBasket", requestParams],
    fetchBasket
  );

  const basketAll = data?.outcome ?? [];

  //Get only Active items in basket
  const basket = basketAll.filter((d) => d.virtual_status == "Active");

  //Query to get latest order data
  const lastOrderDetails = useQuery(["getLatestOrder"], fetchLatestOrder);
  const lastOrder = lastOrderDetails?.data?.outcome ?? [];

  console.log("lastOrderDetails: ", lastOrderDetails);
  console.log("lastOrder: ", lastOrder);

  //Track promo code entered
  const [promoCode, setPromoCode] = useState(null);

  //Check if valid dicount code
  const dicountCodeDetails = useQuery(
    ["checkdiscount", promoCode],
    fetchDiscount
  );

  const dicountCodeData = dicountCodeDetails?.data?.outcome ?? [];

  //Get discount code fetch status
  const discountStatus = dicountCodeDetails?.status ?? "loading";

  //Populate delivery options section
  const deliveryOptions = useQuery(
    ["getDeliveryOptions", promoCode],
    fetchDeliveryOptions
  );

  const deliveryOptionData = deliveryOptions?.data?.outcome ?? [];

  //Delivery method - used for radio buttons
  const [deliveryMethod, setDeliveryMethod] = useState(1);

  //Payment type - used for radio buttons
  const [paymentId, setPaymentId] = useState(1);

  const [totalPayment, setTotalPayment] = useState(0);

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

  useEffect(() => {
    setTotalPayment(
      !basket.length
        ? null
        : !dicountCodeData.length
        ? (
            parseFloat(
              basket
                .map(
                  (x) =>
                    x.product_qty * (x.price * (1 - x.discount_percent * 0.01))
                )
                .reduce((a, b) => a + b)
            ) +
            (!deliveryOptionData.length
              ? parseFloat(0)
              : parseFloat(
                  deliveryOptionData.filter(
                    (d) => d.delivery_method_id == deliveryMethod
                  )[0].delivery_price
                ))
          ).toFixed(2)
        : dicountCodeData[0].discount_id !== null
        ? (
            parseFloat(
              basket
                .map(
                  (x) =>
                    x.product_qty * (x.price * (1 - x.discount_percent * 0.01))
                )
                .reduce((a, b) => a + b) *
                (1 - dicountCodeData[0].discount_value * 0.01)
            ) +
            (!deliveryOptionData.length
              ? parseFloat(0)
              : parseFloat(
                  deliveryOptionData.filter(
                    (d) => d.delivery_method_id == deliveryMethod
                  )[0].delivery_price
                ))
          ).toFixed(2)
        : (
            parseFloat(
              basket
                .map(
                  (x) =>
                    x.product_qty * (x.price * (1 - x.discount_percent * 0.01))
                )
                .reduce((a, b) => a + b)
            ) +
            (!deliveryOptionData.length
              ? parseFloat(0)
              : parseFloat(
                  deliveryOptionData.filter(
                    (d) => d.delivery_method_id == deliveryMethod
                  )[0].delivery_price
                ))
          ).toFixed(2)
    );
  }, [deliveryOptionData, deliveryMethod, dicountCodeData, basket]);

  //function to place order
  function placeOrder(orderObject) {
    fetch("http://planted.duckdns.org:8080/order/placeorder", {
      method: "POST",
      credentials: "include",
      data: orderObject,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderObject),
    })
      .then((response) => response.json())
      .then((response) => {
        //If order placement successful
        if (response.outcome.orderDetail.affectedRows > 0) {
          navigate("/checkout/success", {
            state: {
              orderId: basket[0].order_id,
              email: response.outcome.userEmail,
            },
          });
        }
      });
  }

  //Track validity of discount code
  const [discountValid, setDiscountValid] = useState(null);
  useEffect(() => {
    setDiscountValid(
      !dicountCodeData.length && discountStatus == "loading"
        ? null
        : !dicountCodeData.length &&
          discountStatus == "success" &&
          promoCode == null
        ? null
        : !dicountCodeData.length && discountStatus == "success"
        ? false
        : dicountCodeData[0].discount_id !== null
        ? true
        : false
    );
  }, [dicountCodeData, discountStatus]);

  //Delivery address - used to auto fill when delivery matches billing address
  const [postcodeDelivery, setPostcodeDelivery] = useState("");
  const [houseDelivery, setHouseDelivery] = useState("");
  const [streetDelivery, setStreetDelivery] = useState("");
  const [cityDelivery, setCityDelivery] = useState("");
  const [countyDelivery, setCountyDelivery] = useState("");
  //Used on check of the 'billing address same as delivery address' checkbox
  const [matchAddresses, setMatchAddresses] = useState(false);
  //Used on check of the 'use last delivery address' checkbox
  const [matchLastDeliveryAdd, setMatchLastDeliveryAdd] = useState(true);

  //on click of 'billing address same as delivery address' checkbox, update state
  const handleChange = () => {
    setMatchAddresses((current) => !current);
  };

  //on click of 'use last delivery address' checkbox, update state
  const useLastDeliveryAdd = () => {
    setMatchLastDeliveryAdd((current) => !current);

    console.log("matchLastDeliveryAdd: ", matchLastDeliveryAdd);

    if (matchLastDeliveryAdd) {
      setPostcodeDelivery(lastOrder[0].postcode);
      setHouseDelivery(lastOrder[0].address_house);
      setStreetDelivery(lastOrder[0].street);
      setCityDelivery(lastOrder[0].city);
      setCountyDelivery(lastOrder[0].county);
    } else {
      setPostcodeDelivery("");
      setHouseDelivery("");
      setStreetDelivery("");
      setCityDelivery("");
      setCountyDelivery("");
    }
  };

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row>
            <Col xs="12" className="mt-4 mb-0">
              <h6 className="text-underline-green">Checkout</h6>
            </Col>
          </Row>
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
            <Row className="mt-1 mb-3 g-2">
              <Col xs="12" md="8" className="my-1">
                <Card className="rounded-5 text-center">
                  <CardBody className="">
                    <Container className="px-0">
                      <Row>
                        <Col xs="12" className="mb-2">
                          <h6 className="text-underline-green">My Bag</h6>
                        </Col>
                      </Row>
                      <Row className="my-1">
                        {basket.map((basketItem) => (
                          <Col
                            xs="3"
                            className="d-flex justify-content-center align-items-end"
                            key={basketItem.product_id}
                          >
                            <img
                              className={
                                basketItem.category_id > 1
                                  ? "rounded-circle img-product-small-circle"
                                  : "img-product-small"
                              }
                              alt={basketItem.name}
                              src={basketItem.img}
                            />
                          </Col>
                        ))}
                      </Row>
                      <Row className="mt-4 mb-1">
                        <Col xs="3" md="2" className="my-auto">
                          <p className="mb-0"> {basket.length} items</p>
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
                              !dicountCodeData.length
                                ? "span"
                                : dicountCodeData[0].discount_id !== null
                                ? "del"
                                : "span"
                            }
                          >
                            {basket.length > 0
                              ? "£" +
                                basket
                                  .map(
                                    (x) =>
                                      x.product_qty *
                                      (x.price *
                                        (1 - x.discount_percent * 0.01))
                                  )
                                  .reduce((a, b) => a + b)
                                  .toFixed(2)
                              : null}
                          </CardTitle>
                          <span className="sale-text fw-bold ps-2">
                            {!dicountCodeData.length
                              ? null
                              : dicountCodeData[0].discount_id !== null
                              ? "£" +
                                (
                                  basket
                                    .map(
                                      (x) =>
                                        x.product_qty *
                                        (x.price *
                                          (1 - x.discount_percent * 0.01))
                                    )
                                    .reduce((a, b) => a + b) *
                                  (1 - dicountCodeData[0].discount_value * 0.01)
                                ).toFixed(2)
                              : null}
                          </span>
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="4" className="my-1">
                <Card className="rounded-5 text-center d-flex h-100">
                  <CardBody className="">
                    <Container className="px-0">
                      <Row>
                        <Col xs="12" className="mb-2">
                          <h6 className="text-underline-green">
                            Discount Code
                          </h6>
                        </Col>
                        <Col xs="12" className="">
                          <Form
                            className="mt-0"
                            onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target);
                              setPromoCode(formData.get("fieldpromocode"));
                            }}
                          >
                            <FormGroup floating>
                              <InputGroup>
                                <Input
                                  id="formPromocode"
                                  name="fieldpromocode"
                                  placeholder="Promo code / voucher"
                                  valid={
                                    discountValid == null
                                      ? false
                                      : discountValid
                                  }
                                  invalid={
                                    discountValid == null
                                      ? false
                                      : !discountValid
                                  }
                                  type="text"
                                />
                                <Button>Apply</Button>
                              </InputGroup>
                              <FormFeedback
                                className="text-start"
                                valid={discountValid}
                              >
                                {discountValid == null ? (
                                  ""
                                ) : !discountValid ? (
                                  "Sorry, that code did not work..."
                                ) : discountValid ? (
                                  <p>
                                    Success! {dicountCodeData[0].discount_value}
                                    % discount applied
                                  </p>
                                ) : (
                                  "Sorry, that code did not work.........."
                                )}
                              </FormFeedback>
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
              <Form
                id="orderForm"
                className="needs-validation m-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const checkoutData = {
                    postcodeDelivery: formData.get("postcode") ?? "",
                    houseDelivery: formData.get("house") ?? "",
                    streetDelivery: formData.get("street") ?? "",
                    cityDelivery: formData.get("city") ?? "",
                    countyDelivery: formData.get("county") ?? "",
                    postcodeBilling: formData.get("postcodeBilling") ?? "",
                    houseBilling: formData.get("houseBilling") ?? "",
                    streetBilling: formData.get("streetBilling") ?? "",
                    cityBilling: formData.get("cityBilling") ?? "",
                    countyBilling: formData.get("countyBilling") ?? "",
                    cardNum: formData.get("cardNum") ?? "",
                    cardExpiry: formData.get("cardExpiry") ?? "",
                    cardSecurityCode: formData.get("cardSecurityCode") ?? "",
                    paymentType: paymentTypes.filter(
                      (d) => d.paymentTypeId == paymentId
                    )[0].paymentName,
                    paymentTotal: totalPayment,
                    deliveryMethodId: deliveryMethod ?? "",
                    discountId: !dicountCodeData.length
                      ? null
                      : dicountCodeData[0].discount_id !== null
                      ? dicountCodeData[0].discount_id
                      : null,
                    orderId: !basket.length
                      ? null
                      : basket[0].order_id !== null
                      ? basket[0].order_id
                      : null,
                    addressesAreSame: matchAddresses,
                  };
                  placeOrder(checkoutData);
                }}
              >
                <Row className="mt-1 g-2">
                  <Col xs="12" md="6" className="m-0">
                    <Card className="rounded-5 text-center d-flex h-100">
                      <CardBody className="">
                        <Container className="px-0">
                          <Row>
                            <Col xs="12" className="mb-2">
                              <h6 className="text-underline-green">
                                Delivery Address
                              </h6>
                            </Col>

                            {!lastOrder ? null : lastOrder.length <
                              1 ? null : lastOrder[0].delivery_address_id !==
                              null ? (
                              <Col xs="12" className="mb-2">
                                <FormGroup check className="text-start">
                                  <Input
                                    id="checkboxPrevAdd"
                                    type="checkbox"
                                    onChange={useLastDeliveryAdd}
                                  />
                                  <Label check>Use last delivery address</Label>
                                  <p>
                                    {"("}
                                    {lastOrder[0].address_house}{" "}
                                    {lastOrder[0].street}, {lastOrder[0].city},{" "}
                                    {lastOrder[0].county},{" "}
                                    {lastOrder[0].postcode}
                                    {")"}
                                  </p>
                                </FormGroup>
                              </Col>
                            ) : null}

                            <Col xs="12" className="">
                              <FormGroup floating>
                                <Input
                                  id="formPostcode"
                                  name="postcode"
                                  placeholder="Postcode"
                                  type="text"
                                  value={postcodeDelivery}
                                  onChange={(e) => {
                                    setPostcodeDelivery(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setPostcodeDelivery(e.target.value);
                                  }}
                                  required
                                />
                                <Label for="formPostcode">Postcode</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formHouse"
                                  name="house"
                                  placeholder="House name / number"
                                  type="text"
                                  value={houseDelivery}
                                  onChange={(e) => {
                                    setHouseDelivery(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setHouseDelivery(e.target.value);
                                  }}
                                  required
                                />
                                <Label for="formHouse">
                                  House name / number
                                </Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formStreet"
                                  name="street"
                                  placeholder="Street"
                                  type="text"
                                  value={streetDelivery}
                                  onChange={(e) => {
                                    setStreetDelivery(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setStreetDelivery(e.target.value);
                                  }}
                                  required
                                />
                                <Label for="formStreet">Street</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCity"
                                  name="city"
                                  placeholder="City / Town"
                                  type="text"
                                  value={cityDelivery}
                                  onChange={(e) => {
                                    setCityDelivery(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setCityDelivery(e.target.value);
                                  }}
                                  required
                                />
                                <Label for="formCity">City / Town</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCounty"
                                  name="county"
                                  placeholder="County"
                                  type="text"
                                  value={countyDelivery}
                                  onChange={(e) => {
                                    setCountyDelivery(e.target.value);
                                  }}
                                  onBlur={(e) => {
                                    setCountyDelivery(e.target.value);
                                  }}
                                  required
                                />
                                <Label for="formCounty">County</Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs="12" md="6" className="mt-1">
                    <Card className="rounded-5 d-flex h-100">
                      <CardBody className="">
                        <Container className="px-0">
                          <Row>
                            <Col xs="12" className="mb-2">
                              <h6 className="text-underline-green">
                                Delivery Options
                              </h6>
                            </Col>
                            <Col xs="12">
                              {!deliveryOptionData.length ? null : (
                                <FormGroup tag="fieldset" className="mb-0">
                                  {deliveryOptionData.map((option) => (
                                    <FormGroup
                                      check
                                      key={option.delivery_method_id}
                                    >
                                      <Label check className="text-start">
                                        <Input
                                          type="radio"
                                          name="radio1"
                                          defaultChecked={
                                            option.delivery_method_id == 1
                                              ? true
                                              : false
                                          }
                                          onClick={() =>
                                            setDeliveryMethod(
                                              option.delivery_method_id
                                            )
                                          }
                                        />{" "}
                                        <strong>
                                          {option.method_name} -{" "}
                                          {option.delivery_price == 0
                                            ? "FREE"
                                            : "£" + option.delivery_price}
                                        </strong>
                                        <p>
                                          Delivered on or before{" "}
                                          {option.estimated_delivery_date}
                                        </p>
                                      </Label>
                                    </FormGroup>
                                  ))}
                                </FormGroup>
                              )}
                            </Col>
                          </Row>
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs="12" md="6" className="my-1">
                    <Card className="rounded-5 text-center d-flex h-100">
                      <CardBody className="">
                        <Container className="px-0">
                          <Row>
                            <Col xs="12" className="mb-2">
                              <h6 className="text-underline-green">
                                Billing Address
                              </h6>
                            </Col>
                            <Col xs="12" className="mb-2">
                              <FormGroup check className="text-start">
                                <Input
                                  id="checkbox2"
                                  type="checkbox"
                                  onChange={handleChange}
                                />
                                <Label check>Same as delivery address</Label>
                              </FormGroup>
                            </Col>
                            <Col xs="12" className="">
                              <FormGroup floating>
                                <Input
                                  id="formPostcodeBilling"
                                  name="postcodeBilling"
                                  placeholder="Postcode"
                                  type="text"
                                  defaultValue={
                                    matchAddresses ? postcodeDelivery : ""
                                  }
                                  disabled={matchAddresses ? true : false}
                                  required
                                />
                                <Label for="formPostcodeBilling">
                                  Postcode
                                </Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formHouseBilling"
                                  name="houseBilling"
                                  placeholder="House name / number"
                                  type="text"
                                  defaultValue={
                                    matchAddresses ? houseDelivery : ""
                                  }
                                  disabled={matchAddresses ? true : false}
                                  required
                                />
                                <Label for="formHouseBilling">
                                  House name / number
                                </Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formStreetBilling"
                                  name="streetBilling"
                                  placeholder="Street"
                                  type="text"
                                  defaultValue={
                                    matchAddresses ? streetDelivery : ""
                                  }
                                  disabled={matchAddresses ? true : false}
                                  required
                                />
                                <Label for="formStreetBilling">Street</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCityBilling"
                                  name="cityBilling"
                                  placeholder="City / Town"
                                  type="text"
                                  defaultValue={
                                    matchAddresses ? cityDelivery : ""
                                  }
                                  disabled={matchAddresses ? true : false}
                                  required
                                />
                                <Label for="formCityBilling">City / Town</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCountyBilling"
                                  name="countyBilling"
                                  placeholder="County"
                                  type="text"
                                  defaultValue={
                                    matchAddresses ? countyDelivery : ""
                                  }
                                  disabled={matchAddresses ? true : false}
                                  required
                                />
                                <Label for="formCountyBilling">County</Label>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xs="12" md="6" className="my-1">
                    <Card className="rounded-5 text-center d-flex h-100">
                      <CardBody className="">
                        <Container className="px-0">
                          <Row>
                            <Col xs="12" className="mb-2">
                              <h6 className="text-underline-green">Payment</h6>
                            </Col>

                            <Col xs="12" className="">
                              <FormGroup tag="fieldset" className="mb-0">
                                <Row className="ms-1">
                                  {paymentTypes.map((option) => (
                                    <Col
                                      xs="2"
                                      className="mb-2 px-0"
                                      key={option.paymentTypeId}
                                    >
                                      <img
                                        className="img-fluid"
                                        alt={option.paymentName}
                                        src={option.paymentPic}
                                      />
                                      <FormGroup
                                        check
                                        className="d-flex justify-content-center align-items-center"
                                      >
                                        <Input
                                          type="radio"
                                          name="radio2"
                                          defaultChecked={
                                            option.paymentTypeId == 1
                                              ? true
                                              : false
                                          }
                                          onClick={() =>
                                            setPaymentId(option.paymentTypeId)
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                  ))}
                                </Row>
                              </FormGroup>
                            </Col>

                            <Col xs="12" className="">
                              <FormGroup floating>
                                <Input
                                  id="formCardNum"
                                  name="cardNum"
                                  placeholder="Card Number"
                                  type="text"
                                  pattern="[0-9]{9,20}"
                                  maxLength={19}
                                  required
                                />
                                <Label for="formCardNum">Card Number</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCardExpiry"
                                  name="cardExpiry"
                                  placeholder="Expiry Date"
                                  type="date"
                                  required
                                />
                                <Label for="formCardExpiry">Expiry Date</Label>
                              </FormGroup>
                              <FormGroup floating>
                                <Input
                                  id="formCardSecurityCode"
                                  name="cardSecurityCode"
                                  placeholder="Security Code / CVC"
                                  type="text"
                                  pattern="[0-9]{3,}"
                                  maxLength={3}
                                  required
                                />
                                <Label for="formCardSecurityCode">
                                  Security Code / CVC
                                </Label>
                              </FormGroup>
                            </Col>

                            <Col xs="8" className="my-2 text-start">
                              <p className="mb-0 text-start">Sub-total</p>
                            </Col>
                            <Col xs="4" className="mb-2 text-start">
                              <CardTitle
                                className="mb-0"
                                tag={
                                  !dicountCodeData.length
                                    ? "p"
                                    : dicountCodeData[0].discount_id !== null
                                    ? "del"
                                    : "p"
                                }
                              >
                                {basket.length > 0
                                  ? "£" +
                                    basket
                                      .map(
                                        (x) =>
                                          x.product_qty *
                                          (x.price *
                                            (1 - x.discount_percent * 0.01))
                                      )
                                      .reduce((a, b) => a + b)
                                      .toFixed(2)
                                  : null}
                              </CardTitle>
                              {!dicountCodeData.length ? null : dicountCodeData[0]
                                  .discount_id !== null ? (
                                <p className="sale-text fw-bold mb-0">
                                  {(
                                    basket
                                      .map(
                                        (x) =>
                                          x.product_qty *
                                          (x.price *
                                            (1 - x.discount_percent * 0.01))
                                      )
                                      .reduce((a, b) => a + b) *
                                    (1 -
                                      dicountCodeData[0].discount_value * 0.01)
                                  ).toFixed(2)}
                                </p>
                              ) : null}
                            </Col>
                            <Col xs="8" className="mb-2 mt-0">
                              <p className="mb-0 text-start">Delivery</p>
                            </Col>
                            <Col xs="4" className="mb-2 mt-0 text-start">
                              <p className="mb-0 text-start">
                                {!deliveryOptionData.length
                                  ? null
                                  : deliveryOptionData.filter(
                                      (d) =>
                                        d.delivery_method_id == deliveryMethod
                                    )[0].delivery_price == 0
                                  ? "FREE"
                                  : "£" +
                                    deliveryOptionData.filter(
                                      (d) =>
                                        d.delivery_method_id == deliveryMethod
                                    )[0].delivery_price}
                              </p>
                            </Col>
                            <Col xs="8" className="my-3">
                              <h5 className="mb-0 text-start">Total to pay</h5>
                            </Col>
                            <Col xs="4" className="mb-2 mt-0">
                              <h5 className="mb-0 text-start">
                                £{totalPayment}
                              </h5>
                            </Col>
                            <Col xs="12" className="mb-2">
                              <Button
                                block
                                className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                              >
                                <h5 className="m-0">Pay</h5>
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Row>
          )}
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default Checkout;
