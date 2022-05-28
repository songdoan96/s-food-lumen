import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductItem from "../ProductItem";
function List() {
  const products = useSelector((state) => state.product.items);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Giá</th>
          <th>Hình ảnh</th>
          <th>Sửa/Xóa</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, key) => (
          <ProductItem key={key} product={product} />
        ))}
      </tbody>
    </Table>
  );
}

export default List;
