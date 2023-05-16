import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  NavItem,
  NavbarToggler,
  Collapse,
  NavLink,
  Nav,
  NavbarBrand,
} from "reactstrap";
import {
  Person,
  Heart,
  Bag,
  House,
  Search,
  QuestionCircle,
  Gear,
} from "react-bootstrap-icons";
import PlantedIcon from "./images/icon_planted.png";

const NavbarMobile = () => {
  // Collapse isOpen State
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar expand="md" className="navbar-dark d-flex sticky-top py-1">
      <NavbarToggler
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto my-2" navbar>
          <NavItem>
            <NavLink className="text-white float-start" href="/">
              <h5 className="m-0 fw-light">
                <House className="fs-3 align-top me-1" /> Home
              </h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className="text-white float-start"
              href="/products/category"
            >
              <h5 className="m-0 fw-light">
                <Search className="fs-3 align-top me-1" /> Shop
              </h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white float-start" href="/about">
              <h5 className="m-0 fw-light">
                <QuestionCircle className="fs-3 align-top me-1" /> About
              </h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white float-start" href="/account">
              <h5 className="m-0 fw-light">
                <Person className="fs-3 align-top me-1" /> My Account
              </h5>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white float-start" href="/admin">
              <h5 className="m-0 fw-light">
                <Gear className="fs-3 align-top me-1" /> Admin
              </h5>
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <NavbarBrand
        className="text-white mx-3 text-center m-0 align-text-bottom"
        href="/"
      >
        <img src={PlantedIcon} alt="Planted logo" height="38" />
        Planted
      </NavbarBrand>
      <Nav className="nav navbar-nav navbar-right justify-content-end" navbar>
        <ul className="p-0">
          <li className="text-white" href="/login">
            <a href="/account" className="">
              <Person className="fs-3" />
            </a>
          </li>
          <li className="text-white" href="/favourites">
            <a href="/favourites" className="">
              <Heart className="fs-3" />
            </a>
          </li>
          <li className="text-white" href="#">
            <Link to={`/bag`} className="category-button text-white">
              <Bag className="fs-3" />
            </Link>
          </li>
        </ul>
      </Nav>
    </Navbar>
  );
};

export default NavbarMobile;
