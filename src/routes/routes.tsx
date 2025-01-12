import React, { lazy } from "react";

export type TRouteConfig = {
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  children?: TRouteConfig[];
  guard?: React.FC<{ children: JSX.Element }>;
};

const routes: TRouteConfig[] = [
  {
    path: "/",
    component: lazy(() => import("../components/dashboard/Dashboard")),
  },
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
  },
  {
    path: "/activities",
    component: lazy(
      () => import("../components/activities/overview/ActivitiesOverview")
    ),
    guard: lazy(() => import("./authGuard")),
    children: [
      // TODO: fix children not working for activities and for contacts as well
      // {
      //   path: ":id",
      //   component: lazy(
      //     () => import("../components/activities/details/ActivityDetails")
      //   ),
      //   guard: lazy(() => import("./authGuard")),
      // },
      // {
      //   path: "create",
      //   component: lazy(
      //     () => import("../components/activities/form/test")
      //   ),
      //   guard: lazy(() => import("./authGuard")),
      // },
      // {
      //   path: "update/:id",
      //   component: lazy(
      //     () => import("../components/activities/form/ActivityEdit")
      //   ),
      //   guard: lazy(() => import("./authGuard")),
      // },
    ],
  },
  {
    path: "/activities/:id",
    component: lazy(
      () => import("../components/activities/details/ActivityDetails")
    ),
    guard: lazy(() => import("./authGuard")),
  },
  {
    path: "activities/create",
    component: lazy(() => import("../components/activities/form/test")),
    guard: lazy(() => import("./authGuard")),
  },
  {
    path: "activities/update/:id",
    component: lazy(
      () => import("../components/activities/details/ActivityDetails")
    ),
    guard: lazy(() => import("./authGuard")),
  },
  {
    path: "/contacts",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard")),
    // children: [
    //   {
    //     path: ":id",
    //     component: lazy(
    //       () => import("")
    //     ),
    //     guard: lazy(() => import("./authGuard")),
    //   },
    //   {
    //     path: "create",
    //     component: lazy(
    //       () => import("")
    //     ),
    //     guard: lazy(() => import("./authGuard")),
    //   },
    //   {
    //     path: "update/:id",
    //     component: lazy(
    //       () => import("")
    //     ),
    //     guard: lazy(() => import("./authGuard")),
    //   },
    // ],
  },
  {
    path: "/contacts",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard"))
  },
  {
    path: "/contacts/:id",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard"))
  },
  {
    path: "/contacts/create",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard"))
  },
  {
    path: "/contacts/update/:id",
    component: lazy(() => import("../components/contacts/ContactsOverview")),
    guard: lazy(() => import("./authGuard"))
  }
];

export default routes;
