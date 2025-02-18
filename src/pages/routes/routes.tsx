import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "../errorPage";
import RootPage from "../rootPage";
import { ERouteNames } from "@/shared";
import { lazy, Suspense } from "react";
import { privatePage } from "@/entities/viewer/libs/hoc/privatePage";
import { routesWithHoc } from "./routesWithHoc";
import { publicPage } from "@/entities/viewer/libs/hoc/publicPage";

const AuthPage = lazy(() => import("@pages/authPage"));
const LoginPage = lazy(() => import("@pages/loginPage"));

const ChatPage = lazy(() => import("@pages/chatPage"));

const ChatDetailPage = lazy(() => import("@pages/chatDetailPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      ...routesWithHoc(privatePage, [
        {
          path: "",
          element: <Navigate to={ERouteNames.CHAT_ROUTE} replace />,
        },
        {
          path: ERouteNames.CHAT_ROUTE,
          element: <ChatPage />,
        },
        {
          path: ERouteNames.CHAT_DETAIL_ROUTE,
          element: <ChatDetailPage />,
        },
      ]),
    ],
  },
  {
    path: ERouteNames.AUTH_ROUTE,
    element: (
      <Suspense fallback={<div className="h-screen w-full">Loading..</div>}>
        <AuthPage />
      </Suspense>
    ),
    children: [
      ...routesWithHoc(publicPage, [
        {
          path: "",
          element: <Navigate to={ERouteNames.REGISTER_ROUTE} replace />,
        },
        {
          path: ERouteNames.REGISTER_ROUTE,
          element: <LoginPage />,
        },
      ]),
    ],
  },
]);
