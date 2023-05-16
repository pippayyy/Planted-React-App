import { useContext } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import SelectedCategoryContext from "./SelectedCategoryContext";

const ResultsList = ({ items }) => {
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useContext(
    SelectedCategoryContext
  );

  return (
    <Nav pills className="scrollmenu">
      {!items.length ? (
        <div className="loading-pane">
          {" "}
          Loading
          <h3 className="loader ms-2">꩜</h3>
        </div>
      ) : (
        items.map((category) => (
          <NavItem className="me-3 mb-2" key={category.id}>
            <NavLink
              id={category.id}
              href="#"
              onClick={() => {
                setSelectedCategory(category.id);
              }}
              className={
                category.id === selectedCategory
                  ? "active px-0 pb-0"
                  : "px-0 pb-0"
              }
            >
              {category.name}
            </NavLink>
          </NavItem>
        ))
      )}
      {!items.length ? (
        ""
      ) : (
        <NavItem className="me-3 mb-2">
          <NavLink
            id="sale"
            href="#"
            onClick={() => {
              setSelectedCategory("sale");
            }}
            className={
              "sale" === selectedCategory ? "active px-0 pb-0" : "px-0 pb-0"
            }
          >
            Sale
          </NavLink>
        </NavItem>
      )}
      {!items.length ? (
        ""
      ) : (
        <NavItem className="me-3 mb-2">
          <NavLink
            id="all"
            href="#"
            onClick={() => {
              setSelectedCategory("all");
            }}
            className={
              "all" === selectedCategory ? "active px-0 pb-0" : "px-0 pb-0"
            }
          >
            All
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
};

export default ResultsList;
