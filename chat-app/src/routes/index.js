import { Suspense, lazy, useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
import { AuthContext } from "../contexts/AuthContext";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={"/auth/login"} />;
    }

    return children;
  };

  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <Register />, path: "register" },
        { element: <ResetPassword />, path: "reset-password" },
        { element: <NewPassword />, path: "Newpassword" },
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        {
          path: "app",
          element: <GeneralApp />,
        },
        { path: "group", element: <Group /> },
        { path: "profile", element: <Profile /> },
        { path: "settings", element: <Settings /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

const Group = Loadable(lazy(() => import("../pages/dashboard/group")));

const Profile = Loadable(lazy(() => import("../pages/dashboard/Profile")));

const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Loginpage")));

const Register = Loadable(lazy(() => import("../pages/auth/register")));

const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

const NewPassword = Loadable(lazy(() => import("../pages/auth/Newpassword")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
