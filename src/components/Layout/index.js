import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../../store/toastSlice";
import Header from "../Header";

function Layout({ children }) {
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();
  return (
    <div>
      <Header />
      <div className="content">{children}</div>

      {toast.show && (
        <ToastContainer className="p-3" position={toast.position}>
          <Toast
            onClose={() => dispatch(hideToast())}
            show={toast.show}
            delay={toast.delay}
            autohide
          >
            <Toast.Header closeButton={true}>
              <strong className={`me-auto text-${toast.type}`}>{toast.type.toUpperCase()}</strong>
            </Toast.Header>
            <Toast.Body className={`text-${toast.type}`}>{toast.message}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </div>
  );
}

export default Layout;
