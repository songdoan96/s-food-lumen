import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setToast } from "../../../store/toastSlice";

function UserOrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    if (!user) {
      dispatch(setToast({ message: "Vui lòng đăng nhập để tiếp tục." }));
      navigate("/login");
    }
  }, [user]);

  const getUserDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("api/user-order-detail/" + id);
      setCheckout(response.data.checkout);
      setOrder(response.data.order);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserDetails();
    setTotal(
      order.reduce((prev, current) => prev + Number(current.product.price) * current.qty, 0)
    );
  }, [id]);

  if (isLoading) {
    return (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Chi tiết đơn hàng</h3>

        <Spinner animation="border" />
      </Container>
    );
  } else if (error) {
    return (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Không tìm thấy đơn hàng.</h3>
      </Container>
    );
  } else {
    return (
      <Container>
        <Card className="my-5">
          <Card.Header>
            <h5 className="d-inline">Chi tiết đơn hàng</h5>
            <div className="float-end">
              <Button to="/order" as={Link} className="ms-2">
                Đơn hàng
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{checkout._id}</td>
                  <th>Ngày mua</th>
                  <td>{checkout.created_at}</td>
                  <td>Trạng thái</td>
                  <th>{checkout.status === 0 ? "Đang xử lý" : "Đã giao"}</th>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card className="my-5">
          <Card.Header>
            <h5 className="d-inline">Sản phẩm</h5>
          </Card.Header>
          <Card.Body>
            <Table striped bordered>
              <thead>
                <tr className="cart_menu">
                  <td>Hình ảnh</td>
                  <td className="image">Sản phẩm</td>
                  <td className="price">Giá</td>
                  <td className="quantity">Số lượng</td>
                  <td className="total">Thành tiền</td>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.map((orderItem) => (
                    <tr key={orderItem._id}>
                      <td className="cart_product">
                        <img
                          src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_50,w_50/v1649473695/${orderItem.product.image}`}
                          alt="Samsung Galaxy Z Fold2 5G"
                          width="50"
                        />
                      </td>
                      <td className="cart_description">
                        <h6>{orderItem.product.name}</h6>
                      </td>
                      <td className="cart_price">
                        <p>$ {orderItem.product.price}</p>
                      </td>
                      <td className="cart_quantity">
                        <div className="cart_quantity_button">
                          <p>{orderItem.qty}</p>
                        </div>
                      </td>
                      <td className="cart_total">
                        <p className="cart_total_price">
                          $ {Number(orderItem.product.price) * orderItem.qty}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <h5 className="float-end my-2">Tổng tiền: $ {total}</h5>
          </Card.Body>
        </Card>
        <Card className="my-5">
          <Card.Header>
            <h5 className="d-inline">Địa chỉ giao hàng</h5>
          </Card.Header>
          <Card.Body>
            <Table bordered>
              <tbody>
                <tr>
                  <th>Họ tên</th>
                  <td>{checkout.user && checkout.user.name}</td>
                  <th>Email</th>
                  <td>{checkout.user && checkout.user.email}</td>
                </tr>
                <tr>
                  <th>SĐT</th>
                  <td>{checkout.phone}</td>
                  <th>Địa chỉ</th>
                  <td>{checkout.address}</td>
                </tr>
              </tbody>
            </Table>
            <p>
              <b>Ghi chú</b>: <i>{checkout.notes}</i>
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default UserOrderDetail;
