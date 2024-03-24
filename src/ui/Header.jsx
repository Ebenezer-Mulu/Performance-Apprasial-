import React, { useState, useRef, useEffect, useContext } from "react";
import { MdNotifications, MdOutlineChat } from "react-icons/md";
import styled from "styled-components";
import { HiBars3 } from "react-icons/hi2";
import { Avatar } from "./UserAvatar";

import Row from "../ui/Row";
import Sidebar from "./Sidebar";
import SidebarContext from "../context/sidebar-context";
import { Box } from "@mui/material"; // Import Box component from MUI

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-grey-200);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px; /* Add some gap between icons */
`;

const StyledRole = styled.h1`
  text-transform: uppercase;
  margin-left: 20px; 
`;

const StyledEmail = styled.h3``;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-250px")};
  width: 250px;
  height: 100vh;
  background-color: var(--color-grey-100);
  z-index: 999;
  transition: left 0.3s ease-in-out;
`;

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen } = useContext(SidebarContext);
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");
  console.log(email);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    toggleSidebar(!isDrawerOpen);
  };

  const handleClickOutside = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
    
        <StyledHeader>
          <div>
            {" "}
            <HiBars3 onClick={toggleDrawer} />
            <StyledRole>{role}</StyledRole>
          </div>
          <StyledIcon>
            <MdNotifications size={20} />
          <StyledEmail>{email}</StyledEmail>
          <Avatar/>
          </StyledIcon>
          <Drawer open={isDrawerOpen} ref={drawerRef}>
            <Sidebar />
          </Drawer>
        </StyledHeader>
 
    </>
  );
};

export default Header;