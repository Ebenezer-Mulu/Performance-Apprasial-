import React, { useState } from "react";
import Search from "../../ui/Search";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CollegeTable from "../../features/colleges/CollegeTable";
import AddCollege from "./addCollege";
const Colleges = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); //

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Colleges</Heading>
        <Button onClick={openAddModal}>Add College</Button>{" "}
      </Row>
      <Search placeholder="Search for college" />
      <CollegeTable />
      {isAddModalOpen && (
        <AddCollege open={isAddModalOpen} closeModal={closeAddModal} />
      )}
    </>
  );
};

export default Colleges;
