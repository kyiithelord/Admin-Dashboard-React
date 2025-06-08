import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar";
import Pie from "./scenes/pie";
import Line from "./scenes/line";
import Geography from "./scenes/geography";
import Register from "./scenes/register";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./scenes/login";
import Profile from "./scenes/profile";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const isAdmin = loggedInUser?.role === "admin";
  const isUser = loggedInUser?.role === "user";
  // On app start: ensure admin user exists in localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const adminExists = users.some((u) => u.role === "admin");
  if (!adminExists) {
    users.push({
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  const adminPaths = [
    "/",
    "/team",
    "/contacts",
    "/invoices",
    "/form",
    "/calendar",
    "/faq",
    "/bar",
    "/pie",
    "/line",
    "/geography",
  ];

  // Show sidebar/topbar only if admin and on admin path
  const showSidebarAndTopbar = isAdmin && adminPaths.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {showSidebarAndTopbar && <Sidebar />}
          <main className="content">
            {showSidebarAndTopbar && <Topbar />}
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Profile route for all logged-in users */}
              {loggedInUser && (
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              )}

              {/* Admin routes */}
              {isAdmin && (
                <>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/team"
                    element={
                      <PrivateRoute>
                        <Team />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/contacts"
                    element={
                      <PrivateRoute>
                        <Contacts />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/invoices"
                    element={
                      <PrivateRoute>
                        <Invoices />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/form"
                    element={
                      <PrivateRoute>
                        <Form />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/calendar"
                    element={
                      <PrivateRoute>
                        <Calendar />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/faq"
                    element={
                      <PrivateRoute>
                        <FAQ />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/bar"
                    element={
                      <PrivateRoute>
                        <Bar />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/pie"
                    element={
                      <PrivateRoute>
                        <Pie />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/line"
                    element={
                      <PrivateRoute>
                        <Line />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/geography"
                    element={
                      <PrivateRoute>
                        <Geography />
                      </PrivateRoute>
                    }
                  />
                </>
              )}

              {/* User routes: redirect everything except /profile to /profile */}
              {isUser && (
                <>
                  <Route path="*" element={<Navigate to="/profile" replace />} />
                </>
              )}

              {/* If no user logged in, redirect all to /login */}
              {!loggedInUser && (
                <>
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
