import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

const StyledForm = styled(Form)`
  padding: 5px 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
`;

const UpdateAppraisalCycleModal = ({ open, handleClose, cycleToUpdate }) => {
  const { collectionData: users, isLoading, error } = useGet("users");
  const [updatedCycleData, setUpdatedCycleData] = useState({
    id: cycleToUpdate.id,
    status: cycleToUpdate.status,
    description: cycleToUpdate.description,
    startDate: cycleToUpdate.startDate,
    endDate: cycleToUpdate.endDate,
  });

  const StyledForm = styled(Form)`
    width: 400px;
    display: flex;
    flex-direction: column;
  `;

  const { updateEntity: updateAppraisalCycle } = useUpdateEntity({
    method: "patch",
    endpoint: `/cycles`,
    mutationKey: "[update-appraisal-cycle]",
    successMessage: "Appraisal cycle updated successfully",
    errorMessage: "Failed to update appraisal cycle",
    invalidateQueries: "appraisalcycles",
    redirectPath: "",
  });

  const handleInputChange = (event, formik) => {
    const { name, value } = event.target;
    formik.setFieldValue(name, value);
  };

  const handleUpdateCycle = async (values) => {
    try {
      await updateAppraisalCycle(updatedCycleData.id, values);
      handleClose();
    } catch (error) {
      console.error("Error updating appraisal cycle:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      Cname: "",
      Ccode: "",
      Dnumber: "",
      dean: "",
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { values, touched, errors, handleChange, handleBlur } = formik;

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Update Appraisal Cycle"
      onSubmit={handleUpdateCycle}
    >
      <StyledForm onSubmit={formik.handleSubmit}>
        <TextField
          select
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          value={values.status} // Use values from useFormik
          onChange={(e) => handleInputChange(e, formik)}
          error={touched.status && Boolean(errors.status)}
          helperText={touched.status && errors.status}
        >
          <MenuItem value="planned">planned</MenuItem>
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
        </TextField>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={values.description} // Use values from useFormik
          onChange={(e) => handleInputChange(e, formik)}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
        />
        <TextField
          name="startDate"
          variant="outlined"
          type="date"
          fullWidth
          value={values.startDate} // Use values from useFormik
          onChange={(e) => handleInputChange(e, formik)}
          error={touched.startDate && Boolean(errors.startDate)}
          helperText={touched.startDate && errors.startDate}
        />
        <TextField
          name="endDate"
          variant="outlined"
          type="date"
          fullWidth
          value={values.endDate} // Use values from useFormik
          onChange={(e) => handleInputChange(e, formik)}
          error={touched.endDate && Boolean(errors.endDate)}
          helperText={touched.endDate && errors.endDate}
        />
      </StyledForm>
    </Modal>
  );
};

export default UpdateAppraisalCycleModal;

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});
