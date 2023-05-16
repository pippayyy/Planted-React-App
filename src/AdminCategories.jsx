import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import CardChevron from "./CardChevron";
import { PlusCircle } from "react-bootstrap-icons";
import fetchCategory from "./fetchCategory";
import { useEffect } from "react";

const AdminCategories = () => {
  //Used to get category data and populate category sections
  const resultsCategories = useQuery(["getCategories"], fetchCategory);
  const categories = resultsCategories?.data?.categories ?? [];
  const status = resultsCategories?.status;
  const refetch = resultsCategories?.refetch;

  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  //Reload data on page load
  useEffect(() => {
    refetch();
  });

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
                  Categories
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="mb-3 mt-1">
            <Col xs="12" md="6" className="">
              <CardChevron
                textSection={
                  <h5 className="mb-0 text-start">Add New Category</h5>
                }
                leftSection={<PlusCircle className="fs-1" />}
                linkUrl="/admin/form"
                linkData={null}
                linkSection="categoryAdd"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="">
              <h6 className="text-underline-green m-0">
                Edit Existing Category
              </h6>
            </Col>
          </Row>
          <Row className="g-2 my-2">
            {!categories.length && status == "loading" ? (
              <div className="loading-pane">
                <h6 className="">Loading categories...</h6>
              </div>
            ) : (!categories.length && status == "success") ||
              categories[0].id == null ? (
              <Col
                xs="12"
                className="justify-content-center align-items-center mt-3 text-center"
              >
                <h6 className="">Oops... no categories exist yet!</h6>
                <p className="">Add new categories using the option above.</p>
              </Col>
            ) : (
              categories.map((category) => (
                <Col
                  xs="12"
                  md="6"
                  key={category.id}
                  className="d-flex align-items-stretch"
                >
                  <CardChevron
                    textSection={
                      <span>
                        <h5 className="mb-0 text-start">{category.name}</h5>
                        <p className="mb-0" style={{ whiteSpace: "nowrap" }}>
                          Image:
                          {category.img == null ? "No" : "Yes"}
                        </p>
                        <p className="mb-0">
                          Status:{" "}
                          {category.status_active == 1 ? "Active" : "Inactive"}
                        </p>
                      </span>
                    }
                    leftSection={
                      <img
                        className="img-product img-fluid"
                        alt={category.name}
                        src={category.img}
                      />
                    }
                    linkUrl="/admin/form"
                    linkData={category}
                    linkSection="categoryEdit"
                    colSizeLeft="3"
                    colSizeMid="7"
                    colSizeRight="2"
                  />
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

export default AdminCategories;
