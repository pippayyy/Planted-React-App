import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Tag } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const CallToActionButton = ({ text, iconName, link, id }) => {
  //Used to lookup iconName prop in libary of icon components
  const componentLookup = {
    tag: Tag,
  };

  const CardIcon = iconName !== "None" ? componentLookup[iconName] : "None";

  return (
    <Link to={link} state={{ filterId: { id } }} className="category-button">
      <Button
        block
        className="button-colour border-0 text-black rounded-4 d-flex justify-content-center align-items-center py-3"
      >
        {" "}
        {CardIcon !== "None" ? <CardIcon className="fs-2 me-2" /> : null}
        <h5 className="m-0">{text}</h5>
      </Button>
    </Link>
  );
};

export default CallToActionButton;
