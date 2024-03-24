//import { courses } from "../../data/course";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import CourseTable from "../../features/head/courseTable";
import Button from "../../ui/Button";
import styled from "styled-components";
import Pagination from "../../ui/Pagination";
import { Link } from "react-router-dom";



const StyledCollege = styled.div`
  height: max-content;
`;

const Courses = () => {
  return (
    <StyledCollege>
      <Row type="horizontal">
        <Heading as="h1">All Courses</Heading>
        <Button>
          <Link to="/head/addCourse">Add Courses</Link>
        </Button>
      </Row>
      <Search placeholder="Search for college" />
      <CourseTable />

      
 
    </StyledCollege>
  );
};

export default Courses;



