import styled from "styled-components";
import Heading from "./Heading";

const StyledLogo = styled.div`
  text-align: center;
 

`;

const Img = styled.img`
  padding-top: 3rem;
  background: transparent !important;

`;

function Logo() {
  return (
    <StyledLogo>
      <Img src="/wolkite.jpg" alt="Logo" />
      <Heading as="h3">Wolkite University</Heading>
    </StyledLogo>
  );
}

export default Logo;
