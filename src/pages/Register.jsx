import React, { useState } from "react";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // Define navigate here

  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    date: "",
    age: "",
    gender: "",
    phone: "",
    pemail: "",
    department: "",
    college: "",
    address: "",
    branch: "Main",
    role: "student",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    navigate('/login'); // Use navigate properly
  };
  
  return (
    <Formik
      initialValues={formValues}
      onSubmit={(values, { setSubmitting }) => {
        // saveUser(values); // You need to define saveUser method
        setSubmitting(false);
        handleLogin(); // Call handleLogin after form submission
      }}
    >
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "50%",
            margin: "auto",
            padding: "50px",
            borderRadius: "8px",
            marginTop: "40px",
          }}
        >
          <Heading>Registration Form</Heading>
          <Row type="vertical">
            <Row type="horizontal">
              <TextField
                name="fname"
                label="First Name"
                variant="outlined"
                onChange={handleFieldChange}
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              />
              <TextField
                name="lname"
                onChange={handleFieldChange}
                label="Last Name"
                variant="outlined"
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              />
            </Row>
            <Row type="horizontal">
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleFieldChange}
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              />
              <TextField
                name="date"
                onChange={handleFieldChange}
                label="Date of joining"
                variant="outlined"
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              />
            </Row>
            <Row type="horizontal">
              <TextField
                name="pnumber"
                label="Phone number"
                variant="outlined"
                onChange={handleFieldChange}
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              />
              <TextField
                select
                name="batch"
                label="Batch"
                onChange={handleFieldChange}
                variant="outlined"
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              >
                <MenuItem value="2012">2012</MenuItem>
                <MenuItem value="2013">2013</MenuItem>
                <MenuItem value="2014">2014</MenuItem>
                <MenuItem value="2015">2015</MenuItem>
                <MenuItem value="2016">2016</MenuItem>
              </TextField>
            </Row>
            <Row type="horizontal">
              <TextField
                select
                name="college"
                label="College"
                onChange={handleFieldChange}
                variant="outlined"
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              >
                <MenuItem value="computing">Computing</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
              </TextField>
              <TextField
                select
                name="department"
                label="Department"
                onChange={handleFieldChange}
                variant="outlined"
                inputProps={{ style: { fontSize: "16px" } }}
                InputLabelProps={{ style: { fontSize: "16px" } }}
                fullWidth
              >
                <MenuItem value="computing">Computing</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
              </TextField>
            </Row>
            {/* More fields can be added here */}
            <Button type="submit">Register</Button> {/* Use type="submit" for form submission */}
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default Register;
