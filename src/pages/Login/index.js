import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loginUser } from "../../store/api";
import { setToast } from "../../store/toastSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.login.errors);
  const isLoading = useSelector((state) => state.auth.login.isLoading);

  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    if (user) {
      dispatch(setToast({ message: "Bạn đã đăng nhập." }));
      navigate("/");
    }
  }, []);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const { password, email } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(loginForm, dispatch, navigate);
  };

  return (
    <Container className="mt-5">
      <div className="col-sm-6 mx-auto">
        <h2 className="mb-3">Đăng nhập</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              // type="email"
              type="text"
              name="email"
              // required
              value={email}
              onChange={onChangeLoginForm}
            />
            {error && <p className="text-danger">{error.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              // required
              value={password}
              onChange={onChangeLoginForm}
            />
            {error && <p className="text-danger">{error.password}</p>}
          </Form.Group>
          {isLoading ? (
            <Spinner animation="border" role="status" variant="primary" />
          ) : (
            <Button variant="primary" type="submit">
              Đăng nhập
            </Button>
          )}

          <p className="mt-3">
            Chưa có tài khoản?
            <Link to="/register" className="ms-3">
              Đăng ký
            </Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
