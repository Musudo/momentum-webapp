import React, { lazy } from "react";

export type RouteConfig = {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  children?: RouteConfig[];
  guard?: React.FC<{ children: JSX.Element }>;
};

const routes: RouteConfig[] = [
  // {
  //   path: "/",
  //   component: lazy(() => import("")),
  // },
  {
    path: "/signIn",
    component: lazy(() => import("../components/authentication/signIn/SignIn")),
  },
  {
    path: "/signUp",
    component: lazy(() => import("../components/authentication/signUp/SignUp")),
  },
  {
    path: "*",
    component: lazy(() => import("../components/NotFound")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("../components/dashboard/Dashboard")),
    guard: lazy(() => import("./authGuard")),
    children: [
      //...
    ],
  },
  {
    path: "/activities",
    component: lazy(
      () => import("../components/activities/overview/ActivitiesOverview")
    ),
    guard: lazy(() => import("./authGuard")),
    children: [
      {
        path: "details/:id",
        component: lazy(
          () => import("../components/activities/details/ActivityDetails")
        ),
        guard: lazy(() => import("./authGuard")),
      },
      {
        path: "create",
        component: lazy(
          () => import("../components/activities/form/ActivityCreate")
        ),
        guard: lazy(() => import("./authGuard")),
      },
      {
        path: "update/:id",
        component: lazy(
          () => import("../components/activities/form/ActivityEdit")
        ),
        guard: lazy(() => import("./authGuard")),
      },
    ],
  },
  {
    path: "/contacts",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard")),
    children: [
      {
        path: "details/:id",
        component: lazy(
          () => import("../components/activities/details/ActivityDetails")
        ),
        guard: lazy(() => import("./authGuard")),
      },
      {
        path: "create",
        component: lazy(
          () => import("../components/activities/form/ActivityCreate")
        ),
        guard: lazy(() => import("./authGuard")),
      },
      {
        path: "update/:id",
        component: lazy(
          () => import("../components/activities/form/ActivityEdit")
        ),
        guard: lazy(() => import("./authGuard")),
      },
    ],
  },
];

export default routes;
