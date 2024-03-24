import { useContext, useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box } from "@mui/material";
import SidebarContext from "../context/sidebar-context";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  transition: grid-template-columns 0.3s ease-in-out;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 10rem 4.8rem 6.4rem;
`;

const AppLayout = () => {
  const { isSidebarOpen } = useContext(SidebarContext);

  return (
    <StyledAppLayout isDrawerOpen={isSidebarOpen}>
      
      <Header isDrawerOpen={isSidebarOpen} />
      <Main>
        <Box
          sx={{
            ml: isSidebarOpen ? "0" : "280px",
            transition: "0.3s",
          }}
        >
          <Outlet />
        </Box>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout