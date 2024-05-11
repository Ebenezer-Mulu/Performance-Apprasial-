import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";


const UpdateCollegeModal = ({ open, handleClose, collegeToUpdate }) => {
//   const [formValues, setFormValues] = useState({});
//   const { user } = useUser();
//   const {
//     collectionData: users,
//     isLoading: usersLoading,
//     error: usersError,
//   } = useGet("users");
//   const { isLoading: updateLoading, updateEntity } = useUpdateEntity({
//     method: "patch",
//     endpoint: "/colleges",
//     mutationKey: "[update-course]",
//     successMessage: "College updated successfully",
//     errorMessage: "Failed to update College",
//     invalidateQueries: "colleges",
//     redirectPath: "/admin/colleges",
//   });

//   useEffect(() => {
//     setFormValues(courseToUpdate);
//   }, [courseToUpdate]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

  const handleSubmit = (event) => {
    const {
      Cname: name,
      Ccode: code,
      dean
      
    } = formValues;


    const data = {
      name,
      code,
      dean,
    
    };
    console.log(id, data);

   // updateEntity(id, data);
    handleClose();
  };

//   if (usersLoading) return <Spinner />;
//   const instructorList = users.filter(
//     (current) =>
//       current.department === user.department._id &&
//       current.role === "instructor"
//   );

  return (
    <Modal
      width="130rem"
      title="Update College"
      open={open}
      onSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <form>
        <Row>
          <TextField
            name="Cname"
            label="College Name"
            // value={formValues.Cname || ""}
            // onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          />
        </Row>
        <Row>
          <TextField
            name="Ccode"
            label="College Code"
            // value={formValues.Ccode || ""}
            // onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px", width: "30rem" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            fullWidth
            required
          />
        </Row>
        
    
        
            <Row>
          <TextField
            select
            name="dean"
            label="Dean"
            // onChange={handleChange}
            variant="outlined"
            sx={{ marginBottom: "10px" }}
            inputProps={{ style: { fontSize: "16px" } }}
            InputLabelProps={{ style: { fontSize: "16px" } }}
            defaultValue=""
            fullWidth
          >
            {/* {instructorList.map((instrctor) => {
              return (
                <MenuItem key={instrctor._id} value={instrctor._id}>
                  {`${instrctor.firstName} ${instrctor.lastName}`}
                </MenuItem>
              );
            })} */}
          </TextField>
        </Row>
      </form>
    </Modal>
  );
};

export default UpdateCollegeModal;
