import React, { useState } from "react";
import { TextField, MenuItem, Select } from "@mui/material";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import { useAddEntity } from "../../hooks/useCustomeMutation";

const StyledForm = styled.form`
  display: flex;
  width: 45rem;
  flex-direction: column;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 2.5rem;
    input {
      font-size: 1.5rem;
    }
    label {
      font-size: 1.5rem;
    }
  }
`;

const AddCycle = ({ closeModel, open }) => {
  const { addEntity: addCycle } = useAddEntity({
    method: "post",
    endpoint: "/cycles",
    mutationKey: "[add-cycles]",
    successMessage: "Cycle added successfully",
    errorMessage: "Failed to add Cycle",
    invalidateQueries: "cycles",
    redirectPath: "/hr/cycle",
  });

  const [formValues, setFormValues] = useState({
    status: "",
    description: "",
    startDate: "",
    endDate: "",
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
      closeModel();
      await addCycle(formValues);
    } catch (error) {
      console.error("Error adding cycle:", error);
    }
  };

  return (
    <Modal
      title="Add New Cycle"
      open={open}
      handleClose={closeModel}
      onSubmit={handleSubmitModal}
    >
      <StyledForm>
        <TextField
          select
          name="status"
          label="Status"
          variant="outlined"
          fullWidth
          value={formValues.status}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
        >
          <MenuItem value="planned">planned</MenuItem>
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="completed">completed</MenuItem>
        </TextField>
        <StyledTextField
          name="description"
          label="Description"
          variant="outlined"
          fullWidth
          value={formValues.description}
          onChange={handleChange}
        />
        <StyledTextField
          name="startDate"
          label="Start Date"
          variant="outlined"
          type="date"
          fullWidth
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
          value={formValues.startDate}
          onChange={handleChange}
        />
        <StyledTextField
          name="endDate"
          label="End Date"
          variant="outlined"
          type="date"
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" }, shrink: true }}
          fullWidth
          value={formValues.endDate}
          onChange={handleChange}
        />
      </StyledForm>
    </Modal>
  );
};

export default AddCycle;
