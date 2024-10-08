import Protected from "@/components/auth/Protected";
import Chat, { Defult } from "@/components/Right/Right";
import { SocketProvider } from "@/hooks/socket";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Homepage from "../pages/HomePage";
const SigninPage = lazy(() => import("../pages/SigninPage"));
const GroupDetails = lazy(
  () => import("@/components/settingPage/GroupDetails")
);
const SignupPage = lazy(() => import("../pages/SignupPage"));
const SettingPage = lazy(() => import("../pages/SettingPage"));
const CreateGroup = lazy(() => import("../components/settingPage/CreateGroup"));
const ManageGroup = lazy(() => import("../components/settingPage/ManageGroup"));
// import SigninPage from "../pages/SigninPage";
const General = lazy(() => import("../components/settingPage/General"));
export default function Routes() {
  
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: (
            <Protected authentication={true}>
              <>
                <SocketProvider>
                  <Homepage>
                    <Defult />
                  </Homepage>
                </SocketProvider>
              </>
            </Protected>
          ),
        },
        {
          path: "/signin",
          element: (
            <Protected authentication={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <SigninPage />
              </Suspense>
            </Protected>
          ),
        },
        {
          path: "/signup",
          element: (
            <Protected authentication={false}>
              <Suspense fallback={<div>Loading...</div>}>
                <SignupPage />
              </Suspense>
            </Protected>
          ),
        },
        {
          path: "/settings",
          element: (
            <Protected authentication={true}>
              <SocketProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  <SettingPage />
                </Suspense>
              </SocketProvider>
            </Protected>
          ),
          children: [
            { index: true, element: <Navigate to="general" replace /> },
            {
              path: "general",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <General />
                </Suspense>
              ),
            },
            {
              path: "manage-groups",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ManageGroup />
                </Suspense>
              ),
            },
            {
              path: "manage-groups/create",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <CreateGroup />
                </Suspense>
              ),
            },
            {
              path: "manage-groups/details/:id",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <GroupDetails />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "/chat/:name/:id",

          element: (
            <Protected authentication={true}>
              <>
                <SocketProvider>
                  <Homepage>
                    <Chat />
                  </Homepage>
                </SocketProvider>
              </>
            </Protected>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
