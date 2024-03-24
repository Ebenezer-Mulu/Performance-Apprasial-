import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const UserRoleContext = createContext();

export const useUserRole = () => {
  return useContext(UserRoleContext);
};

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");

  const setRole = (role) => {
    setUserRole(role);

  };

  return (
    <UserRoleContext.Provider value={{ userRole, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

UserRoleProvider.propTypes = {
  children: PropTypes.node, // Corrected the PropTypes definition
};
