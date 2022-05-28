import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="d-flex flex-column vh-100 align-items-center justify-content-center">
      <h1>Không tìm thấy trang</h1>
      <Link to="/" className="btn btn-info">
        Tới trang chủ
      </Link>
    </div>
  );
};

export default Page404;
