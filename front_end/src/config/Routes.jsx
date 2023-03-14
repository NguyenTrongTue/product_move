import { Fragment } from "react";
import Login from "~/pages/login/Login";

import { Routes, Route, Navigate } from "react-router-dom";
import { storeRoutes } from "./storeRoutes";
import { warrantyRoutes } from "./warrantyRoutes";
import { factoryRoutes } from "./factoryRoutes";
import { adminRoutes } from "./adminRoutes";

import Register from "~/pages/login/Register";
import { useSelector } from "react-redux";
import NotFound from "~/pages/notfound/NotFound";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  ...storeRoutes,
  ...warrantyRoutes,
  ...factoryRoutes,
  ...adminRoutes,
  {
    path: "*",
    component: NotFound,
  },
];

const RoutesApp = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Routes>
      {routes.map((route, index) => {
        const Page = route.component;
        const Layout = route.layout || Fragment;
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Page inputs={route.inputs ? route.inputs : []} />
              </Layout>
            }
          />
        );
      })}
    </Routes>
  );
};
export default RoutesApp;
