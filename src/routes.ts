import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/Login";
import WelcomePage from "./pages/Welcome";
import ProductDetailPage from "./pages/ProductDetail";
import TransactionHistoryPage from "./pages/TransactionHistory";
import PageLayout from "./components/common/PageLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PageLayout,
    children: [
      {
        index: true,
        Component: WelcomePage,
      },
      {
        path: "welcome",
        Component: WelcomePage,
      },
      {
        path: "deals/:id",
        Component: ProductDetailPage,
      },
      {
        path: "product/:id",
        Component: ProductDetailPage,
      },
      {
        path: "history",
        Component: TransactionHistoryPage,
      },
      {
        path: "transactions",
        Component: TransactionHistoryPage,
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
  },
]);
