import React, { useEffect } from "react";
import { Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserOrders } from "../../../store/api";
import { setToast } from "../../../store/toastSlice";

function UserOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.userOrder.orders);
  const isLoading = useSelector((state) => state.userOrder.isLoading);
  const user = useSelector((state) => state.auth.login.currentUser);

  const token = useSelector((state) => state.auth.login.currentUser?.token);
  useEffect(() => {
    if (!user) {
      dispatch(setToast({ message: "Vui lòng đăng nhập để tiếp tục." }));
      navigate("/login");
    }
  }, [user]);
  useEffect(() => {
    getUserOrders(token, dispatch, navigate);
  }, [token]);
  let child = "";
  if (isLoading) {
    child = (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Đang tải đơn hàng...</h3>

        <Spinner animation="border" />
      </Container>
    );
  } else {
    child = (
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
                    <Button to={`/order/${order._id}`} as={Link}>
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
  return <Container className="my-5">{child}</Container>;
}

export default UserOrder;
