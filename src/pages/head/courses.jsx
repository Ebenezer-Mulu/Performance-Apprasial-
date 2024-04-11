//import { courses } from "../../data/course";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import CourseTable from "../../features/head/courseTable";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import AddCourse from "./addCourse";
const StyledCollege = styled.div`
  height: max-content;
`;
const Courses = () => {
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
        <AddCourse closeModel={closeAddModal} open={isAddModalOpen} />
      )}
      <StyledCollege>
        <Row type="horizontal">
          <Heading as="h1">All Courses</Heading>

          <Button onClick={openAddModal}>Add Courses</Button>
        </Row>
        <Search placeholder="Search for college" />
        <CourseTable />
      </StyledCollege>
    </>
  );
};

export default Courses;
