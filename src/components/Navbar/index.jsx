import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import Figure from "react-bootstrap/Figure";
import lucky_bus from "../../static/icons/vecteezy_school-bus.jpg";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { add } from "../redux/modalSlice";

function BasicExample() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const addNewCertificate = () => {
    dispatch(add());
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {!isAuthenticated && (
          <LinkContainer to="/login">
            <Navbar.Brand>LOGIN</Navbar.Brand>
          </LinkContainer>
        )}
        {isAuthenticated && <Navbar.Brand>Admin UI</Navbar.Brand>}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Button
                as="input"
                type="button"
                value="Add new"
                onClick={addNewCertificate}
              />
            </Nav>
            <Nav className="ml-auto">
              <Figure className="mb-0 pe-3">
                <Figure.Image
                  className="mb-0"
                  roundedCircle
                  width={50}
                  height={50}
                  alt="50x50"
                  src={lucky_bus}
                />
              </Figure>
            </Nav>
            <Navbar.Text className="pe-3">{user}</Navbar.Text>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default BasicExample;
