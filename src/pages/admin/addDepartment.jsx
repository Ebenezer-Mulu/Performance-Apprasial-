import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Link, useNavigate } from "react-router-dom";
import { useAllCollege } from "../../features/colleges/useCollege";
import { useAddDepartment } from "../../features/department/useAddDepartment";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const AddDepartment = ({ closeModal, open }) => {
  const { Colleges, isLoading, error } = useAllCollege();
  const { addNewDepartment } = useAddDepartment();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    Dname: "",
    Dcode: "",
    collegeId: "",
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmitModal = async () => {
    try {
      await addNewDepartment({
        departmentCode: formValues.Dcode,
        departmentName: formValues.Dname,
        collegeId: formValues.collegeId,
      });
      closeModal();
    } catch (error) {
      console.error("Error adding college:", error);
    }
  };

  return (
    <Modal
      title="Add new College"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <form>
        <TextField
          name="Dname"
          type="text"
          id="Dname"
          label="Department Name"
          variant="outlined"
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={formValues.Dname}
          fullWidth
        />

        <TextField
          name="Dcode"
          type="text"
          id="Dcode"
          label="Department Code"
          variant="outlined"
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={formValues.Dcode}
          fullWidth
        />

        <TextField
          select
          name="collegeId"
          label="College"
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          variant="outlined"
          fullWidth
          value={formValues.dean}
          onChange={handleChange}
        >
          {Colleges.map((college) => {
            return (
              <MenuItem key={college._id} value={college._id}>
                {college.collegeName}
              </MenuItem>
            );
          })}
        </TextField>
      </form>
    </Modal>
  );
};

export default AddDepartment;
