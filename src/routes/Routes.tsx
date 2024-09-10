import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "../App";
import Homepage from "../pages/HomePage";
import General from "@/components/settingPage/General";
import ManageGroup from "@/components/settingPage/components/ManageGroup";
const SigninPage = lazy(() => import("../pages/SigninPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const SettingPage = lazy(() => import("../pages/SettingPage"));
// import SigninPage from "../pages/SigninPage";

export default function Routes() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/signin",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SigninPage />
            </Suspense>
          ),
        },
        {
          path: "/signup",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SignupPage />
            </Suspense>
          ),
        },
        { 
          path: "/settings", 
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SettingPage />
            </Suspense>
          ),
          children: [
            { index: true, element: <Navigate to="general" replace /> },
            { path: "general", element: <General /> },
            { path: "manage-groups", element: <ManageGroup /> },
          ]
        }
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
