import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import AppraisalCycleTable from "../../features/hr/CycleTable";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddCycle from "./addCycle";
const StyledCollege = styled.div`
  height: max-content;
`;
const Cycle = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <>
      {isAddModalOpen && (
        <AddCycle closeModel={closeAddModal} open={isAddModalOpen} />
      )}
      <StyledCollege>
        <Row type="horizontal">
          <Heading as="h1">All Apprisal Cycle</Heading>

          <Button onClick={openAddModal}>Add New Cycle</Button>
        </Row>
        <Search placeholder="Search for college" />
        <AppraisalCycleTable />
      </StyledCollege>
    </>
  );
};

export default Cycle;
