import React, { useState } from "react";
import { HiUser } from "react-icons/hi2";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { TextField } from "@mui/material";
import Row from "../ui/Row";
import Modal from "../ui/Modal";
import Button from "../ui/Button";


const StyledUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75rem;
  margin-left: auto;
  margin-right: auto;
`;

const StyledIcon = styled(HiUser)`
  font-size: 15rem;
  border-radius: 50%;
  background-color: var(--color-grey-200);
  cursor: pointer;
  margin-bottom: 3rem;
`;

const EditIcon = styled(MdModeEditOutline)`
  font-size: 1.5rem;
  color: var(--color-primary);
  cursor: pointer;
`;

const StyledField = styled(TextField)`
  width: 350px;
`;

function Account() {
  const email = localStorage.getItem("email");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedEmail, setEditedEmail] = useState(email || "");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  const handleUpdate = () => {
  
  }

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (newValue) => {
    console.log("New email value:", newValue);
    setEditedEmail(newValue);
    handleCloseModal();
  };

  return (
    <StyledUser>
      {selectedImage ? (
        <img src={selectedImage} alt="Selected" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
      ) : (
        <StyledIcon onClick={handleUpload} />
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
      <Row>
        <Row type="horizontal">
          <StyledField
            value={email}
            variant="outlined"
            label="First Name"
            InputProps={{
              endAdornment: <EditIcon onClick={handleEditClick} />,
            }}
            InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size as needed
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <StyledField
            value={email}
            variant="outlined"
            label="Last Name"
            InputProps={{
              endAdornment: <EditIcon onClick={handleEditClick} />,
            }}
            InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size as needed
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
        </Row>
        <Row type="horizontal">
          <StyledField
            value={email}
            variant="outlined"
            label=" Email"
            InputProps={{
              endAdornment: <EditIcon onClick={handleEditClick} />,
            }}
            InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size as needed
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
          <StyledField
            value={email}
            variant="outlined"
            label="Address"
            InputProps={{
              endAdornment: <EditIcon onClick={handleEditClick} />,
            }}
            InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size as needed
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
        </Row>

        <Row type="horizontal">
          <StyledField
            value={email}
            label="Phone number"
            variant="outlined"
            InputProps={{
              endAdornment: <EditIcon onClick={handleEditClick} />,
            }}
            InputLabelProps={{ style: { fontSize: 14 } }} // Adjust the font size as needed
            sx={{
              "& .MuiInputBase-root": {
                fontSize: 14,
              },
            }}
          />
         <Button size="large" onClick={handleUpdate}>Save</Button>
        </Row>

      
      </Row>

      <Modal
        open={isModalOpen}
        handleClose={handleCloseModal}
        title="Edit"
        onSubmit={handleSaveChanges}
        formValues={{ email: editedEmail }}
        setFormValues={({ email }) => setEditedEmail(email)}
      >
        <StyledField
          name="email"
          value={editedEmail}
          variant="outlined"
          onChange={(e) => setEditedEmail(e.target.value)}
        />
      </Modal>
    </StyledUser>
  );
}
export default Account;
