import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminColleges from "./pages/admin/Colleges";
import AdminDepartments from "./pages/admin/Departments";
import Users from "./pages/admin/Users";
import AssignRole from "./pages/admin/AssignRole";
import AddCollege from "./pages/admin/addCollege";
import AddDepartment from "./pages/admin/addDepartment";

import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
//import DeanDashboard from "./pages/dean/dashboard";

import HRDashboard from "./pages/hr/dashboard";
import AddUser from "./pages/hr/User";
import Criteria from "./pages/hr/criteria";
import AddCriteria from "./pages/hr/addCriteria";

import HeadDashboard from "./pages/head/dashboard";
import AddCourse from "./pages/head/addCourse";
import Courses from "./pages/head/courses";
import Evaluate from "./pages/head/evaluate";
import Approve from "./pages/head/approve";

import Account from "./pages/Account";
import AppLayout from "./ui/AppLayout";
import { UserRoleProvider } from "./features/authentication/UserRoleContext";
import { SidebarProvider } from "./context/sidebar-context";


const App = () => {
  return (
    <>
      <GlobalStyles />
      <UserRoleProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <SidebarProvider>
                  <AppLayout />
                </SidebarProvider>
              }
            >
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/colleges" element={<AdminColleges />} />
              <Route path="admin/departments" element={<AdminDepartments />} />
              <Route path="admin/users" element={<Users />} />
              <Route path="admin/assignRole" element={<AssignRole />} />
              <Route path="admin/addCollege" element={<AddCollege />} />
              <Route path="admin/addDepartment" element={<AddDepartment />} />

              <Route path="/hr/dashboard" element={<HRDashboard />} />
              {/* <Route path="/hr/appraisal" element={<Appraisal />} /> */}
              <Route path="/hr/user" element={<AddUser />} />
              <Route path="/hr/criteria" element={<Criteria />} />
              <Route path="/hr/addCriteria" element={<AddCriteria />} />

              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />

              <Route path="head/addCourse" element={<AddCourse />} />
              <Route path="/head/dashboard" element={<HeadDashboard />} />
              <Route path="/head/courses" element={<Courses />} />
              <Route path="/head/evaluate" element={<Evaluate />} />
              <Route path="/head/approve" element={<Approve />} />
            </Route>
            <Route index element={<Navigate replace to="login" />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserRoleProvider>
    </>
  );
};

export default App;
