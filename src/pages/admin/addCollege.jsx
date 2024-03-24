import React from "react";
import { Formik, Form } from "formik";
import { TextField } from "@mui/material";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
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

const AddCollege = () => {
  const navigate = useNavigate();

  const saveCollege = async (values) => {
    try {
     

      const response = await fetch("http://localhost:3000/Colleges", {
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

      navigate("./Colleges");
    } catch (error) {
      console.error("Error saving college:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        Cname: "",
        Dnumber: "",
        dean: "",
        Ccode: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.Cname) {
          errors.Cname = "Required";
        }
        if (!values.Ccode) {
          errors.Ccode = "Required";
        }
        if (!values.Dnumber) {
          errors.Dnumber = "Required";
        }
        if (!values.dean) {
          errors.dean = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        saveCollege(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <StyledForm>
            <Heading>Add new College</Heading>
            <TextField
              name="Cname"
              label="College name"
              variant="outlined"
              fullWidth
            />

            <TextField
              name="Ccode"
              label="College Code"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="Dnumber"
              type="text"
              id="Dnumber"
              label="Number of Departments"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="dean"
              type="text"
              label="Dean"
              variant="outlined"
              fullWidth
            />
            <ButtonGroup>
              <Button variation="secondary"><Link to='/admin/Colleges'>Cancel</Link></Button>
              <Button type="submit">Add College</Button>
            </ButtonGroup>
          </StyledForm>

          {errors.Cname && touched.Cname && (
            <p style={{ color: "red" }}>{errors.Cname}</p>
          )}
          {errors.Ccode && touched.Ccode && (
            <p style={{ color: "red" }}>{errors.Ccode}</p>
          )}
          {errors.Dnumber && touched.Dnumber && (
            <p style={{ color: "red" }}>{errors.Dnumber}</p>
          )}
          {errors.dean && touched.dean && (
            <p style={{ color: "red" }}>{errors.dean}</p>
          )}
        </form>
      )}
    </Formik>
  );
};

export default AddCollege;
