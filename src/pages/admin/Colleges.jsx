import React from "react";
import Search from "../../ui/Search";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import CollegeTable from "../../features/colleges/CollegeTable";


import { Link } from "react-router-dom";


const Colleges = () => {
 


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Colleges</Heading>
        <Button > <Link to="/admin/addCollege"> Add College</Link></Button>
      </Row>
      <Search placeholder="Search for college" />
      <CollegeTable/>


     
      
    </>
  );
};

export default Colleges;
