import React, { useState } from "react";
import { HiUser } from "react-icons/hi2";
import styled from "styled-components";
import { MdModeEditOutline } from "react-icons/md";
import { TextField } from "@mui/material";
import Row from "../ui/Row";
import Button from "../ui/Button";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useUpdateEntity } from "../hooks/useCustomeMutation";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  font-size: 16px;
`;

const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto; /* Center the image */
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

function Account() {
  const { isLoading, user } = useUser();

  const { updateEntity: updateProfile } = useUpdateEntity({
    method: "patch",
    endpoint: "/users/update-me",
    mutationKey: "[update-profile]",
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update Profile",
    invalidateQueries: "current-user",
    redirectPath: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState();

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address || "",
    phone: user?.phone || "",
    avatar: user?.avatar,
  };

  const handleUpload = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpdate = (values) => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    formData.append("image", file);

    updateProfile("1000000", formData);
  };

  return (
    <StyledUser>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Form>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <ImageContainer>
                  {values.avatar ? (
                    <Image src={values.avatar} alt="Avatar" />
                  ) : selectedImage ? (
                    <Image src={selectedImage} alt="Selected" />
                  ) : (
                    <StyledIcon onClick={handleUpload} />
                  )}
                </ImageContainer>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                />
                <Row>
                  <Row type="horizontal">
                    <div style={{ position: "relative", width: "50%" }}>
                      <StyledField
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        variant="outlined"
                        label="First Name"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                      />
                      {errors.firstName && touched.firstName && (
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "8px",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ position: "relative", width: "50%" }}>
                      <StyledField
                        name="lastName"
                        value={values.lastName}
                        variant="outlined"
                        label="Last Name"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={handleChange}
                      />
                      {errors.lastName && touched.lastName && (
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "8px",
                          }}
                        />
                      )}
                    </div>
                  </Row>
                  <Row type="horizontal">
                    <div style={{ position: "relative", width: "50%" }}>
                      <StyledField
                        name="email"
                        value={values.email}
                        variant="outlined"
                        label="Email"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email && (
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "8px",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ position: "relative", width: "50%" }}>
                      <StyledField
                        name="address"
                        value={values.address}
                        variant="outlined"
                        label="Address"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={handleChange}
                      />
                      {errors.address && touched.address && (
                        <ErrorMessage
                          name="address"
                          component="div"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "8px",
                          }}
                        />
                      )}
                    </div>
                  </Row>
                  <Row type="horizontal">
                    <div style={{ position: "relative", width: "50%" }}>
                      <StyledField
                        name="phone"
                        value={values.phone}
                        variant="outlined"
                        label="Phone number"
                        inputProps={{ style: { fontSize: 12 } }}
                        InputLabelProps={{ style: { fontSize: 12 } }}
                        onChange={handleChange}
                      />
                      {errors.phone && touched.phone && (
                        <ErrorMessage
                          name="phone"
                          component="div"
                          style={{
                            position: "absolute",
                            bottom: "-16px",
                            color: "red",
                            fontSize: "8px",
                          }}
                        />
                      )}
                    </div>
                    <Button size="large" onClick={handleSubmit}>
                      Save
                    </Button>
                  </Row>
                </Row>
              </>
            )}
          </Form>
        )}
      </Formik>
    </StyledUser>
  );
}

export default Account;

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .matches(/^[A-Za-z]+$/, "Only alphabetic characters are allowed")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Invalid email format")
    .required("Personal email is required"),
    address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^09[0-9]{8}$/,
      "Phone number must start with '09' and be 10 digits long"
    ),
});
