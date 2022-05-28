import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import Page404 from "./pages/Page404";
import { routes } from "./routes";
import { checkAuthenticated } from "./store/api";
// import "./utils/request";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.login.currentUser?.token);

  axios.interceptors.request.use((config) => {
    let now = new Date().getTime() / 1000;
    let token_exp = token ? jwt_decode(token).exp : null;
    if (token_exp && token_exp < now) {
      checkAuthenticated(dispatch);
    }
    config.headers = {
      Authorization: "Bearer " + token || "",
    };
    return config;
  });
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          let Page = route.component;
          let path = route.path;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        <Route path="/*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
