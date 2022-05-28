import { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../../../store/api";
function Upload() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState();
  const [picture, setPicture] = useState([]);
  const errors = useSelector((state) => state.product.addProduct.errors);

  const uploading = useSelector((state) => state.product.addProduct.status) === "pending";

  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    URL.revokeObjectURL(imageURL);

    const file = e.target.files[0];
    setImageURL(URL.createObjectURL(file));
    setPicture({ image: file });
  };
  const productStore = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("image", picture.image);
    await addProduct(formData, token, dispatch, navigate);
    resetForm();
  };
  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
    });
    setPicture([]);
    setImageURL("");
    document.getElementById("form").reset();
  };
  return (
    <Card>
      <Card.Header>Thêm sản phẩm</Card.Header>
      <Card.Body>
        <Form onSubmit={productStore} encType="multipart/form-data" id="form">
          <Form.Group className="mb-2">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control type="text" onChange={handleInput} name="name" value={product.name} />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Giá sản phẩm</Form.Label>
            <Form.Control type="text" onChange={handleInput} name="price" value={product.price} />
            {errors.price && <p className="text-danger">{errors.price}</p>}
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Hình ảnh</Form.Label>
            <Form.Control type="file" onChange={handleImage} name="image" />
            {errors.image && <p className="text-danger">{errors.image}</p>}

            {imageURL && <img className="my-3" src={imageURL} width="100" alt="product" />}
          </Form.Group>
          {!uploading ? (
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          ) : (
            <Spinner animation="border" role="status" variant="primary" />
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Upload;
