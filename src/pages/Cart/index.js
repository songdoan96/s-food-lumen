import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { BiMinus, BiPlus, BiShoppingBag, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decreaseCartQty, increaseCartQty, removeProductFromCart } from "../../store/cartSlice";
import { setToast } from "../../store/toastSlice";
import Checkout from "./Checkout";
function Cart() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      dispatch(setToast({ message: "Vui lòng đăng nhập để tiếp tục." }));
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((prev, current) => prev + Number(current.price) * current.qty, 0));
  }, [cart]);

  return (
    <Container className="mt-2" fluid>
      {cart.length > 0 ? (
        <>
          <Row>
            <Col sm={8}>
              <Card>
                <Card.Header>
                  <h5>Chi tiết đơn hàng</h5>
                </Card.Header>

                <Card.Body>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <img
                              src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_70,w_70/v1649473695/${product.image}`}
                              alt={product.name}
                            />
                          </td>
                          <td className="text-start">{product.name}</td>
                          <td className="fs-5">$ {product.price}</td>
                          <td>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(decreaseCartQty(product._id))}
                            >
                              <BiMinus />
                            </button>
                            <span className="mx-3 fs-4 fw-semibold">{product.qty}</span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(increaseCartQty(product._id))}
                            >
                              <BiPlus />
                            </button>
                          </td>
                          <td>
                            <h5>$ {product.price * product.qty}</h5>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => dispatch(removeProductFromCart(product._id))}
                            >
                              <BiTrash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <h3 className="float-end my-4">Tổng tiền: $ {total}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={4}>
              <Checkout cart={cart} />
            </Col>
          </Row>
        </>
      ) : (
        <div className="text-center mt-5 pt-5">
          <h4 className="text-uppercase">Giỏ hàng trống</h4>
          <h4 className="text-danger ">
            <BiTrash className="fs-1" />
          </h4>
          <Link to="/" className="btn btn-primary mt-4 d-inline-flex py-2">
            <BiShoppingBag className="me-2 fs-4" />
            Tiếp tục mua sắm
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Cart;
