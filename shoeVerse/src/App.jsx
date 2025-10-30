import { Route, Routes } from "react-router-dom";
import { Home } from "./HOME/Home";
import Register from "./sign log/Register";
import Cart from "./navbar/Cart";
import WishList from "./navbar/WishList";
import Orders from "./navbar/Orders";
import Men from "./navbar/Men";
import Women from "./navbar/Women";
import Trending from "./Main/Trending";
import Collection from "./navbar/Collection";
import ProductDetail from "./product/ProductDetail";
import Login from "./sign log/Login";
import Payment from "./product/Payment";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/dashboard/Users";
import OrdersAdmin from "./Admin/dashboard/OrdersAdmin";
import ProductDetailsAdmin from "./Admin/dashboard/ProductDetailsAdmin";
import AddProducts from "./Admin/AddProducts";
import ProtectedRoute from "./sign log/ProtectedRoute";
import AuthRoute from "./Context/authroute";
import {Toaster} from "react-hot-toast"


function App() {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          }
        />

        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<Users />} />
          <Route path="ordersAdmin" element={<OrdersAdmin />} />
          <Route path="productDetailsAdmin" element={<ProductDetailsAdmin />} />
          <Route path="addproduct" element={<AddProducts />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute role="user">
              <WishList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/women/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/men/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
