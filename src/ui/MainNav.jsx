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
  FaSearch,
} from "react-icons/fa";
import { MdPeople } from "react-icons/md";
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
  padding-left: 2.4rem;
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
      { path: "/teamleader/Userss", title: "Users", icon: <MdPeople /> },
      { path: "/teamleader/TmEvaluate", title: "Evaluate", icon: <FaSearch /> },
      { path: "/teamleader/TmApprove", title: "Approve", icon: <FaSearch /> },
    ],
    hr: [
      { path: "/hr/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/hr/user", title: "Add User", icon: <FaUserPlus /> },
      { path: "/hr/criteria", title: "Criterias", icon: <FaSearch /> },
    ],
    head: [
      { path: "/head/dashboard", title: "Home", icon: <HiOutlineHome /> },
      { path: "/head/courses", title: "Courses", icon: <FaUserPlus /> },
      { path: "/head/approve", title: "Approve", icon: <FaSearch /> },
    ],
  };

  const commonSection = [
    {
      title: "Evaluate",
      submenu: [
        { path: "/evaluate/add-peer", title: "Add Peer" },
        { path: "/evaluate/add-instructor", title: "Add Instructor" },
      ],
      icon: <FaSearch />,
    },
  ];

  // Merge common section with role-specific links for each role
  const roleLinks = {
    ...links,
    admin: [...(links.admin || []), ...commonSection],
    teamLeader: [...(links.teamLeader || []), ...commonSection],
    hr: [...(links.hr || []), ...commonSection],
    head: [...(links.head || []), ...commonSection],
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
                  <StyledNavLink to="#" activeClassName="active">
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
