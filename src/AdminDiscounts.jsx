import { useEffect } from "react";
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
import { PlusCircle, Tag } from "react-bootstrap-icons";
import fetchAllDiscounts from "./fetchAllDiscounts";

const AdminDiscounts = () => {
  //Used to get category data and populate category sections
  const resultsDiscounts = useQuery(["getDiscounts"], fetchAllDiscounts);
  const discounts = resultsDiscounts?.data?.outcome ?? [];
  const status = resultsDiscounts?.status;
  const refetch = resultsDiscounts?.refetch;

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
                  Discounts
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="mb-3 mt-1">
            <Col
              xs="12"
              md="6"
              className="justify-content-center align-items-center"
            >
              <CardChevron
                textSection={
                  <h5 className="mb-0 text-start">Add New Discount</h5>
                }
                leftSection={<PlusCircle className="fs-1" />}
                linkUrl="/admin/form"
                linkData={null}
                linkSection="discountNew"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="">
              <h6 className="text-underline-green m-0">
                Edit Existing Discount
              </h6>
            </Col>
          </Row>
          <Row className="g-2 my-2 mb-4">
            {!discounts.length && status == "loading" ? (
              <div className="loading-pane">
                <h6 className="">Loading discounts...</h6>
              </div>
            ) : (!discounts.length && status == "success") ||
              discounts[0].discount_id == null ? (
              <Col
                xs="12"
                className="justify-content-center align-items-center mt-3 text-center"
              >
                <h6 className="">Oops... no discounts exist yet!</h6>
                <p className="">Add new discounts using the option above.</p>
              </Col>
            ) : (
              discounts.map((discountItem) => (
                <Col xs="12" md="6" key={discountItem.discount_id}>
                  <CardChevron
                    textSection={
                      <span>
                        <h5 className="mb-0 text-start">
                          <small>Code:</small>&nbsp;{discountItem.discount_code}
                        </h5>
                        <p className="mb-0">
                          Discount: {discountItem.discount_value}%
                        </p>
                        <p className="mb-0">
                          Status:{" "}
                          {discountItem.discount_status == 1
                            ? "Active"
                            : "Inactive"}
                        </p>
                      </span>
                    }
                    leftSection={<Tag className="bi--5xl" size={40} />}
                    linkUrl="/admin/form"
                    linkData={discountItem}
                    linkSection="discountEdit"
                    colSizeLeft="2"
                    colSizeMid="8"
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

export default AdminDiscounts;
