import axios from "axios";

axios.defaults.baseURL = "https://s-food-server.up.railway.app";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Accept"] = "application/json";
