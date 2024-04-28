import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import ButtonGroup from "../../ui/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";
const AddCourseForm = ({ closeModal, open }) => {
  const [formValues, setFormValues] = useState({});
  const { addEntity: addNewCourse } = useAddEntity({
    method: "post",
    endpoint: "/courses",
    mutationKey: "[add-courses]",
    successMessage: "Course added successfully",
    errorMessage: "Failed to add Course",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
  });
  const { user } = useUser();
  const { collectionData: users, isLoading, error } = useGet("users");

  const navigate = useNavigate();
  const handleSubmitModal = () => {
    const {
      Cname: name,
      Ccode: code,
      batch,
      instructor,
      semester,
      en: endDate,
      section,
      startDate: startDate,
    } = formValues;
    const department = user.department._id;

    addNewCourse({
      name,
      code,
      batch,
      instructor,
      semester,
      endDate,
      startDate,
      department,
      section,
    });
    closeModal();
  };

  if (isLoading) return <h1>Loading....</h1>;
  const instrctor = users.filter((current) => {
    return (
      current.department == user.department._id &&
      (current.role === "instructor" ||
        current.role === "director" ||
        current.role === "head" ||
        current.role === "dean")
    );
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  if (isLoading) return <Spinner />;
  return (
    <Modal
      title="Add new Course"
      open={open}
      handleClose={closeModal}
      onSubmit={handleSubmitModal}
    >
      <form>
        <Row>
          <Row type="horizontal">
            <TextField
              name="Cname"
              label="Course Name"
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              fullWidth
            />
            <TextField
              name="Ccode"
              onChange={handleChange}
              label="Course Code"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              variant="outlined"
              fullWidth
            />
          </Row>
          <Row type="horizontal">
            <TextField
              name="batch"
              variant="outlined"
              onChange={handleChange}
              type="number"
              defaultValue=""
              label="Batch"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              fullWidth
            ></TextField>
            <TextField
              name="semester"
              label="semester"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              defaultValue=""
              fullWidth
            ></TextField>
          </Row>
          <Row type="horizontal">
            <TextField
              name="startDate"
              variant="outlined"
              type="date"
              onChange={handleChange}
              defaultValue=""
              label="Start Date"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{
                style: { fontSize: "16px" },
                shrink: true,
              }}
              fullWidth
            ></TextField>
            <TextField
              name="en"
              label="End Date"
              onChange={handleChange}
              type="date"
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{
                style: { fontSize: "16px" },
                shrink: true,
              }}
              defaultValue=""
              fullWidth
            ></TextField>
          </Row>
          <Row type="horizontal">
            <TextField
              name="section"
              label="Section"
              type="number"
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              defaultValue=""
              fullWidth
            ></TextField>
            <TextField
              select
              name="instructor"
              label="Instructor"
              onChange={handleChange}
              variant="outlined"
              sx={{ marginBottom: "10px" }}
              inputProps={{ style: { fontSize: "16px" } }}
              InputLabelProps={{ style: { fontSize: "16px" } }}
              defaultValue=""
              fullWidth
            >
              {instrctor.map((instrctor) => {
                return (
                  <MenuItem key={instrctor._id} value={instrctor._id}>
                    {`${instrctor.firstName} ${instrctor.lastName}`}
                  </MenuItem>
                );
              })}
            </TextField>
          </Row>
        </Row>
      </form>
    </Modal>
  );
};

const AddCourse = ({ closeModel, open }) => {
  return <AddCourseForm closeModal={closeModel} open={open} />;
};

export default AddCourse;
