import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import user from "../../data/userData";
import { useUserRole } from "./UserRoleContext";
import { Formik } from "formik";
import CustomTextField from "../../ui/TextField"; // Import the TextFd component directly
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const ForgotPassword = styled.div`
  margin-top: 2px;
  text-align: right;
  color: #007bff; /* Blue color */
  cursor: pointer;
`;

const LoginForm = () => {
  const { setRole } = useUserRole();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            //  authentication logic here
            const foundUser = user.find(
              (userData) =>
                userData.email === values.email &&
                userData.password === values.password
            );

            if (foundUser) {
              const role = foundUser.role;
              setRole(role);
              localStorage.setItem("role", role);
              localStorage.setItem("email", values.email);

              navigate(`/${role}/dashboard`);
            } else {
              setError("Invalid email or password");
              console.error("Login failed");
            }
          } catch (error) {
            console.error("Authentication error:", error);
            setError("An error occurred during login");
          }

          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Heading as="h1">Login</Heading>
              <CustomTextField
                name="email"
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                placeholder="Enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />

              <CustomTextField
                name="password"
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                placeholder="Enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <ForgotPassword>Forget Password?</ForgotPassword>
              {errors.email && touched.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
              {errors.password && touched.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </Row>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        )}
      </Formik>
    </FormContainer>
  );
};

export default LoginForm;
