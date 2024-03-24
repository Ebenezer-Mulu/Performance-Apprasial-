import styled from "styled-components";

import MainNav from "./MainNav";

const StyledSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 25rem;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      {/* <Logo /> */}
      <MainNav />
    </StyledSidebar>
  );
};

export default Sidebar;
