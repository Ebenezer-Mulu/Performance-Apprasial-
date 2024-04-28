import React, { useState } from "react";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";
import NotificationsModal from "./NotificationsModal";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New message received" },
    { id: 2, message: "Reminder: Meeting tomorrow" },
    { id: 3, message: "You have a new follower" },
  ]);
  const navigate = useNavigate();

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={toggleNotifications}>
          <BsBell />
        </ButtonIcon>
        {showNotifications && (
          <NotificationsModal
            notifications={notifications}
            onClose={toggleNotifications}
          />
        )}
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
