import React from "react";
import Modal from "./Modal";

const NotificationsModal = ({ onClose, notifications }) => {
  return (
    <Modal onClose={onClose}>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </Modal>
  );
};

export default NotificationsModal;
