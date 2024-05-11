import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";



const StyledForm = styled(Form)`
  padding: 2.4rem 4rem;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 0.8rem;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ error }) =>
    error ? "0.4rem" : "0.8rem"}; /* Adjust gap based on error */
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 0.8rem;
  color: var(--color-red-700);
`;

function FormRowVertical({ label, error, children }) {
  return (
    <StyledFormRow error={error}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

const LoginForm = () => {
  const { login } = useLogin();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .matches(/@gmail\.com$/, "Only Gmail addresses are allowed"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await login(values);
      resetForm();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <FormRowVertical>
            <label htmlFor="email">Email address</label>
            <Field
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              as={StyledInput}
              disabled={isSubmitting}
            />
            <StyledErrorMessage name="email" component="div" />
          </FormRowVertical>

          <FormRowVertical>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              as={StyledInput}
              disabled={isSubmitting}
            />
            <StyledErrorMessage name="password" component="div" />
          </FormRowVertical>
          <FormRowVertical>
            <Button size="large" type="submit" disabled={isSubmitting}>
              {!isSubmitting ? "Log in" : <SpinnerMini />}
            </Button>
          </FormRowVertical>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;
