import React, { useCallback, useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/user/actions";
import { auth } from "./firebase/config";
import { createShopAdminProfile } from "./firebase/auth";

// COMPONENTS
import Spinner from "./components/common/Spinner/Spinner";

// PAGES
import AdminDashboard from "./screens/admin/Dashboard/Dashboard";
import CashierDashboard from "./screens/cashier/Dashboard/Dashboard";
import Login from "./screens/common/Login/Login";
import Register from "./screens/common/Register/Register";
import NotFound from "./screens/common/NotFound/NotFound";

// STYLES
import "./App.scss";
import AuthLayout from "./components/common/Layout/Layout";

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const checkUser = useCallback(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await createShopAdminProfile(userAuth);
          userRef.onSnapshot((snapShot) => {
            const data = { id: snapShot.id, ...snapShot.data() };
            dispatch(setCurrentUser(data));
            data.emailVerified === false &&
              userAuth.emailVerified === true &&
              snapShot.ref.update({ emailVerified: true });
            setLoading(false);
          });
        } catch (error) {
          setLoading(false);
          console.log("catch");
          console.log("here", error.message);
        }
      } else {
        setLoading(false);
      }
    });
  }, [dispatch]);
  useEffect(() => {
    checkUser();
    if (!JSON.parse(sessionStorage.getItem("reauthenticate"))) {
      sessionStorage.setItem(
        "reauthenticate",
        JSON.stringify({ status: false })
      );
    }
  }, [checkUser, dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          if (currentUser && currentUser.hasSubcribedBefore) {
            return currentUser && currentUser.role === "admin" ? (
              <AdminDashboard />
            ) : currentUser && currentUser.role === "cashier" ? (
              <CashierDashboard />
            ) : (
              <Redirect to={`/login`} />
            );
          } else {
            return <Redirect to={`/register`} />;
          }
        }}
      />
      <Route
        path="/login"
        render={() =>
          currentUser && currentUser.hasSubcribedBefore ? (
            <Redirect to={`/`} />
          ) : (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        }
      />

      <Route
        path="/register"
        render={() =>
          currentUser && currentUser.hasSubcribedBefore ? (
            <Redirect to={`/`} />
          ) : (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      />
      <Route render={() => <NotFound />} />
    </Switch>
  );
};

export default withRouter(App);
