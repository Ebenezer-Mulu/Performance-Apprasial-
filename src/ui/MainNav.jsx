import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";
import {
  FaBuilding,
  FaFolderOpen,
  FaUserPlus,
  FaCog,
  FaUserFriends,
  FaUsers,
  FaSearch,
  FaChartBar,
} from "react-icons/fa";
import { MdPeople } from "react-icons/md";

import { HiOutlineLogout } from "react-icons/hi";
import { Assessment } from "@mui/icons-material";
import { Loop } from "@mui/icons-material";

import { useUser } from "../features/authentication/useUser";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--color-grey-600);
  font-size: 1.6rem;
  font-weight: 500;
  padding: 1.2rem 2.4rem;
  transition: all 0.3s;

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

const SubmenuContainer = styled.div`
  padding-left: 3.2rem;
`;

const SubmenuToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
`;

const MainNav = () => {
  const { user } = useUser();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

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
      { path: "/teamleader/Users", title: "Add User", icon: <FaUserPlus /> },

      { path: "/teamleader/TmResult", title: "Result", icon: <FaUserPlus /> },
    ],
    hr: [
      { path: "/hr/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/hr/user", title: "Add User", icon: <FaUserPlus /> },
      { path: "/hr/criteria", title: "Criterias", icon: <Assessment /> },
      { path: "/hr/cycle", title: "Cycle", icon: <Loop /> },
      { path: "/admin/users", title: "Users", icon: <Loop /> },
      

    ],
    head: [
      { path: "/head/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/head/courses", title: "Courses", icon: <FaUserPlus /> },
      { path: "/head/approve", title: "Approve", icon: <FaSearch /> },
    ],
    student: [
      { path: "/student/dashboard", title: "Home", icon: <HiOutlineHome /> },
    ],
    administrative: [
      {
        path: "/administrative/dashboard",
        title: "Home",
        icon: <HiOutlineHome />,
      },
    ],
    academic: [
      { path: "/academic/dashboard", title: "Home", icon: <HiOutlineHome /> },
    ],
    instructor: [
      { path: "/instructor/dashboard", title: "Home", icon: <HiOutlineHome /> },
    ],
    assistance: [
      { path: "/assistance/dashboard", title: "Home", icon: <HiOutlineHome /> },
    ],
    director: [
      { path: "/director/dashboard", title: "Home", icon: <HiOutlineHome /> },
    ],
  };

  const commonSection = [
    {
      title: "Evaluate",
      icon: <FaChartBar />,
      submenu: [
        { path: "/evaluate/peer", title: "Peer", icon: <FaUserFriends /> },
        { path: "/evaluate/subordinate", title: "Subordinate", icon: <FaUsers /> },
        { path: "/evaluate/self", title: "Self", icon: <FaUserFriends /> },
        { path: "/evaluate/instructor", title: "Instructor", icon: <FaUserFriends /> },
      ],
    },
  ];

  const roleLinks = {
    admin: [
      ...(links.admin || []),
      
    ],
    teamLeader: [
      ...(links.teamLeader || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title !== "Instructor"
        ),
      },
    ],
    director: [
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title !== "Instructor"
        ),
      },
    ],
    hr: [...(links.hr || [])],
    head: [
      ...(links.head || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) =>
            sublink.title !== "Instructor" && sublink.title !== "Self"
        ),
      },
    ],
    student: [
      ...(links.student || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title === "Instructor"
        ),
      },
    ],
    dean: [
      ...(links.dean || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) =>
            sublink.title !== "Instructor" && sublink.title !== "Self"
        ),
      },
    ],
    administrative: [
      ...(links.administrative || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) =>
            sublink.title !== "Instructor" && sublink.title !== "Subordinate"
        ),
      },
    ],
    academic: [
      ...(links.academic || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title === "Peer"
        ),
      },
    ],
    instructor: [
      ...(links.instructor || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title === "Peer"
        ),
      },
    ],
    assistance: [
      ...(links.assistance || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title === "Peer"
        ),
      },
    ],
    director: [
      ...(links.director || []),
      {
        ...commonSection[0],
        submenu: commonSection[0].submenu.filter(
          (sublink) => sublink.title !== "Instructor"
        ),
      },
    ],
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <nav>
      <NavList>
        {(roleLinks[user.role] || []).map((link, index) => (
          <li key={index}>
            {link.submenu ? (
              <>
                <SubmenuToggle onClick={toggleSubmenu}>
                  <StyledNavLink to={link.path} activeClassName="active">
                    {link.icon}
                    <div>{link.title}</div>
                  </StyledNavLink>
                </SubmenuToggle>
                {isSubmenuOpen && (
                  <SubmenuContainer>
                    {link.submenu.map((sublink, subIndex) => (
                      <StyledNavLink
                        key={subIndex}
                        to={sublink.path}
                        activeClassName="active"
                      >
                        {sublink.icon}
                        {sublink.title}
                      </StyledNavLink>
                    ))}
                  </SubmenuContainer>
                )}
              </>
            ) : (
              <StyledNavLink to={link.path} activeClassName="active">
                {link.icon}
                {link.title}
              </StyledNavLink>
            )}
          </li>
        ))}
      </NavList>
    </nav>
  );
};

export default MainNav;
