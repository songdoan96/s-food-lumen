import { Badge, Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { BsCart4 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/api";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = user?.token;
  const cart = useSelector((state) => state.cart);

  const handleLogout = async (e) => {
    e.preventDefault();
    logoutUser(token, dispatch, navigate);
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          <span className="fs-2">S.</span>
          Food
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link to="/cart" as={Link}>
              <BsCart4 className="fs-3" />
              <Badge bg="secondary" className="ms-1">
                {cart.length}
              </Badge>
            </Nav.Link>

            {user ? (
              <>
                <NavDropdown title={user.name} id="basic-nav-dropdown" className="fs-5">
                  {user.role === "admin" ? (
                    <>
                      <NavDropdown.Item to="/admin" as={Link}>
                        Sản phẩm
                      </NavDropdown.Item>
                      <NavDropdown.Item to="/admin/order" as={Link}>
                        Đơn hàng
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item to="/order" as={Link}>
                      Đơn hàng
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button variant="danger" onClick={handleLogout}>
                      Đăng xuất
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link to="/login" as={Link}>
                  Đăng nhập
                </Nav.Link>
                <Nav.Link to="/register" as={Link}>
                  Đăng ký
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
