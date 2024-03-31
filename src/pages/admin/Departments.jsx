import React, { useState } from "react";
import Search from "../../ui/Search";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import AddDepartment from "./addDepartment";
import DepartmentTable from "../../features/department/departmentTable";
const Departments = () => {
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
        <Heading as="h1">All Departments</Heading>
        <Button onClick={openAddModal}>Add Department</Button>
      </Row>
      <Search placeholder="Search for college" />
      <DepartmentTable />
      {isAddModalOpen && (
        <AddDepartment open={isAddModalOpen} closeModal={closeAddModal} />
      )}
    </>
  );
};

export default Departments;
