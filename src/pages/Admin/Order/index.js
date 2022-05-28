import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToast } from "../../../store/toastSlice";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user || user.role !== "admin") {
      dispatch(setToast({ message: "Bạn không có quyền truy cập.", type: "warning" }));
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data.orders);
      } catch (error) {
        setErrors(true);
      }
      setLoading(false);
    };

    user && getOrder();
  }, [user]);
  if (loading) {
    return (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Đang tải đơn hàng...</h3>

        <Spinner animation="border" />
      </Container>
    );
  } else if (errors || !orders.length) {
    return (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Danh sách đơn hàng trống.</h3>
      </Container>
    );
  } else {
    return (
      <Container className="my-5">
        <Card>
          <Card.Header>
            <h4>Đơn hàng</h4>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Họ tên</th>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Tình trạng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user.name}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.status === 0 ? "Đang giao" : "Đã giao"}</td>
                    <td>
                      <Button to={`/admin/order/${order._id}`} as={Link}>
                        Chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default Order;
