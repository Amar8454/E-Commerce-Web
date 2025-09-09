import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import Login from "../component/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import Admin from "../pages/Admin";
import AllUsers from "../pages/AllUsers";
import Products from "../pages/Products";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetiales from "../pages/ProductDetiales";
import ShowCartProduct from "../pages/ShowCartProduct";
import SearchProduct from "../pages/SearchProduct";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/category-product",
        element: <CategoryProduct />,
      },
      {
        path: "/product/:id",
        element: <ProductDetiales />,
      },

      {
        path: "/showCartProduct",
        element: <ShowCartProduct />,
      },

       {
        path: "/search",
        element: <SearchProduct />,
      },

      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            path: "allUsers",
            element: <AllUsers />,
          },
          {
            path: "product",
            element: <Products />,
          },
        ],
      },
    ],
  },
]);

export default router;
