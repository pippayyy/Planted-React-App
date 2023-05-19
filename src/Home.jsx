import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import ResultsCategories from "./ResultsCategories";
import ResultsProduct from "./ResultsProducts";
import CardIconText from "./CardIconText";
import fetchCategoryActive from "./fetchCategoryActive";
import CallToActionButton from "./CallToActionButton";
import useFetchProduct from "./useFetchProduct";
import fetchFavs from "./fetchFavs";
import fetchSession from "./fetchSession";

const Home = () => {
  //Check if session exists
  const sessionResults = useQuery(["getSessionDetail"], fetchSession, 0, {
    retry: false,
  });
  //Get status of session
  const sessionExist = sessionResults?.data?.outcome?.message ?? [];
  const sessionRefetch = sessionResults?.refetch;

  //Refetch session on page load to ensure correct session status is set
  useEffect(() => {
    sessionRefetch();
    favsRefetch();
  });

  //Used to get category data and populate category sections
  const resultsCategories = useQuery(["getCategories"], fetchCategoryActive);
  const categories = resultsCategories?.data?.categories ?? [];

  //Used to get product data and populate product items
  const [activeSection, setActiveSection] = useState("buttNewArrivals");
  //const [products] = useFetchProduct(activeSection);
  const [products, status] = useFetchProduct(activeSection);

  const [activeNewArrivals, setActiveNewArrivals] =
    useState("active px-0 pb-0"); // assumes link 1 is default active
  const [activeBestSellers, setActiveBestSellers] = useState("px-0 pb-0");
  const [activeSale, setActivesale] = useState("px-0 pb-0");

  const startChangeVis = (id) => {
    //Update nav item classes to set selected one to Active class
    setActiveNewArrivals("px-0 pb-0");
    setActiveBestSellers("px-0 pb-0");
    setActivesale("px-0 pb-0");
    switch (id) {
      case "buttNewArrivals":
        setActiveNewArrivals("active px-0 pb-0");
        break;
      case "buttBestSellers":
        setActiveBestSellers("active px-0 pb-0");
        break;
      case "buttSale":
        setActivesale("active px-0 pb-0");
        break;
    }
    //Set active section to change what products are displayed
    setActiveSection(id);
  };

  //Get items in customer favourites
  const favsResults = useQuery(["getFavs"], fetchFavs);
  //Get fav data
  const favs = favsResults?.data?.outcome ?? [];
  //Get refetch funciton to reload favs
  const favsRefetch = favsResults?.refetch;
  //Get status of fav fetch
  const favsStatus = favsResults?.status;

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <Row>
            <Col xs="0" md="3" className=""></Col>
            <Col xs="6" md="3" className="px-0">
              <CardIconText
                title="FREE SHIPPING"
                descrip="Orders over £20"
                iconName="rocketIcon"
                iconClass="svg-rotate fs-1"
                cardClass="my-2 border-0 bg-transparent"
                colOne="2"
                colTwo="10"
              />
            </Col>
            <Col className="px-0 d-flex col-auto">
              <div className="vr my-3"></div>
            </Col>
            <Col md="3" className="px-0 col-auto">
              <CardIconText
                title="FREE RETURNS"
                descrip="Within 30 days"
                iconName="arrowReturnsIcon"
                iconClass="fs-1"
                cardClass="my-2 border-0 bg-transparent"
                colOne="2"
                colTwo="10"
              />
            </Col>
            <Col xs="0" md="3" className=""></Col>
          </Row>
          <ResultsCategories categories={categories} />
          <CallToActionButton
            className="mt-4"
            text="Shop seasonal sale"
            iconName="tag"
            link="/products/category"
            id="sale"
          />

          <Nav pills className="mt-4">
            <NavItem className="me-4">
              <NavLink
                id="buttNewArrivals"
                href="#"
                onClick={() => {
                  startChangeVis("buttNewArrivals");
                }}
                className={activeNewArrivals}
              >
                New Arrivals
              </NavLink>
            </NavItem>
            <NavItem className="me-4">
              <NavLink
                id="buttBestSellers"
                href="#"
                onClick={() => {
                  startChangeVis("buttBestSellers");
                }}
                className={activeBestSellers}
              >
                Best Sellers
              </NavLink>
            </NavItem>
            <NavItem className="me-4">
              <NavLink
                id="buttSale"
                href="#"
                onClick={() => {
                  startChangeVis("buttSale");
                }}
                className={activeSale}
              >
                Sale
              </NavLink>
            </NavItem>
          </Nav>

          <ResultsProduct
            products={products}
            favs={favs}
            favStatus={favsStatus}
            refetch={favsRefetch}
            prodstatus={status}
            sessionExist={sessionExist}
          />
          <Row>
            <Col xs="0" md="3" className=""></Col>
            <Col xs="12" md="6" className="px-0">
              <CardIconText
                title="GET 10% OFF USING CODE ‘NEW’"
                descrip="Valid only for new customers"
                iconName="tagIcon"
                iconClass="fs-1"
                cardClass="my-2 border-0 bg-transparent"
                colOne="2"
                colTwo="10"
              />
            </Col>
            <Col xs="0" md="3" className=""></Col>
          </Row>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default Home;
