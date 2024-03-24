import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome } from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const MainNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (clear user session, etc.)
    // For example:
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    // Redirect to login page after logout
    navigate("/login");
  };

  const role = localStorage.getItem("role");

  const links = {
    admin: [
      { path: "/admin/dashboard", title: "Home" },
      { path: "/admin/colleges", title: "Colleges" },
      { path: "/admin/departments", title: "Departments" },
      { path: "/admin/users", title: "Users" },

    ],
    user: [
      { path: "/user/dashboard", title: "Home" },
      { path: "/user/colleges", title: "Colleges" },
      { path: "/user/departments", title: "Departments" },
      { path: "/users", title: "Users" },
    ],
    dean: [
      { path: "/dean/dashboard", title: "Home" },
      { path: "/departments", title: "Departments" },
    ],
    head: [
      { path: "/head/dashboard", title: "Home" },
      { path: "/head/courses", title: "Courses" },
      { path: "/head/evaluate", title: "Evaluate" },
      { path: "/head/approve", title: "Approve" },
    ],
    hr: [
      { path: "/hr/dashboard", title: "Home" },
      { path: "/hr/user", title: "Add user" },
      { path: "/hr/criteria", title: " Criterias" },
      //   { path: "/hr/appraisal/reports", title: "Appraisal Reports" },
    ],
  };

  // Add logout link for all roles
  const CommonLinks = [
    { path: "/settings", title: "Settings" },
    { path: "/login", title: "Logout" },
  
  ];

  const roleLinks = links[role] || [];

  return (
    <nav>
      <NavList>
        {roleLinks.map((link, index) => (
          <li key={index}>
            <StyledNavLink to={link.path} activeClassName="active">
              <HiOutlineHome />
              {link.title}
            </StyledNavLink>
          </li>
        ))}

        {CommonLinks.map((link, index) => (
          <li key={index}>
            <StyledNavLink
              to={link.path}
            
              activeClassName="active"
            >
              <HiOutlineHome />
              {link.title}
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
};

export default MainNav;
