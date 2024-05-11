import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Row from "../../ui/Row";
import ButtonGroup from "../../ui/ButtonGroup";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useGet } from "../../hooks/useGet";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { useUser } from "../../features/authentication/useUser";
import Button from "../../ui/Button"; // Import your custom Button component

const AddCourseForm = ({ closeModal, open }) => {
  const { user } = useUser();
  const { addEntity: addNewCourse } = useAddEntity({
    method: "post",
    endpoint: "/courses",
    mutationKey: "[add-courses]",
    successMessage: "Course added successfully",
    errorMessage: "Failed to add Course",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
  });
  const { collectionData: users, isLoading, error } = useGet("users");

  const handleSubmitModal = async (values, { setSubmitting }) => {
    const department = user.department._id;
    const {
      Cname: name,
      Ccode: code,
      batch,
      instructor,
      semester,
      en: endDate,
      section,
      startDate,
    } = values;

    await addNewCourse({
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
    setSubmitting(false);
  };

  if (isLoading) return <Spinner />;

  const instructors = users.filter(
    (current) =>
      current.department === user.department._id &&
      ["instructor", "director", "head", "dean"].includes(current.role)
  );

  return (
    <Modal
      title="Add New Course"
      open={open}
      handleClose={closeModal}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          maxWidth: "none",
        },
      }}
    >
      <Formik
        initialValues={{
          Cname: "",
          Ccode: "",
          batch: "",
          semester: "",
          startDate: "",
          en: "",
          section: "",
          instructor: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitModal}
      >
        {({ errors, touched }) => (
          <Form>
            <Row>
              <Row type="horizontal">
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="Cname"
                    type="text"
                    as={TextField}
                    label="Course Name"
                    fullWidth
                  />
                  {errors.Cname && touched.Cname && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.Cname}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="Ccode"
                    type="text"
                    as={TextField}
                    label="Course Code"
                    fullWidth
                  />
                  {errors.Ccode && touched.Ccode && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.Ccode}
                    </Box>
                  )}
                </Box>
              </Row>
              <Row type="horizontal">
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="batch"
                    type="number"
                    as={TextField}
                    label="Batch"
                    fullWidth
                  />
                  {errors.batch && touched.batch && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.batch}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="semester"
                    type="number"
                    as={TextField}
                    inputProps={{ min: "1", max: "2" }}
                    label="Semester"
                    fullWidth
                  />
                  {errors.semester && touched.semester && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.semester}
                    </Box>
                  )}
                </Box>
              </Row>
              <Row type="horizontal">
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="startDate"
                    type="date"
                    as={TextField}
                    fullWidth
                    inputProps={{ min: new Date().toISOString().split("T")[0] }}
                  />
                  {errors.startDate && touched.startDate && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.startDate}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field name="en" type="date" as={TextField} fullWidth />
                  {errors.en && touched.en && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.en}
                    </Box>
                  )}
                </Box>
              </Row>
              <Row type="horizontal">
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="section"
                    type="number"
                    as={TextField}
                    label="Section"
                    fullWidth
                    InputProps={{
                      inputProps: {
                        min: 1,
                        step: 1,
                      },
                    }}
                  />
                  {errors.section && touched.section && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.section}
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    width: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    name="instructor"
                    as={TextField}
                    select
                    label="Instructor"
                    fullWidth
                  >
                    {instructors.map((instructor) => (
                      <MenuItem key={instructor._id} value={instructor._id}>
                        {`${instructor.firstName} ${instructor.lastName}`}
                      </MenuItem>
                    ))}
                  </Field>
                  {errors.instructor && touched.instructor && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: "-16px",
                        color: "red",
                        fontSize: "8px",
                      }}
                    >
                      {errors.instructor}
                    </Box>
                  )}
                </Box>
              </Row>
            </Row>
            <ButtonGroup>
              <Button type="submit">Submit</Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const AddCourse = ({ closeModal, open }) => {
  return <AddCourseForm closeModal={closeModal} open={open} />;
};

export default AddCourse;

const validationSchema = Yup.object({
  Cname: Yup.string()
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabetic characters and spaces are allowed"
    )
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  Ccode: Yup.string()
    .matches(
      /^[A-Za-z0-9\s]+$/,
      "Only alphabetic characters and numbers are allowed"
    )
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  batch: Yup.number()
    .required("Batch is required")
    .test("is-four-digits", "Batch must be a 4-digit number", (value) =>
      /^\d{4}$/.test(value)
    ),
  semester: Yup.number().required("Semester is required"),
  startDate: Yup.date().required("Start Date is required"),
  en: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
  section: Yup.number().required("Section is required"),
  instructor: Yup.string()
    .required("Instructor is required")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only alphabetic characters and spaces are allowed"
    ),
});
