// AddCourse.js
import React from "react";
import Box from "@mui/material/Box";
import { Formik, Form, Field } from "formik";
import Button from "../../ui/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import ButtonGroup from "../../ui/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";

const AddCourseForm = () => {
  const navigate = useNavigate();

  const saveCourse = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/Courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
      navigate("/head/Courses");
    } catch (error) {
      console.error("Error saving course:", error);
      // Add user-friendly error handling if needed
    }
  };

  return (
    <Formik
      initialValues={{
        Cname: "",
        Ccode: "",
        instructor: "",
        batch: "",
        semester: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.Cname) {
          errors.Cname = "Required";
        }
        if (!values.Ccode) {
          errors.Ccode = "Required";
        }
        if (!values.instructor) {
          errors.instructor = "Required";
        }
        if (!values.batch) {
          errors.batch = "Required";
        }
        if (!values.semester) {
          errors.semester = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        saveCourse(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <Row>
          <Row type="horizontal">
            <Field
              name="Cname"
              as={TextField}
              label="Course Name"
              variant="outlined"
              fullWidth
            />
            <Field
              name="Ccode"
              as={TextField}
              label="Course Code"
              variant="outlined"
              fullWidth
            />
          </Row>
          <Row type="horizontal">
            <Field
              name="instructor"
              as={Select}
              label="Instructor"
              variant="outlined"
              defaultValue=""
              fullWidth
              sx={{ width: "50%" }}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Field>
            <Field
              name="batch"
              as={Select}
              variant="outlined"
              defaultValue=""
              label="Batch"
              fullWidth
              sx={{ width: "50%" }}
            >
              <MenuItem value="2011">2011</MenuItem>
              <MenuItem value="2012">2012</MenuItem>
              <MenuItem value="2013">2013</MenuItem>
            </Field>
          </Row>
          <Row type="horizontal">
            <Field
              name="semester"
              as={Select}
              variant="outlined"
              defaultValue=""
              fullWidth
              sx={{ width: "50%" }}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Field>
          </Row>
        </Row>
        <ButtonGroup>
          <Button variant="secondary">
            <Link to="/head/Courses">Close</Link>
          </Button>
          <Button type="submit">Save changes</Button>
        </ButtonGroup>
      </Form>
    </Formik>
  );
};

const AddCourse = () => {
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <AddCourseForm />
    </Box>
  );
};

export default AddCourse;
