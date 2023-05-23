import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.css";
import NavbarMobile from "./Navbar";
import FooterMobile from "./Footer";
import Home from "./Home";
import Shop from "./Shop";
import Detail from "./Detail";
import SelectedCategoryContext from "./SelectedCategoryContext";
import Mybag from "./Mybag";
import Checkout from "./Checkout";
import CheckoutSuccess from "./CheckoutSuccess";
import Favs from "./Favs";
import SignInup from "./SignInUp";
import About from "./About";
import MyAccount from "./MyAccount";
import OrderDetail from "./OrderDetail";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminDiscounts from "./AdminDiscounts";
import AdminForm from "./AdminForm";
import SignInNeeded from "./SignInNeeded";
import fetchSession from "./fetchSession";
import fetchSessionAdmin from "./fetchSessionAdmin";

//Set up React Query config options - set to cache without timeout
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

//Protected route - used for routes that require a session to exist (user to be signed in)
function ProtectedRoute({ component: Component, altpath: Altpath, ...rest }) {
  //Check if session exists
  const { data, status, refetch } = useQuery(["getSession"], fetchSession, {
    cacheTime: 0,
  });
  //Get session status
  const sessionExist = data?.outcome?.message ?? [];

  if (status == "loading") {
    null;
  } else {
    if (sessionExist == "success") {
      return <Component {...rest} />;
    } else {
      return (
        <Navigate
          to={Altpath}
          state={{
            message: "It seems like you are not signed in!",
            redirectUrl: "/",
            refetchFunc: refetch,
          }}
        />
      );
    }
  }
}

//Admin route - used for routes that require a session with admin privs to exist (admin user to be signed in)
function AdminRoute({ component: Component, altpath: Altpath, ...rest }) {
  //Check if session exists
  const { data, status, refetch } = useQuery(
    ["getSessionAdmin"],
    fetchSessionAdmin,
    {
      cacheTime: 0,
    }
  );
  //Get session status
  const sessionExistAdmin = data?.outcome?.message ?? [];

  refetch();

  if (status == "loading") {
    null;
  } else {
    if (sessionExistAdmin == "success") {
      return <Component {...rest} />;
    } else {
      return (
        <Navigate
          to={Altpath}
          state={{
            message: "You don't have admin permissions, sorry!",
            redirectUrl: "/#/admin",
          }}
        />
      );
    }
  }
}

const App = () => {
  const selectedCategory = useState(1);
  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <NavbarMobile />
        <SelectedCategoryContext.Provider value={selectedCategory}>
          <Routes>
            <Route path="/products/category" element={<Shop />} />
            <Route
              path="/bag"
              element={<ProtectedRoute altpath="/oops" component={Mybag} />}
            />
            <Route
              path="/favourites"
              element={<ProtectedRoute altpath="/oops" component={Favs} />}
            />
            <Route
              path="/checkout"
              element={<ProtectedRoute altpath="/oops" component={Checkout} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<SignInup />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute altpath="/login" component={MyAccount} />
              }
            />
            <Route path="/products/detail" element={<Detail />} />
            <Route path="/order/detail" element={<OrderDetail />} />
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
            <Route
              path="/admin"
              element={<AdminRoute altpath="/oops" component={AdminHome} />}
            />
            <Route
              path="/admin/products"
              element={<AdminRoute altpath="/oops" component={AdminProducts} />}
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute altpath="/oops" component={AdminCategories} />
              }
            />
            <Route
              path="/admin/discounts"
              element={
                <AdminRoute altpath="/oops" component={AdminDiscounts} />
              }
            />
            <Route
              path="/admin/form"
              element={<AdminRoute altpath="/oops" component={AdminForm} />}
            />
            <Route path="/oops" element={<SignInNeeded />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </SelectedCategoryContext.Provider>
        <FooterMobile />
      </QueryClientProvider>
    </HashRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
