import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiOutlineHome } from "react-icons/hi";
import {
  FaBuilding,
  FaFolderOpen,
  FaUserPlus,
  FaCog,
  FaSearch,
} from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { useUser } from "../features/authentication/useUser";

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
  const { user } = useUser();
  const links = {
    admin: [
      { path: "/admin", title: "Home", icon: <HiOutlineHome /> },
      { path: "/admin/colleges", title: "Colleges", icon: <FaBuilding /> },
      {
        path: "/admin/departments",
        title: "Departments",
        icon: <FaFolderOpen />,
      },
      { path: "/admin/users", title: "Users", icon: <MdPeople /> },
    ],

    teamLeader: [
      { path: "/teamleader/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/teamleader/Userss", title: "Users", icon: <MdPeople /> },
      { path: "/teamleader/TmEvaluate", title: "Evaluate" },
      { path: "/teamleader/TmApprove", title: "Approve" },
    ],
    hr: [
      { path: "/hr/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/hr/user", title: "Add User", icon: <FaUserPlus /> },
      { path: "/hr/criteria", title: "Criterias", icon: <FaSearch /> },
      { path: "/hr/cycle", title: "Cycle", icon: <FaSearch /> },
    ],
    head: [
      { path: "/head/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/head/courses", title: "courses", icon: <FaUserPlus /> },

      { path: "/head/evaluate", title: "evaluate", icon: <FaSearch /> },
      { path: "/head/approve", title: "Approve", icon: <FaSearch /> },
    ],
  };

  const commonLinks = [
    { path: "/settings", title: "Settings", icon: <FaCog /> },
  ];

  const roleLinks = links[user.role];

  return (
    <nav>
      <NavList>
        {roleLinks.map((link, index) => (
          <li key={index}>
            <StyledNavLink to={link.path} activeClassName="active">
              {link.icon}
              {link.title}
            </StyledNavLink>
          </li>
        ))}
        {commonLinks.map((link, index) => (
          <li key={index}>
            <StyledNavLink
              to={link.path}
              activeClassName="active"
              onClick={link.onClick}
            >
              {link.icon}
              {link.title}
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
};

export default MainNav;
