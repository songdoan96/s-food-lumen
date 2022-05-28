import { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/api";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../../store/toastSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    if (user) {
      dispatch(setToast({ message: "Bạn đã đăng nhập." }));
      navigate("/");
    }
  }, []);

  const error = useSelector((state) => state.auth.register.errors);
  const isLoading = useSelector((state) => state.auth.register.isLoading);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const { name, email, password, password_confirmation } = formData;

  const onChangeRegisterForm = (event) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    registerUser(formData, dispatch, navigate);
  };

  return (
    <Container className="mt-5">
      <div className="col-sm-6 mx-auto">
        <h2 className="mb-3">Đăng ký</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên:</Form.Label>
            <Form.Control type="text" name="name" value={name} onChange={onChangeRegisterForm} />
            {error && <p className="text-danger">{error.name}</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text" name="email" value={email} onChange={onChangeRegisterForm} />
            {error && <p className="text-danger">{error.email}</p>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={onChangeRegisterForm}
            />
            {error && <p className="text-danger">{error.password}</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nhập lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={onChangeRegisterForm}
            />
            {error && <p className="text-danger">{error.password_confirmation}</p>}
          </Form.Group>

          {isLoading ? (
            <Spinner animation="border" role="status" variant="primary" />
          ) : (
            <Button variant="primary" type="submit">
              Đăng ký
            </Button>
          )}

          <p className="mt-3">
            Đã có tài khoản?
            <Link to="/login" className="ms-3">
              Đăng nhập
            </Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
