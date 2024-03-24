
import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import { useParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";

// const Table = styled.table`
//   border: 1px solid var(--color-grey-200);
//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
//   height: auto;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// const Row = styled.td`
//   padding: 1.2rem 2.4rem;
//   align-items: center;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

// const StyledBody = styled.tbody`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
// `;

// const CourseTable = () => {
//   const [courses, setCourses] = useState(null);
//   const { id } = useParams();

  // const fetchData = () => {
  //   fetch("http://localhost:3000/Courses")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setCourses(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // };

  // const handleClick = (courseId) => {
  //   fetch(`http://localhost:3000/Courses/${courseId}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       console.log("Delete");
  //       fetchData(); // Call the fetchData function to get updated data
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting course:", error);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // Fetch data on component mount

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <Row>Name </Row>
//         <Row> Code</Row>
//         <Row>Instructor</Row>
//         <Row>Batch</Row>
//         <Row>Semester</Row>
//         <Row>Action</Row>
//       </TableHeader>
//       <StyledBody>
//         {courses &&
//           courses.map((course) => (
//             <>
//               <Row>{course.name}</Row>
//               <Row>{course.code}</Row>
//               <Row>{course.instructor}</Row>
//               <Row>{course.batch}</Row>
//               <Row>{course.semester}</Row>
//               <Row>
//                 <ButtonGroup>
//                   <Button variant="secondary">View</Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleClick(course.id)}
//                   >
//                     Delete
//                   </Button>
//                 </ButtonGroup>
//               </Row>
//             </>
//           ))}
//       </StyledBody>
   
//     </Table>
//   );
// };

//export default CourseTable;







const CourseTable = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    // { field: "id", headerName: "ID", width: 60 },
    { field: "Cname", headerName: " Name", width: 180 },
    { field: "Ccode", headerName: "Course Code", width: 100 },
    {
      field: "instructor",
      headerName: "Instructor",
      type: "text",
      width: 180,
    },
    { field: "batch", headerName: "Batch", type: "text", width: 180 },
    { field: "semester", headerName: "Semester", type: "text", width: 180 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Courses");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={columns} rows={rows} />;
};

export default CourseTable;
