import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";

const StyledTableContainer = styled.div`
  width: fit-content;
  height: 100%;
  overflow-x: auto; /* Enable horizontal scrolling for smaller screens */
`;

const StyledTable = styled.div`
  width: 100%;
  height: 100%;
`;

const Table = ({ columns, rows }) => {
  return (
    <StyledTableContainer>
      <StyledTable>
        <DataGrid rows={rows} columns={columns} autoHeight={true} />
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;
