import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "", element: <TopPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignUpPage /> },
        { path: "verification-notice", element: <VerificationNotice /> },
        { path: "verify/:token", element: <EmailVerify /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        //     { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "home", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "conversation", element: <Conversation /> },
        { path: "chats", element: <Chats /> },
        { path: "phonebook", element: <Phonebook /> },
        // { path: "contact", element: <Contact /> },
        { path: "profile", element: <Profile /> },
        //     { path: "404", element: <Page404 /> },
        //     { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Conversation = Loadable(
  lazy(() => import("../pages/dashboard/Home/Conversation"))
);
const Chats = Loadable(lazy(() => import("../pages/dashboard/Home/Chats")));

const Phonebook = Loadable(
  lazy(() => import("../pages/dashboard/Phonebook"))
);
// const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const SignUpPage = Loadable(lazy(() => import("../pages/auth/SignUp")));
const TopPage = Loadable(lazy(() => import("../pages/auth/Top")));
const EmailVerify = Loadable(lazy(() => import("../pages/auth/EmailVerify")))
const VerificationNotice = Loadable(lazy(() => import("../pages/auth/VerificationNotice")))
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);

// Settings
// const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings"))
);
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Settings/Profile"))
);