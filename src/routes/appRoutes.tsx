import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes, { RouteConfig } from "./routes";
import AppLayout from "../AppLayout";

const renderRoutes = (routeConfigs: RouteConfig[]) =>
  routeConfigs.map(({ path, component: Component, children, guard: Guard }) => {
    const element = (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    );

    return (
      <Route
        key={path}
        path={path}
        element={Guard ? <Guard>{element}</Guard> : element}
      >
        {children && renderRoutes(children)}
      </Route>
    );
  });

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>{renderRoutes(routes)}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
