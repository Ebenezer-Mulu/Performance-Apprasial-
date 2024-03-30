import React, { useState } from "react";
import Row from "../../ui/Row";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../ui/Button";
const AddCriteria = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      type: "student-to-instructor",
      category: "",
      criteria: "",
      weight: "",
    },
  ]);

  const handleSaveCriteria = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/Criterias", {
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
      console.error("Error saving Criteria:", error);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      category: "",
      criteria: "",
      weight: "",
    };

    setRows((prevRows) => [...prevRows, newRow]);
  };
////comenrgf
  return (
    <Formik
      initialValues={{
        type: "student-to-instructor",
        criteriaType: "student-to-instructor",
        ...rows.reduce(
          (acc, row) => ({
            ...acc,
            [`category-${row.id}`]: row.category,
            [`criteria-${row.id}`]: row.criteria,
            [`weight-${row.id}`]: row.weight,
          }),
          {}
        ),
      }}
      validate={(values) => {
        const errors = {};
        if (!values.criteriaType) {
          errors.criteriaType = "Required";
        }
        rows.forEach((row) => {
          if (!values[`category-${row.id}`]) {
            errors[`category-${row.id}`] = "Required";
          }
          if (!values[`criteria-${row.id}`]) {
            errors[`criteria-${row.id}`] = "Required";
          }
          if (!values[`weight-${row.id}`]) {
            errors[`weight-${row.id}`] = "Required";
          }
        });
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const nonEmptyRows = rows.filter(
          (row) => row.category || row.criteria || row.weight
        );

        if (nonEmptyRows.length > 0) {
          const criteriaValues = nonEmptyRows.map((row) => ({
            type: values.criteriaType,
            category: values[`category-${row.id}`],
            criteria: values[`criteria-${row.id}`],
            weight: values[`weight-${row.id}`],
          }));

          handleSaveCriteria({ Criterias: criteriaValues });
        }

        setSubmitting(false);
      }}
    >
      <Form>
        <Row>
          <span as="h3">Appraisal Type</span>
          <Field
            name="criteriaType"
            as={Select}
            variant="outlined"
            fullWidth
            sx={{ width: "50%" }}
          >
            <MenuItem value="student-to-instructor">
              Student-To-Instructor
            </MenuItem>
            <MenuItem value="head-to-instructor">Head-To-Instructor</MenuItem>
            <MenuItem value="team-leader-to-empoyee">
              Team-leader-to-empoyee
            </MenuItem>
            <MenuItem value="dean-to-head">dean-to-head</MenuItem>
            <MenuItem value="director-to-team-leader">
              director-to-team-leader
            </MenuItem>
            <MenuItem value="self">self</MenuItem>
            <MenuItem value="peer-academic-to-academic">
              peer-academic-to-academic
            </MenuItem>
            <MenuItem value="peer-administrative-to-administrative">
              peer-administrative-to-administrative
            </MenuItem>
          </Field>
          {rows.map((row) => (
            <Row key={row.id}>
              <Row type="horizontal">
                <Field
                  name={`category-${row.id}`}
                  as={TextField}
                  label="Category"
                  variant="outlined"
                  fullWidth
                />
                <Field
                  name={`criteria-${row.id}`}
                  as={TextField}
                  label="Criteria"
                  variant="outlined"
                  fullWidth
                />
                <Field
                  name={`weight-${row.id}`}
                  as={TextField}
                  label="Weight"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name={`category-${row.id}`} component="div" />
                <ErrorMessage name={`criteria-${row.id}`} component="div" />
                <ErrorMessage name={`weight-${row.id}`} component="div" />
              </Row>
            </Row>
          ))}
          <Row type="horizontal">
            <Button variation="secondary" onClick={handleAddRow}>
              Add Row
            </Button>
            <Button type="submit">Save Criteria</Button>
          </Row>
        </Row>
      </Form>
    </Formik>
  );
};

export default AddCriteria;
