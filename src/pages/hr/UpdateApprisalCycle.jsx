import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import * as Yup from "yup";
import { useUpdateEntity } from "../../hooks/useCustomeMutation";
import { Formik, Form, Field } from "formik";
import Button from "../../ui/Button";

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});

const UpdateAppraisalCycleModal = ({ open, handleClose, cycleToUpdate }) => {
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

  const StyledTextField = styled(TextField)`
    && {
      margin-bottom: 1rem;
    }
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

  return (
    <Modal open={open} handleClose={handleClose} title="Update Appraisal Cycle">
      <Formik
        initialValues={updatedCycleData}
        validationSchema={validationSchema}
        onSubmit={handleUpdateCycle}
      >
        {(formik) => (
          <StyledForm onSubmit={formik.handleSubmit}>
            <StyledTextField
              select
              name="status"
              label="Status"
              variant="outlined"
              fullWidth
              value={formik.values.status}
              onChange={(e) => handleInputChange(e, formik)}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
            >
              <MenuItem value="planned">planned</MenuItem>
              <MenuItem value="active">active</MenuItem>
              <MenuItem value="completed">completed</MenuItem>
            </StyledTextField>
            <StyledTextField
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={formik.values.description}
              onChange={(e) => handleInputChange(e, formik)}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <StyledTextField
              name="startDate"
              label="Start Date"
              variant="outlined"
              type="date"
              fullWidth
              value={formik.values.startDate}
              onChange={(e) => handleInputChange(e, formik)}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
              helperText={formik.touched.startDate && formik.errors.startDate}
            />
            <StyledTextField
              name="endDate"
              label="End Date"
              variant="outlined"
              type="date"
              fullWidth
              value={formik.values.endDate}
              onChange={(e) => handleInputChange(e, formik)}
              error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              helperText={formik.touched.endDate && formik.errors.endDate}
            />
            <Button type="submit" variant="contained" color="primary">
              Update Cycle
            </Button>
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateAppraisalCycleModal;
