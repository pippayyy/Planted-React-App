// import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Row,
  Col,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import CardChevron from "./CardChevron";
import { PlusCircle } from "react-bootstrap-icons";
import useFetchProduct from "./useFetchProduct";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProducts = () => {
  //Get all products
  const [products, status, refetch] = useFetchProduct("category/all");

  //Reload data on page load
  useEffect(() => {
    refetch();
  });

  //Use Navigate to go back to prev section
  const navigate = useNavigate();

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
                  Products
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="mb-3 mt-1">
            <Col xs="12" md="6" className="">
              <CardChevron
                textSection={
                  <h5 className="mb-0 text-start">Add New Product</h5>
                }
                leftSection={<PlusCircle className="fs-1" />}
                linkUrl="/admin/form"
                linkData={null}
                linkSection="productAdd"
                colSizeLeft="2"
                colSizeMid="8"
                colSizeRight="2"
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="">
              <h6 className="text-underline-green m-0">
                Edit Existing Product
              </h6>
            </Col>
          </Row>
          <Row className="g-2 my-2">
            {!products.length && status == "loading" ? (
              <div className="loading-pane">
                <h6 className="">Loading products...</h6>
              </div>
            ) : (!products.length && status == "success") ||
              products[0].product_id == null ? (
              <Col
                xs="12"
                className="justify-content-center align-items-center mt-3 text-center"
              >
                <h6 className="">Oops... no products exist yet!</h6>
                <p className="">Add new products using the option above.</p>
              </Col>
            ) : (
              products.map((productItem) => (
                <Col xs="12" md="6" key={productItem.product_id}>
                  <CardChevron
                    textSection={
                      <span>
                        <h5 className="mb-0 text-start">{productItem.name}</h5>
                        <CardTitle
                          tag={
                            productItem.discount_percent == 0 ? "span" : "del"
                          }
                          className="text-center"
                        >
                          Price: £{productItem.price}
                        </CardTitle>
                        <span className="sale-text fw-bold">
                          {productItem.discount_percent == 0
                            ? ""
                            : " £" +
                              (
                                productItem.price *
                                (1 - productItem.discount_percent * 0.01)
                              ).toFixed(2)}
                        </span>
                        <p className="mb-0" style={{ whiteSpace: "nowrap" }}>
                          Qty: {productItem.stock}
                          {productItem.virtual_stock_reserved == null
                            ? null
                            : " (" +
                              productItem.virtual_stock_reserved +
                              " reserved)"}
                        </p>
                        <p className="mb-0">
                          Category: {productItem.category_name}
                        </p>
                      </span>
                    }
                    leftSection={
                      <div
                        className={
                          productItem.stock < 1
                            ? "card-blur out-of-stock-div"
                            : ""
                        }
                      >
                        <img
                          className={
                            productItem.category_id > 1
                              ? "rounded-circle img-product-circle-small"
                              : "img-product-small"
                          }
                          alt={productItem.name}
                          src={productItem.img}
                        />
                        <div className="overlay-text justify-content-center align-items-center">
                          <h6 className="mb-3 text-black text-center">
                            {productItem.stock < 1 ? "Out of stock" : ""}
                          </h6>
                        </div>
                      </div>
                    }
                    linkUrl="/admin/form"
                    linkData={productItem}
                    linkSection="productEdit"
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

export default AdminProducts;
