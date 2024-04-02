import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminColleges from "./pages/admin/Colleges";
import AdminDepartments from "./pages/admin/Departments";
import Users from "./pages/admin/Users";
import AssignRole from "./pages/admin/assignRole";
import AddCollege from "./pages/admin/addCollege";
import AddDepartment from "./pages/admin/addDepartment";

import UpdatePasswordForm from "./features/authentication/UpdatePasswordForm";
import ForgotPassword from "./pages/ForgotPassword";

// Import your HR pages here
import HRDashboard from "./pages/hr/dashboard";
import AddUser from "./pages/hr/user";
import Criteria from "./pages/hr/criteria";
import AddCriteria from "./pages/hr/addCriteria";

// Import your Head pages here
import HeadDashboard from "./pages/head/dashboard";
import AddCourse from "./pages/head/addCourse";
import Courses from "./pages/head/courses";
import Evaluate from "./pages/head/evaluate";
import Approve from "./pages/head/approve";
import ProtectedRoute from "./ui/ProtectedRoute";


// Import your Teamleadre pages here
import TeamleaderDashboard from "./pages/teamleader/dashboard";
import TmApprove from "./pages/teamleader/TmApprove";
import TmEvaluate from "./pages/teamleader/TmEvaluate";
import Userss from "./pages/teamleader/Userss";

// Import other pages here

import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";

import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context/DarkModeContext";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <DarkModeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="colleges" element={<AdminColleges />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="users" element={<Users />} />
                <Route path="assignRole" element={<AssignRole />} />
                <Route path="addCollege" element={<AddCollege />} />
                <Route path="addDepartment" element={<AddDepartment />} />
              </Route>

              <Route path="hr">
                <Route path="dashboard" element={<HRDashboard />} />
                {/* <Route path="/hr/appraisal" element={<Appraisal />} /> */}
                <Route path="user" element={<AddUser />} />
                <Route path="criteria" element={<Criteria />} />
                <Route path="addCriteria" element={<AddCriteria />} />
              </Route>

              <Route path="settings" />
              <Route path="account" />

              <Route path="head">
                <Route path="dashboard" element={<HeadDashboard />} />
                <Route path="addCourse" element={<AddCourse />} />
                <Route path="courses" element={<Courses />} />
                <Route path="evaluate" element={<Evaluate />} />
                <Route path="approve" element={<Approve />} />
              </Route>

              <Route path="teamleader">
                <Route path="dashboard" element={<TeamleaderDashboard />} />
                <Route path="users" element={<Userss />} />
                <Route path="evaluate" element={<TmEvaluate />} />
                <Route path="approve" element={<TmApprove />} />
              </Route>

            </Route>
            <Route path="login" element={<Login />} />
            <Route
              path="reset-Password/:token"
              element={<UpdatePasswordForm />}
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default App;
