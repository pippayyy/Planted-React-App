import { useEffect, useState } from "react";
import { CheckCircle, ExclamationCircle } from "react-bootstrap-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  Alert,
} from "reactstrap";

const SignInup = () => {
  //Check if redirected to this page
  const location = useLocation();
  const { redirectFlag } = location.state ?? false;

  //Set default value for selected section
  const [selectedSection, setSelectedSection] = useState(1);

  //Set default value for selected section
  const [authOutcome, setAuthOutcome] = useState({
    status: null,
    message: null,
  });

  //Make json obj of menu options
  const menuOptions = [
    { id: 1, name: "Sign In" },
    { id: 2, name: "Sign Up" },
  ];

  function signUp(userData) {
    const data = userData;
    //Send user details to be checked
    fetch(`https://plantedserver.onrender.com/signup`, {
      method: "POST",
      credentials: "include",
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("signUp response: ", response);
        setAuthOutcome({
          status: response.outcome.status,
          message: response.outcome.message,
        });
      });
  }

  function signIn(userData) {
    const data = userData;
    //Send user details to be checked
    fetch(`https://plantedserver.onrender.com/signin`, {
      method: "POST",
      credentials: "include",
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("signIn response: ", response);
        setAuthOutcome({
          status: response.outcome.status,
          message: response.outcome.message,
        });
      });
  }

  //Use Navigate to go back to prev section
  const navigate = useNavigate();

  useEffect(() => {
    // run something every time name changes
    console.log("authOutcome.status: ", authOutcome.status);
    console.log("redirectFlag: ", redirectFlag);
    console.log("!redirectFlag: ", !redirectFlag);
    authOutcome.status == "success"
      ? setTimeout(() => {
          // After 3 seconds, navigate away
          !redirectFlag ? navigate(-1) : navigate(-2);
        }, 1500)
      : null;
  }, [authOutcome]);

  return (
    <Container fluid className="content-container">
      <Row>
        <Col xs="0" md="3" className=""></Col>
        <Col xs="12" md="6" className="">
          <Row className="mb-3">
            <Col xs="12">
              <Card className="rounded-5 my-3">
                <CardBody className="">
                  <Container className="px-0">
                    <Row className="text-center justify-content-center align-items-center ">
                      <Nav pills className="nav-fill">
                        {!selectedSection
                          ? null
                          : menuOptions.map((option) => (
                              <NavItem className="mx-2" key={option.id}>
                                <NavLink
                                  id={option.id}
                                  href="#"
                                  onClick={() => {
                                    setSelectedSection(option.id);
                                    setAuthOutcome({
                                      status: null,
                                      message: null,
                                    });
                                  }}
                                  className={
                                    selectedSection == option.id
                                      ? "active px-0 pb-3 text-white nav-link"
                                      : "px-0 pb-3"
                                  }
                                >
                                  {option.name}
                                </NavLink>
                              </NavItem>
                            ))}
                      </Nav>
                    </Row>
                    <Row className="ps-2 mt-3">
                      {selectedSection == 1 ? (
                        <Form
                          id="formSignIn"
                          className="needs-validation m-0"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const userData = {
                              userEmail: formData.get("email") ?? "",
                              userPassword: formData.get("password") ?? "",
                            };
                            signIn(userData);
                          }}
                        >
                          <Col xs="12" className="text-center my-2">
                            <FormGroup floating>
                              <Input
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                type="email"
                                required
                              />
                              <Label for="email">Email Address</Label>
                            </FormGroup>
                            <FormGroup floating>
                              <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                required
                              />
                              <Label for="password">Password</Label>
                            </FormGroup>
                          </Col>
                          <Col xs="12" className="mb-2">
                            <Button
                              block
                              className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                            >
                              <h5 className="m-0">
                                {menuOptions.filter((d) => d.id == 1)[0].name}
                              </h5>
                            </Button>
                          </Col>
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
                        </Form>
                      ) : (
                        <Form
                          id="formSignUp"
                          className="needs-validation m-0"
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const userData = {
                              userEmail: formData.get("email") ?? "",
                              userFname: formData.get("fname") ?? "",
                              userLname: formData.get("lname") ?? "",
                              userPhone: formData.get("phone") ?? "",
                              userPassword: formData.get("password") ?? "",
                            };
                            console.log("userData: ", userData);
                            signUp(userData);
                          }}
                        >
                          <Col xs="12" className="text-center my-2">
                            <FormGroup floating>
                              <Input
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                type="email"
                                required
                              />
                              <Label for="email">Email Address</Label>
                            </FormGroup>
                            <FormGroup floating>
                              <Input
                                id="fname"
                                name="fname"
                                placeholder="First Name"
                                type="text"
                                required
                              />
                              <Label for="fname">First Name</Label>
                            </FormGroup>
                            <FormGroup floating>
                              <Input
                                id="lname"
                                name="lname"
                                placeholder="Last Name"
                                type="text"
                                required
                              />
                              <Label for="lname">Last Name</Label>
                            </FormGroup>
                            <FormGroup floating>
                              <Input
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                type="tel"
                                required
                              />
                              <Label for="phone">Phone Number</Label>
                            </FormGroup>
                            <FormGroup floating>
                              <Input
                                id="password"
                                name="password"
                                placeholder="Password"
                                type="password"
                                required
                              />
                              <Label for="password">Password</Label>
                            </FormGroup>
                          </Col>
                          <Col xs="12" className="mb-2">
                            <Button
                              block
                              className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                            >
                              <h5 className="m-0">
                                {menuOptions.filter((d) => d.id == 2)[0].name}
                              </h5>
                            </Button>
                          </Col>
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
                        </Form>
                      )}
                    </Row>
                    {/* <Button
                  block
                  className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
                  onClick={getSession}
                >
                  <h5 className="m-0">GET THE SESSION</h5>
                </Button> */}
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs="0" md="3" className=""></Col>
      </Row>
    </Container>
  );
};

export default SignInup;
