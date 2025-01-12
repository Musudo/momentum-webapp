import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes, { TRouteConfig } from "./routes";
import AppLayout from "../AppLayout";

const renderRoutes = (routeConfigs: TRouteConfig[]) =>
  routeConfigs.map(({ path, component: Component, children, guard: Guard }) => {
    const element = (
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    );

    return (
      <Route element={<AppLayout />}>
        <Route
          key={path}
          path={path}
          element={Guard ? <Guard>{element}</Guard> : element}
        >
          {children && renderRoutes(children)}
        </Route>
      </Route>
    );
  });

const CreateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>{renderRoutes(routes)}</Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CreateRoutes;
