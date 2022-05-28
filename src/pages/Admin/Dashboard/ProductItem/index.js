import ActionProduct from "../ActionProduct";

function ProductItem({ product }) {
  return (
    <tr>
      <td className="fs-5">{product.name}</td>
      <td className="fs-5">$ {product.price}</td>
      <td>
        <img
          src={`https://res.cloudinary.com/song-doan/image/upload/c_fill,h_80,w_80/v1649473695/${product.image}`}
          alt={product.name}
        />
      </td>
      <td>
        <ActionProduct id={product._id} />
      </td>
    </tr>
  );
}

export default ProductItem;
