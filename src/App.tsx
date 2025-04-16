import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
import { loader as menuLoader } from "./features/menu/Menu";
import NotFound from "./ui/Error";
import { loader as orderLoader } from "./features/order/Order";
import { action as createOrderAction } from "./features/order/CreateOrder";

function App() {
  const route = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound />,

      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <NotFound />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order/new",
          element: <CreateOrder />,
          action: createOrderAction,
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={route} />;
}
export default App;
