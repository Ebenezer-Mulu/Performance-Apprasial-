import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import styled from "styled-components";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import Modal from "../../ui/Modal";
import { useGet } from "../../hooks/useGet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const AddCollege = ({ closeModal, open }) => {
  const { collectionData: users, isLoading, error } = useGet("users");

  const { addEntity: addCollege } = useAddEntity({
    method: "post",
    endpoint: "/colleges",
    mutationKey: "[add-college]",
    successMessage: "College added successfully",
    errorMessage: "Failed to add College",
    invalidateQueries: "colleges",
    redirectPath: "/admin/colleges",
  });
  const [formValues, setFormValues] = useState({
    Cname: "",
    Dnumber: "",
    Ccode: "",
    dean: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmitModal = async () => {
    try {
      await addCollege({
        collegeName: formValues.Cname,
        collegeCode: formValues.Ccode,
        numberOfDepartment: +formValues.Dnumber,
        dean: formValues.dean,
      });
      closeModal();
    } catch (error) {
      console.error("Error adding college:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredUsers = users.filter(
    (user) =>
      user.role !== "head" || user.role === "teamLeader" || user.role === "dean"
  );

  return (
    <Modal 
      title="Add New College"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <Formik
        initialValues={{
          Cname: "",
          Ccode: "",
          Dnumber: "",
          dean: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitModal}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="Cname"
              label="College name"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
            <ErrorMessage name="Cname" component="div" />
            <Field
              as={TextField}
              name="Ccode"
              label="College Code"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
            <ErrorMessage name="Ccode" component="div" />
            <Field
              as={TextField}
              name="Dnumber"
              type="number"
              label="Number of Departments"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
            <ErrorMessage name="Dnumber" component="div" />
            <Field
              as={TextField}
              select
              name="dean"
              label="Dean"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              variant="outlined"
              fullWidth
            >
              {filteredUsers.map((user) => (
                <MenuItem
                  key={user._id}
                  value={`${user.firstName} ${user.lastName}`}
                >
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="dean" component="div" />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Add College
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCollege;


const validationSchema = Yup.object().shape({
  Cname: Yup.string().required("College name is required"),
  Ccode: Yup.string().required("College code is required"),
  Dnumber: Yup.number()
    .required("Number of departments is required")
    .min(1, "Number of departments must be at least 1")
    .integer("Number of departments must be an integer"),
  dean: Yup.string().required("Dean is required"),
});