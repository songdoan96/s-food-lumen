import { AdminDashboard, AdminOrder, AdminOrderDetail } from "../pages/Admin";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { UserOrder, UserOrderDetail } from "../pages/User";
import Register from "../pages/Register";
const routes = [
  // Public
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },

  // Auth/User
  { path: "/cart", component: Cart },
  { path: "/order", component: UserOrder },
  { path: "/order/:id", component: UserOrderDetail },

  // Admin
  { path: "/admin", component: AdminDashboard },
  { path: "/admin/order", component: AdminOrder },
  { path: "/admin/order/:id", component: AdminOrderDetail },
];

export { routes };
