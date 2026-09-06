import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import SignUp from "./pages/AuthenticationPages/SignUp";
import Login from "./pages/AuthenticationPages/Login";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/ContactUs";
import Policy from "./pages/PolicyPage";
import Error from "./pages/ErrorPage";
import PrivateRoute from "./components/ProtectedRoutes/Private";

import AdminRoute from "./components/ProtectedRoutes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/ShowUser";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      {/* Routes for All pages here  */}
      <Routes>
        {/* Single route */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Protecting user dashboard route to authentication of JWT token once authenticated directed to userdashboard directly */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>


        {/* Protecting Admin dashboard route to authentication of JWT token once authenticated then admin role is authenticated then directed to admin dashboard directly */}

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          {/* <Route path="admin/users" element={<Users />} /> */}
          <Route path="admin/orders" element={<AdminOrders />} />

        </Route>

        {/* local pages routes  */}
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />


        {/* *tells that if all above pages not found then show error page */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;