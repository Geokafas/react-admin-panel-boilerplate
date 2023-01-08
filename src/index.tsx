import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/authentication/auth-context/AuthContext";
import Dashboard from "./components/dashboard/Dashboard.component";
import Unauthorized from "./components/unauthorized/Unauthorized.component";
import UserLoginPage from "./components/user-login/User-login-page.component";
import NotFound from "./components/Not-found/NotFound.component";
import SettingsPage from "./components/settings/Settings.component";
import RequireAuth from "./components/authentication/components/RequireAuth";
import ReportsPage from "./components/reports/Reports.component";
import { Home } from "./components/home/home.component";
import './index.scss'

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);
const App = () => (
  <Routes>
    <Route path="login" element={<UserLoginPage />} />
    <Route path="unauthorized" element={<Unauthorized />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<Dashboard />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard:id" element={<Home />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </ChakraProvider>
);
//memo: skip rendering the component if its props have not changed
export default React.memo(App);
