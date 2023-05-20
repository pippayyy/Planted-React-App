import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Col,
  FormGroup,
  Label,
} from "reactstrap";
import { Search } from "react-bootstrap-icons";
import ResultsProduct from "./ResultsProducts";
import useFetchProduct from "./useFetchProduct";
import fetchCategoryActive from "./fetchCategoryActive";
import ResultsList from "./ResultsList";
import SelectedCategoryContext from "./SelectedCategoryContext";
import CardIconText from "./CardIconText";
import fetchFavs from "./fetchFavs";
import fetchSession from "./fetchSession";
// import ReactPaginate from "react-paginate";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useContext(
    SelectedCategoryContext
  );

  const location = useLocation();
  //Get filter Id (which category/section) - if none set e.g. clicked on 'Shop' in navbar, then use default of 1
  const { filterId } = location.state ?? { filterId: { id: 1 } };

  useEffect(() => {
    setSelectedCategory(filterId.id);
  }, [filterId.id]);

  //Used to get category data and populate category sections
  const resultsCategories = useQuery(["getCategories"], fetchCategoryActive);
  const categories = resultsCategories?.data?.categories ?? [];

  const [searchParamSection, setSearchParamSection] = useState("");
  const [searchParam, setSearchParam] = useState("");
  const [sortValue, setSortValue] = useState("");

  //Get products json based on category selected
  const [products, status] = useFetchProduct(
    "category/" + selectedCategory + searchParamSection
  );

  //Refetch session on page load to ensure correct session status is set
  useEffect(() => {
    sessionRefetch();
  });

  //Resest sort filter when category is changed
  useEffect(() => {
    setSortValue("dateAsc");
  }, [selectedCategory]);

  //Check if session exists
  const sessionResults = useQuery(["getSessionDetail"], fetchSession, 0, {
    retry: false,
  });
  //Get status of session
  const sessionExist = sessionResults?.data?.outcome?.message ?? [];
  const sessionRefetch = sessionResults?.refetch;

  //Get items in customer favourites
  const favsResults = useQuery(["getFavs"], fetchFavs);
  //Get fav data
  const favs = favsResults?.data?.outcome ?? [];
  //Get refetch funciton to reload favs
  const favsRefetch = favsResults?.refetch;

  //pagination stuff
  // const [currentPage, setCurrentPage] = useState(0);

  // const PER_PAGE = 5;
  // const offset = currentPage * PER_PAGE;
  // const currentPageData = productsSorted
  //   .slice(offset, offset + PER_PAGE)
  //   .map(({ thumburl }) => (
  //     <img src={thumburl} key={thumburl} alt={thumburl} />
  //   ));

  // const pageCount = Math.ceil(productsSorted.length / PER_PAGE);

  // function handlePageClick({ selected: selectedPage }) {
  //   setCurrentPage(selectedPage);
  // }

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="2" className=""></Col>
        <Col xs="12" md="8" className="">
          <div className="mt-3 mb-1">
            <InputGroup>
              <Input
                bsSize="lg"
                type="search"
                placeholder="Search"
                className="search-input-style"
                onChange={(e) => {
                  setSearchParam(e.target.value);
                  e.target.value == "" ? setSearchParamSection("") : null;
                  e.target.value == "" ? setSelectedCategory("all") : null;
                }}
              />
              <InputGroupText
                className="search-icon-style"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchParamSection("/search/" + searchParam);
                  setSortValue("dateAsc");
                }}
              >
                <Search className="fs-3 mx-2" />
              </InputGroupText>
            </InputGroup>
          </div>
          <ResultsList items={categories} />
          <FormGroup floating className="rounded-3 mt-2">
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={sortValue}
              onChange={(event) => {
                setSortValue(event.target.value);
                console.log("sort value changed to: ", event.target.value);
              }}
            >
              <option value="dateAsc">Recommended</option>
              <option value="dateDesc">Whats New</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </Input>
            <Label for="exampleSelect">SORT</Label>
          </FormGroup>
          {/* <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          /> */}
          {/* {currentPageData} */}
          <ResultsProduct
            products={products}
            favs={favs}
            refetch={favsRefetch}
            prodstatus={status}
            sessionExist={sessionExist}
            sortProducts={sortValue}
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

export default Shop;
