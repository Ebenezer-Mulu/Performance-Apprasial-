import React from "react";
import { TextField, MenuItem } from "@mui/material";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width:400px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 8px;
`;

const AddDepartment = ({ closeModal, open }) => {
  const { collectionData: Colleges, isLoading, error } = useGet("colleges");
  const { addEntity: addNewDepartment } = useAddEntity({
    method: "post",
    endpoint: "/departments",
    mutationKey: "[add-department]",
    successMessage: "Department added successfully",
    errorMessage: "Failed to add Department",
    invalidateQueries: "departments",
    redirectPath: "/admin/departments",
  });

  return (
    <Modal
      title="Add New Department"
      open={open}
      handleClose={closeModal}
      error={error}
      isLoading={isLoading}
    >
      <Formik
        initialValues={{
          Dname: "",
          Dcode: "",
          collegeId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await addNewDepartment({
              departmentCode: values.Dcode,
              departmentName: values.Dname,
              collegeId: values.collegeId,
            });
            setSubmitting(false);
            closeModal();
          } catch (error) {
            console.error("Error adding department:", error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm>
            <Field
              as={TextField}
              name="Dname"
              type="text"
              label="Department Name"
              variant="outlined"
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
            <ErrorMessage name="Dname" component={ErrorText} />

            <Field
              as={TextField}
              name="Dcode"
              type="text"
              label="Department Code"
              variant="outlined"
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            />
            <ErrorMessage name="Dcode" component={ErrorText} />

            <Field
              as={TextField}
              select
              name="collegeId"
              label="College"
              variant="outlined"
              fullWidth
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
            >
              {Colleges.map((college) => (
                <MenuItem key={college._id} value={college._id}>
                  {college.collegeName}
                </MenuItem>
              ))}
            </Field>
            <ErrorMessage name="collegeId" component={ErrorText} />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AddDepartment;

const validationSchema = Yup.object({
  Dname: Yup.string()
    .min(2, "Department name must be at least 2 characters")
    .required("Department name is required"),
  Dcode: Yup.string()
    .matches(
      /^[a-zA-Z0-9]{2,}$/,
      "Department code must contain only letters and numbers and be at least 2 characters long"
    )
    .required("Department code is required"),
  collegeId: Yup.string().required("College is required"),
});
