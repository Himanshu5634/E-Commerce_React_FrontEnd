import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./App/Store.js";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category/Category.jsx";
import ProductDetail from "./Components/Products/productDetails/ProductDetail.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Order from "./pages/order/Order.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element:<Home/>
      },      {
        path: "/home",
        element:<Home/>
      },
      {
        path: "categories",
        element:<Category/>
      },
      {
        path:"cart",
        element:<Cart />
      }
    ],
  },
  {
    path:"/product/:productId",
    element:<ProductDetail />
  },
  {
    path:"/home/product/:productId",
    element:<ProductDetail />
  },
  {
    path:"/categories/product/:productId",
    element:<ProductDetail />
  },
  {
    path:"/order",
    element:<Order />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
