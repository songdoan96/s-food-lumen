import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../store/cartSlice";
import Filter from "./Filter";
function Home() {
  const products = useSelector((state) => state.product.items);
  const status = useSelector((state) => state.product.getProducts.status);
  const cart = useSelector((state) => state.cart);
  const [productsSorted, setProductsSorted] = useState(products);
  const dispatch = useDispatch();

  useEffect(() => {
    setProductsSorted(products);
  }, [products]);

  const handleAddToCart = (product) => {
    dispatch(addProductToCart({ ...product, qty: 1 }));
  };
  const handleRemoveFromCart = (_id) => {
    dispatch(removeProductFromCart(_id));
  };
  function handleFilter(sort) {
    const oldProducts = [...products];
    switch (sort) {
      case "price_asc":
        setProductsSorted(oldProducts.sort((a, b) => a.price - b.price));
        break;
      case "price_desc":
        setProductsSorted(oldProducts.sort((a, b) => b.price - a.price));
        break;
      case "name_asc":
        setProductsSorted(oldProducts.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "name_desc":
        setProductsSorted(oldProducts.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      default:
        setProductsSorted(products);
        break;
    }
  }

  let child = "";

  if (status === "success") {
    child = productsSorted.map((product, index) => (
      <Col sm={6} lg={3} className="mb-4" key={product._id}>
        <Card className="cart-shadow">
          <Card.Header className="bg-white">
            <Card.Img
              variant="top"
              src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_200/v1649473695/${product.image}`}
              height="200"
            />
          </Card.Header>
          <Card.Body>
            <h5>{product.name}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h6>$ {product.price}</h6>
              {cart.some((p) => p._id === product._id) ? (
                <button
                  className="border-0 outline-0 text-danger fs-2 bg-transparent"
                  onClick={handleRemoveFromCart.bind(this, product._id)}
                >
                  <BsFillCartXFill />
                </button>
              ) : (
                <button
                  className="border-0 outline-0 text-primary fs-2 bg-transparent"
                  onClick={handleAddToCart.bind(this, product)}
                >
                  <BsFillCartPlusFill />
                </button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  } else if (status === "pending") {
    child = (
      <Container
        className="mx mt-5 d-flex flex-column justify-content-center align-items-center"
        style={{ width: "100vw", height: "50vh" }}
      >
        <h3 className="my-5">Đang tải sản phẩm...</h3>

        <Spinner animation="border" />
      </Container>
    );
  } else if (status === "fail") {
    child = <div>Fail</div>;
  }

  return (
    <Container fluid className="mt-2">
      <Row>
        <Col sm={4} lg={2}>
          <Filter handleFilter={handleFilter} />
        </Col>
        {productsSorted && (
          <Col sm={8} lg={10}>
            <Row>{child}</Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Home;
