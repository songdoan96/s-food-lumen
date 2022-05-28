import React, { useState } from "react";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkoutProduct } from "../../../store/api";
function Checkout({ cart }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.login.currentUser?.token);
  // const [errors, setErrors] = useState([]);
  const errors = useSelector((state) => state.checkout.errors);
  // const isLoading = useSelector((state) => state.checkout.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    address: "",
    phone: "",
    notes: "",
  });
  const handleInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const fomData = new FormData();
    fomData.append("address", formInput.address);
    fomData.append("phone", formInput.phone);
    fomData.append("notes", formInput.notes);
    fomData.append("products", JSON.stringify(cart));
    await checkoutProduct(fomData, token, dispatch, navigate);
    setIsLoading(false);
  };

  return (
    <Card>
      <Card.Header>
        <h5>Thanh toán</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleCheckout}>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              value={formInput.address}
              name="address"
              onChange={handleInput}
            />
            {errors.address && <p className="text-danger">{errors.address}</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>SĐT</Form.Label>
            <Form.Control type="text" value={formInput.phone} name="phone" onChange={handleInput} />
            {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ghi chú đơn hàng</Form.Label>
            <Form.Control
              as="textarea"
              value={formInput.notes}
              name="notes"
              onChange={handleInput}
            />
          </Form.Group>
          {isLoading ? (
            <Spinner animation="border" role="status" variant="primary" />
          ) : (
            <Button variant="primary" type="submit">
              Thanh toán
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Checkout;
