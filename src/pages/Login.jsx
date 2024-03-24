import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Row from "../ui/Row";
import Info from "../ui/info";



const LoginLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

`;

const LogoContainer = styled.div`
  flex: 1;
  background-color: #000;
  height: 100vh;
  `

const FormContainer = styled.div`
padding: 7rem ;
  flex: 1;
`;

function Login() {
  return (
    <LoginLayout>
      <LogoContainer>
        <Row>
          <Logo />
          <Info/>
        </Row>

      </LogoContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </LoginLayout>
  );
}

export default Login;
