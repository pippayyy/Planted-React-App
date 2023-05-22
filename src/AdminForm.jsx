import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ExclamationCircle } from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  Label,
  Card,
  CardBody,
  FormGroup,
  Input,
  Alert,
  FormText,
} from "reactstrap";
import { useQuery } from "@tanstack/react-query";
import fetchCategoryActive from "./fetchCategoryActive";

const AdminForm = () => {
  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  //Get data passed from prev admin page
  const location = useLocation();
  const { linkData, formSection } = location.state;

  //Used to get category data and populate category sections
  const resultsCategories = useQuery(["getCategories"], fetchCategoryActive);
  const categories = resultsCategories?.data?.categories ?? [];

  //Set default value for selected section
  const [authOutcome, setAuthOutcome] = useState({
    status: null,
    message: null,
  });

  const formDict = [
    {
      section: "discountEdit",
      delButtonVis: true,
      submitAsJson: true,
      fields: [
        {
          fieldId: 1,
          formId: "dbId",
          fieldName: "Discount ID",
          fieldType: "text",
          fieldHintText: "Auto-generated ID",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "discount_id",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.discount_id : "",
          },
        },
        {
          fieldId: 2,
          formId: "discountCode",
          fieldName: "Discount Code",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_code",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.discount_code : "",
          },
        },
        {
          fieldId: 3,
          formId: "discountValue",
          fieldName: "Discount Percentage",
          fieldType: "number",
          fieldHintText: "Number 1-100",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_value",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.discount_value : 0,
            min: "1",
            max: "100",
          },
        },
        {
          fieldId: 4,
          formId: "discountStatus",
          fieldName: "Discount Status",
          fieldType: "switch",
          fieldHintText: "",
          fieldReq: false,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_status",
          defaultThing: {
            defaultChecked:
              linkData == null ? "" : linkData.discount_status == 1 ? "on" : "",
          },
          formDataManip: (input) => {
            var returnValue =
              input == "on" ? 1 : input == "" || input == null ? 0 : null;
            return returnValue;
          },
        },
      ],
      formFunc: {
        function(formData) {
          //Update row in discount_code table
          fetch("/api/admin/discount/edit", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
      formFuncDel: {
        function(dbId) {
          const data = { discountId: dbId };
          //create row in discount_code table
          fetch("/api/admin/discount/del", {
            method: "POST",
            credentials: "include",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
              navigate(-1);
            });
        },
      },
    },
    {
      section: "discountNew",
      delButtonVis: false,
      submitAsJson: true,
      fields: [
        {
          fieldId: 2,
          formId: "discountCode",
          fieldName: "Discount Code",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_code",
          defaultThing: { defaultValue: "" },
        },
        {
          fieldId: 3,
          formId: "discountValue",
          fieldName: "Discount Percentage",
          fieldType: "number",
          fieldHintText: "Number 1-100",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_value",
          defaultThing: {
            defaultValue: "",
            min: "1",
            max: "100",
          },
        },
        {
          fieldId: 4,
          formId: "discountStatus",
          fieldName: "Discount Status",
          fieldType: "switch",
          fieldHintText: "",
          fieldReq: false,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_status",
          defaultThing: {
            defaultChecked: "",
          },
          formDataManip: (input) => {
            var returnValue =
              input == "on" ? 1 : input == "" || input == null ? 0 : null;
            return returnValue;
          },
        },
      ],
      formFunc: {
        function(formData) {
          //create row in discount_code table
          fetch("/api/admin/discount/add", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
    },
    {
      section: "categoryEdit",
      delButtonVis: true,
      submitAsJson: true,
      fields: [
        {
          fieldId: 1,
          formId: "dbId",
          fieldName: "Category ID",
          fieldType: "text",
          fieldHintText: "Auto-generated ID",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "id",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.id : "",
          },
        },
        {
          fieldId: 2,
          formId: "categoryName",
          fieldName: "Category Name",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "name",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.name : "",
          },
        },
        {
          fieldId: 3,
          formId: "categoryImage",
          fieldName: "Category Image",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "img",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.img : "",
          },
        },
        // {
        //   fieldId: 4,
        //   formId: "image",
        //   fieldName: "Upload file to change category image",
        //   fieldType: "file",
        //   fieldHintText: "Select image",
        //   fieldReq: true,
        //   fieldDisabled: false,
        //   submitInForm: true,
        //   dataFieldName: "img",
        //   defaultThing: { accept: "image/*" },
        // },
        {
          fieldId: 5,
          formId: "categoryStatus",
          fieldName: "Category Status",
          fieldType: "switch",
          fieldHintText: "",
          fieldReq: false,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "status_active",
          defaultThing: {
            defaultChecked:
              linkData == null ? "" : linkData.status_active == 1 ? "on" : "",
          },
          formDataManip: (input) => {
            var returnValue =
              input == "on" ? 1 : input == "" || input == null ? 0 : null;
            return returnValue;
          },
        },
      ],
      formFunc: {
        function(formData) {
          //Update row in categories table
          fetch("/api/admin/category/edit", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
      formFuncDel: {
        function(dbId) {
          const data = { categoryId: dbId };
          //create row in categories table
          fetch("/api/admin/category/del", {
            method: "POST",
            credentials: "include",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
              navigate(-1);
            });
        },
      },
    },
    {
      section: "categoryAdd",
      delButtonVis: false,
      submitAsJson: false,
      fields: [
        {
          fieldId: 2,
          formId: "categoryName",
          fieldName: "Category Name",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "name",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.name : "",
          },
        },
        {
          fieldId: 3,
          formId: "image",
          fieldName: "Category Image",
          fieldType: "file",
          fieldHintText: " - upload .png or .jpg file",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "img",
          defaultThing: { accept: "image/*" },
        },
        {
          fieldId: 4,
          formId: "categoryStatus",
          fieldName: "Category Status",
          fieldType: "switch",
          fieldHintText: "",
          fieldReq: false,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "status_active",
          defaultThing: {
            defaultChecked:
              linkData == null ? "" : linkData.status_active == 1 ? "on" : "",
          },
          formDataManip: (input) => {
            var returnValue =
              input == "on" ? 1 : input == "" || input == null ? 0 : null;
            return returnValue;
          },
        },
      ],
      formFunc: {
        function(formData) {
          //Update row in categories table
          fetch("/api/admin/category/add", {
            method: "POST",
            credentials: "include",
            body: formData,
            // body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
      formFuncDel: {},
    },
    {
      section: "productAdd",
      delButtonVis: false,
      submitAsJson: false,
      fields: [
        {
          fieldId: 2,
          formId: "productName",
          fieldName: "Product Name",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "name",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.name : "",
          },
        },
        {
          fieldId: 3,
          formId: "category",
          fieldName: "Category",
          fieldType: "select",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "category_id",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.category_id : "",
          },
          selectOptions: categories ?? [],
        },
        {
          fieldId: 4,
          formId: "productDescrip",
          fieldName: "Product Description",
          fieldType: "textarea",
          fieldHintText: "Enter multiline description",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "description",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.description : "",
            rows: 5,
          },
        },
        {
          fieldId: 5,
          formId: "image",
          fieldName: "Product Image",
          fieldType: "file",
          fieldHintText: " - upload .png or .jpg file",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "img",
          defaultThing: { accept: "image/*" },
        },
        // {
        //   fieldId: 6,
        //   formId: "detail",
        //   fieldName: "Product Details",
        //   fieldType: "textarea",
        //   fieldHintText:
        //     "Format: [{'PropertyName': 'Example2', 'Value': 'ExampleValye', 'IconName': 'exampleIcon'}]",
        //   fieldReq: false,
        //   fieldDisabled: false,
        //   submitInForm: true,
        //   dataFieldName: "product_details_json",
        //   defaultThing: {
        //     defaultValue:
        //       linkData !== null ? linkData.product_details_json : "",
        //     rows: 5,
        //   },
        // },
        {
          fieldId: 7,
          formId: "productQty",
          fieldName: "Product Qty",
          fieldType: "number",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "stock",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.stock : "",
          },
        },
        {
          fieldId: 8,
          formId: "productPrice",
          fieldName: "Product Price (£)",
          fieldType: "number",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "price",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.price : "",
            pattern: "^d+(?:.d{1,2})?$",
            step: "0.01",
          },
        },
        {
          fieldId: 9,
          formId: "discountPerc",
          fieldName: "Discount Percentage",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_percent",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.discount_percent : "",
            pattern: "[0-9]{1,3}",
            maxLength: 3,
          },
        },
      ],
      formFunc: {
        function(formData) {
          //Update row in categories table
          fetch("/api/admin/product/add", {
            method: "POST",
            credentials: "include",
            body: formData,
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
      formFuncDel: {},
    },
    {
      section: "productEdit",
      delButtonVis: true,
      submitAsJson: true,
      fields: [
        {
          fieldId: 1,
          formId: "dbId",
          fieldName: "Product ID",
          fieldType: "text",
          fieldHintText: "Auto-generated ID",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "product_id",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.product_id : "",
          },
        },
        {
          fieldId: 2,
          formId: "productName",
          fieldName: "Product Name",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "name",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.name : "",
          },
        },
        {
          fieldId: 3,
          formId: "category",
          fieldName: "Category",
          fieldType: "select",
          fieldHintText: "Select category from dropdown",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "category_id",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.category_id : "",
          },
          selectOptions: categories ?? [],
        },
        {
          fieldId: 4,
          formId: "productDescrip",
          fieldName: "Product Description",
          fieldType: "textarea",
          fieldHintText: "Enter multiline description",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "description",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.description : "",
            rows: 5,
          },
        },
        {
          fieldId: 5,
          formId: "productImage",
          fieldName: "Product Image",
          fieldType: "text",
          fieldHintText: " - upload .png or .jpg file",
          fieldReq: true,
          fieldDisabled: true,
          submitInForm: true,
          dataFieldName: "img",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.img : "",
          },
        },
        // {
        //   fieldId: 6,
        //   formId: "detail",
        //   fieldName: "Product Details",
        //   fieldType: "textarea",
        //   fieldHintText:
        //     "Format: [{'PropertyName': 'Example2', 'Value': 'ExampleValye', 'IconName': 'exampleIcon'}]",
        //   fieldReq: false,
        //   fieldDisabled: false,
        //   submitInForm: true,
        //   dataFieldName: "product_details_json",
        //   defaultThing: {
        //     defaultValue:
        //       linkData !== null ? linkData.product_details_json : "",
        //     rows: 5,
        //   },
        // },
        {
          fieldId: 7,
          formId: "productQty",
          fieldName: "Product Qty",
          fieldType: "number",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "stock",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.stock : "",
          },
        },
        {
          fieldId: 8,
          formId: "productPrice",
          fieldName: "Product Price (£)",
          fieldType: "number",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "price",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.price : "",
            pattern: "^d+(?:.d{1,2})?$",
            step: "0.01",
          },
        },
        {
          fieldId: 9,
          formId: "discountPerc",
          fieldName: "Discount Percentage",
          fieldType: "text",
          fieldHintText: "",
          fieldReq: true,
          fieldDisabled: false,
          submitInForm: true,
          dataFieldName: "discount_percent",
          defaultThing: {
            defaultValue: linkData !== null ? linkData.discount_percent : "",
            pattern: "[0-9]{1,3}",
            maxLength: 3,
          },
        },
      ],
      formFunc: {
        function(formData) {
          //Update row in product table
          fetch("/api/admin/product/edit", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(formData),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
            });
        },
      },
      formFuncDel: {
        function(dbId) {
          const data = { productId: dbId };
          //create row in categories table
          fetch("/api/admin/product/del", {
            method: "POST",
            credentials: "include",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((response) => {
              setAuthOutcome({
                status: response.outcome.status,
                message: response.outcome.message,
              });
              navigate(-1);
            });
        },
      },
    },
  ];

  //Set form section
  // eslint-disable-next-line no-unused-vars
  const [formSectionName, setFormSectionName] = useState(formSection ?? null);

  const formFields =
    formSectionName !== null
      ? formDict.filter((d) => d.section == formSectionName)[0]
      : null;

  function handleDelClick() {
    //Get name of db id field
    const linkDataField = formFields.fields.filter((d) => d.formId == "dbId")[0]
      .dataFieldName;

    //Get deletetion func
    const formFuncDel = formFields.formFuncDel.function;

    //Perform delete
    formFuncDel(linkData[linkDataField]);
  }

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
                  Edit
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Form
            id="orderForm"
            className="needs-validation m-0"
            encType="multipart/form-data"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newFormData = new FormData();
              const completedForm = {};

              {
                formSectionName !== null
                  ? formFields.fields.map((field) =>
                      field.submitInForm
                        ? (completedForm[field.formId] =
                            field.fieldType == "switch"
                              ? field.formDataManip(formData.get(field.formId))
                              : formData.get(field.formId) ?? "")
                        : null
                    )
                  : null;
              }

              {
                formSectionName !== null
                  ? formFields.fields.map((field) =>
                      field.submitInForm
                        ? field.fieldType == "switch"
                          ? newFormData.append(
                              field.formId,
                              field.formDataManip(formData.get(field.formId))
                            )
                          : newFormData.append(
                              field.formId,
                              formData.get(field.formId) ?? ""
                            )
                        : null
                    )
                  : null;
              }

              const formFunc = formFields.formFunc.function;

              formFields.submitAsJson
                ? formFunc(completedForm)
                : formFunc(newFormData);
            }}
          >
            <Row className="mt-2">
              <Col xs="12" className="mb-3">
                <Card className="rounded-5 text-start d-flex h-100">
                  <CardBody className="">
                    <Container className="px-0">
                      <Row className="mt-2">
                        {formSectionName !== null
                          ? formFields.fields.map((field) => (
                              <Col xs="12" className="" key={field.fieldId}>
                                <FormGroup
                                  floating={
                                    field.fieldType == "switch" ||
                                    field.fieldType == "file"
                                      ? false
                                      : true
                                  }
                                  switch={
                                    field.fieldType == "switch" ? true : false
                                  }
                                >
                                  <Input
                                    id={field.formId}
                                    name={field.formId}
                                    placeholder={field.fieldHintText}
                                    type={field.fieldType}
                                    role={
                                      field.fieldType == "switch"
                                        ? "switch"
                                        : null
                                    }
                                    required={field.fieldReq}
                                    readOnly={field.fieldDisabled}
                                    {...field.defaultThing}
                                  >
                                    {field.fieldType !== "select"
                                      ? null
                                      : field.selectOptions.length > 0
                                      ? field.selectOptions.map((option) => (
                                          <option
                                            key={option.id}
                                            value={option.id}
                                          >
                                            {option.name}
                                          </option>
                                        ))
                                      : null}
                                  </Input>
                                  <Label
                                    check={
                                      field.fieldType == "switch" ? true : false
                                    }
                                    for={field.formId}
                                  >
                                    {field.fieldName}
                                  </Label>
                                </FormGroup>
                                {/* <FormText>{field.fieldHintText}</FormText> */}
                              </Col>
                            ))
                          : null}
                        <Col xs="12" className="mt-3 mb-1">
                          <Button
                            block
                            type="submit"
                            className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                          >
                            <h5 className="m-0">Save</h5>
                          </Button>
                        </Col>
                        {formFields.delButtonVis ? (
                          <Col xs="12" className="mb-3 mt-1">
                            <Button
                              block
                              onClick={() => {
                                handleDelClick();
                              }}
                              className="btn-danger border-0 rounded-4 d-flex justify-content-center align-items-center py-3"
                            >
                              <h5 className="m-0">Delete</h5>
                            </Button>
                          </Col>
                        ) : null}
                        <Col xs="12" className="mb-2">
                          {authOutcome.status == null ? null : (
                            <Alert color={authOutcome.status}>
                              {authOutcome.status == "success" ? (
                                <CheckCircle className="fs-1 me-2" />
                              ) : (
                                <ExclamationCircle className="fs-1 me-2" />
                              )}
                              {authOutcome.message}
                            </Alert>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col xs="0" md="2" className=""></Col>
      </Row>
    </Container>
  );
};

export default AdminForm;
