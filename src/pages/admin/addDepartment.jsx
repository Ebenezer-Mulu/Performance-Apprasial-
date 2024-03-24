import React from "react";

import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Row from "../../ui/Row";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Link, useNavigate } from "react-router-dom";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 50%;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin: auto;
`;

const AddDepartment = () => {
  const saveDepartment = async (values) => {
    const navigate = useNavigate();
    console.log(values);
    try {
      console.log(values);
      const response = await fetch("http://localhost:3000/Departments", {
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

      navigate("./Depatments");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        Dname: "",
        Dcode: "",
        college: "",
        date: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.Dname) {
          errors.Dname = "Required";
        }
        if (!values.Dcode) {
          errors.Dcode = "Required";
        }
        if (!values.date) {
          errors.date = "Required";
        }
        if (!values.college) {
          errors.college = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        saveDepartment(values);
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledForm>
            <Heading>Add New Department</Heading>
            <TextField
              name="Dname"
              type="text"
              id="Dname"
              label="Department Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Dname}
              fullWidth
            />

            <TextField
              name="Dcode"
              type="text"
              id="Dcode"
              label="Department Code"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.Dcode}
              fullWidth
            />

            <TextField
              name="date"
              type="date"
              id="date"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.date}
              fullWidth
            />

            <TextField
              name="college"
              type="text"
              id="college"
              label="College"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.college}
              fullWidth
            />

            {errors.Dname && touched.Dname && (
              <p style={{ color: "red" }}>{errors.Dname}</p>
            )}
            {errors.Dcode && touched.Dcode && (
              <p style={{ color: "red" }}>{errors.Dcode}</p>
            )}
            {errors.date && touched.date && (
              <p style={{ color: "red" }}>{errors.date}</p>
            )}
            {errors.college && touched.college && (
              <p style={{ color: "red" }}>{errors.college}</p>
            )}

            <ButtonGroup>
              <Button variation="secondary">
                <Link to="/admin/Department"> Cancel</Link>
              </Button>
              <Button type="submit">Save changes</Button>
            </ButtonGroup>
          </StyledForm>
        </form>
      )}
    </Formik>
  );
};

export default AddDepartment;
