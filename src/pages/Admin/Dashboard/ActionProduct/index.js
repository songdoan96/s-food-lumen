import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updatedProduct } from "../../../../store/productSlice";
import { setToast } from "../../../../store/toastSlice";

function ActionProduct({ id }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.items);
  // const updating = useSelector((state) => state.product.items);
  const [errors, setErrors] = useState([]);
  const [picture, setPicture] = useState([]);
  const [updateProduct, setUpdatedProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [updating, setUploading] = useState(false);

  useEffect(() => {
    setUpdatedProduct(products.find((product) => product._id === id));
  }, [id, products]);
  const handleImage = (e) => {
    const file = e.target.files[0];
    setPicture({ image: file });
  };
  const handleInput = (event) =>
    setUpdatedProduct({
      ...updateProduct,
      [event.target.name]: event.target.value,
    });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formUpdate = new FormData();
    formUpdate.append("name", updateProduct.name);
    formUpdate.append("price", updateProduct.price);
    formUpdate.append("image", picture.image);
    formUpdate.append("_method", "PUT");
    setUploading(true);
    try {
      const response = await axios.post(`api/product/${id}`, formUpdate);

      dispatch(updatedProduct(response.data.product));
      setShowModal(false);
      dispatch(setToast({ message: response.data.message }));
    } catch (error) {
      setErrors(JSON.parse(error.response.data.message));
    }
    setUploading(false);
  };
  // Delete product
  const handleDelete = async () => {
    setUploading(true);
    try {
      const response = await axios.delete(`api/product/${id}`);
      dispatch(deleteProduct(id));

      dispatch(setToast({ message: response.data.message }));
    } catch (error) {
      dispatch(setToast({ message: "Có sự cố khi xóa", type: "danger" }));
    }
    setShowModalDelete(false);
    setUploading(false);
  };
  return (
    <div>
      <button className="btn mx-1 btn-outline-secondary" onClick={() => setShowModal(true)}>
        <BsPencil />
      </button>
      <button className="btn mx-1 btn-outline-danger" onClick={() => setShowModalDelete(true)}>
        <BsTrash />
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                onChange={handleInput}
                name="name"
                value={updateProduct.name}
              />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Giá sản phẩm</Form.Label>
              <Form.Control
                type="text"
                onChange={handleInput}
                name="price"
                value={updateProduct.price}
              />
              {errors.price && <p className="text-danger">{errors.price}</p>}
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control type="file" onChange={handleImage} name="image" />
              {errors.image && <p className="text-danger">{errors.image}</p>}
              {updateProduct.image && (
                <img
                  className="my-3"
                  src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,w_170/v1649473695/${updateProduct.image}`}
                  alt="product"
                />
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {!updating ? (
              <>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </Button>
                <Button variant="primary" type="submit">
                  Cập nhật
                </Button>
              </>
            ) : (
              <Spinner animation="border" />
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showModalDelete} onHide={() => setShowModalDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa sản phẩm này?</Modal.Body>
        <Modal.Footer>
          {!updating ? (
            <>
              <Button variant="secondary" onClick={() => setShowModalDelete(false)}>
                Hủy
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  handleDelete();
                }}
              >
                Xóa
              </Button>
            </>
          ) : (
            <Spinner animation="border" variant="danger" />
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActionProduct;
