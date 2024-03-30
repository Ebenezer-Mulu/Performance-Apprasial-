import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import styled from "styled-components";
import { useAddCollege } from "../../features/colleges/useAddCollege";
import { useAllUser } from "../../features/Users/UseAllUser";
import Modal from "../../ui/Modal";

const AddCollege = ({ closeModal, open }) => {
  const { users, isLoading, error } = useAllUser();
  const { addCollege } = useAddCollege();
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
      title="Add new College"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
      error={error}
      isLoading={isLoading}
    >
      <form>
        <TextField
          name="Cname"
          label="College name"
          variant="outlined"
          fullWidth
          value={formValues.Cname}
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          onChange={handleChange}
        />
        <TextField
          name="Ccode"
          label="College Code"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={formValues.Ccode}
          onChange={handleChange}
        />
        <TextField
          name="Dnumber"
          type="text"
          id="Dnumber"
          label="Number of Departments"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          value={formValues.Dnumber}
          onChange={handleChange}
        />
        <TextField
          select
          name="dean"
          label="Dean"
          sx={{ marginBottom: "10px" }}
          inputProps={{ style: { fontSize: "16px" } }}
          InputLabelProps={{ style: { fontSize: "16px" } }}
          variant="outlined"
          fullWidth
          value={formValues.dean}
          onChange={handleChange}
        >
          {filteredUsers.map((user) => (
            <MenuItem
              key={user._id}
              value={`${user.firstName} ${user.lastName}`}
            >
              {`${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </Modal>
  );
};

export default AddCollege;
