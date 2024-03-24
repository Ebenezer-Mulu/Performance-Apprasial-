import React, { useState } from "react";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";

import Button from "../../ui/Button";

import DepartmentTable from "../../features/department/departmentTable";

import { Link } from "react-router-dom";


const Departments = () => {


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Departments</Heading>
        <Button ><Link to='/admin/addDepartment'> Add Department</Link> </Button>
      </Row>
      <Search placeholder="Search for department" />
      <DepartmentTable />

    
    </>
  );
};

export default Departments;
