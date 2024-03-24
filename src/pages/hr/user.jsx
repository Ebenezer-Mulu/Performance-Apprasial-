import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form, Field } from "formik";
import Button from "../../ui/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";

const User = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  const isLastTab = value === "3";

  const saveUser = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Error saving User:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Formik
        initialValues={{
          fname: "",
          lname: "",
          salutation: "",
          date: "",
          batch: "",
          experience: "",
          age: "",
          gender: "",
          status: "",
          phone: "",
          pemail: "",
          cemail: "",
          department: "",
          college: "",
          designation: "",
          address: "",
          branch: "Main",
          role: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.branch) {
            errors.branch = "Required";
          }
          if (!values.address) {
            errors.address = "Required";
          }
          if (!values.date) {
            errors.date = "Required";
          }
          if (!values.fname) {
            errors.fname = "Required";
          }
          if (!values.lname) {
            errors.lname = "Required";
          }
          if (!values.salutation) {
            errors.salutation = "Required";
          }
          if (!values.batch) {
            errors.batch = "Required";
          }
          if (!values.experience) {
            errors.experience = "Required";
          }
          if (!values.age) {
            errors.age = "Required";
          }
          if (!values.gender) {
            errors.gender = "Required";
          }
          if (!values.status) {
            errors.status = "Required";
          }
          if (!values.phone) {
            errors.phone = "Required";
          }
          if (!values.pemail) {
            errors.pemail = "Required";
          }
          if (!values.cemail) {
            errors.cemail = "Required";
          }
          if (!values.department) {
            errors.department = "Required";
          }
          if (!values.college) {
            errors.college = "Required";
          }
          if (!values.designation) {
            errors.designation = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          saveUser(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Over View" value="1" />
                <Tab label="Address and Contact" value="2" />
                <Tab label="User Details" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Row>
                <Row type="horizontal">
                  <Field
                    name="fname"
                    as={TextField}
                    label="First Name"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="lname"
                    as={TextField}
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="salutation"
                    as={TextField}
                    label="Salutation"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="date"
                    as={TextField}
                    type="date"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="batch"
                    as={TextField}
                    label="Batch"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="experience"
                    as={TextField}
                    label="Experience"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="age"
                    as={TextField}
                    label="Age"
                    type="number"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="gender"
                    as={TextField}
                    label="Gender"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="status"
                    as={TextField}
                    label="Status"
                    variant="outlined"
                    fullWidth
                    sx={{ width: "50%" }}
                  />
                </Row>
              </Row>
            </TabPanel>
            <TabPanel value="2">
              <Row>
                <Row type="horizontal">
                  <Field
                    name="phone"
                    as={TextField}
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    sx={{ width: "50%" }}
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="pemail"
                    as={TextField}
                    label="Personal Email"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="cemail"
                    as={TextField}
                    label="Company Email"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
              </Row>
            </TabPanel>
            <TabPanel value="3">
              <Row>
                <Row type="horizontal">
                  <Field
                    name="department"
                    as={TextField}
                    label="Department"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="college"
                    as={TextField}
                    label="College"
                    variant="outlined"
                    fullWidth
                  />
                </Row>

                <Row type="horizontal">
                  <Field
                    name="designation"
                    as={TextField}
                    label="Designation"
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    name="address"
                    as={TextField}
                    label="Address"
                    variant="outlined"
                    fullWidth
                  />
                </Row>
                <Row type="horizontal">
                  <Field
                    name="branch"
                    as={Select}
                    variant="outlined"
                    defaultValue="Main"
                    fullWidth
                    sx={{ width: "50%" }}
                  >
                    <MenuItem value="Main">Main</MenuItem>
                    <MenuItem value="Cluster">Cluster</MenuItem>
                    <MenuItem value="Butajir">Butajir</MenuItem>
                    {/* {
      field: "role",
      headerName: "Department",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Market", "Finance", "Development"],
    },
        */}{" "}
                  </Field>
                </Row>
              </Row>

              {isLastTab && <Button type="submit">Save changes</Button>}
            </TabPanel>
          </TabContext>
        </Form>
      </Formik>
    </Box>
  );
};

export default User;
