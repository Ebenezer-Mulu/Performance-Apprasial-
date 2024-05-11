import React from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Box from "@mui/material/Box";
import { useAddEntity } from "../../hooks/useCustomeMutation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import { useState ,useEffect} from "react";
import * as Yup from "yup";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduce the gap between form fields */
`;

const AddCycle = ({ closeModel, open }) => {
  const { addEntity: addCycle } = useAddEntity({
    method: "post",
    endpoint: "/cycles",
    mutationKey: "[add-cycles]",
    successMessage: "Cycle added successfully",
    errorMessage: "Failed to add Cycle",
    invalidateQueries: "cycles",
    redirectPath: "/hr/cycle",
  });

  const [minEndDate, setMinEndDate] = useState("");


  return (
    <Modal title="Add New Cycle" open={open} handleClose={closeModel}>
      <Box sx={{ width: 400 }}>
        <Formik
          initialValues={{
            status: "",
            description: "",
            startDate: "",
            endDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await addCycle(values);
              closeModel();
            } catch (error) {
              console.error("Error adding cycle:", error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            
            <StyledForm>
              <Field
                as="select"
                name="status"
                placeholder="Status"
               sx={{ marginBottom: "3px", width: "70%" }}
                style={{ width: "100%", height: "50px" }}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="planned">planned</option>
                <option value="active">active</option>
                <option value="completed">completed</option>
              </Field>
              {errors.status && touched.status && (
                <Box
                  sx={{
                    bottom: "-12px" ,
                    color: "red",
                    fontSize: "8px",
                  }}
                >
                  {errors.status}
                </Box>
              )}

              <Field
                name="description"
                placeholder="Description"
                variant="outlined"
                style={{ width: "100%", height: "50px" }}
              />
              {errors.description && touched.description && (
                <Box
                  sx={{
                    bottom: "-12px" /* Reduce the bottom value */,
                    color: "red",
                    fontSize: "8px",
                  }}
                >
                  {errors.description}
                </Box>
              )}
              <Field
                name="startDate"
                label="Start Date"
                variant="outlined"
                type="date"
                style={{ width: "100%", height: "50px" }}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.startDate && touched.startDate && (
                <Box
                  sx={{
                    bottom: "-12px" /* Reduce the bottom value */,
                    color: "red",
                    fontSize: "8px",
                  }}
                >
                  {errors.startDate}
                </Box>
              )}

              <Field
                name="endDate"
                label="End Date"
                variant="outlined"
                type="date"
                style={{ width: "100%", height: "50px" }}
                min={minEndDate}
              />
              {errors.endDate && touched.endDate && (
                <Box
                  sx={{
                    bottom: "-12px" /* Reduce the bottom value */,
                    color: "red",
                    fontSize: "8px",
                  }}
                >
                  {errors.endDate}
                </Box>
              )}
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </StyledForm>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddCycle;

const validationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  description: Yup.string().required("Description is required"),
  startDate: Yup.date().required("Start Date is required"),
  endDate: Yup.date()
    .required("End Date is required")
    .min(Yup.ref("startDate"), "End Date must be after Start Date"),
});
