import styled from "styled-components";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";


const StyledApprove = styled.div`
    
`

const Approve = () => {
  return (
    <StyledApprove>
      <ButtonGroup>
        <Button>Approve</Button>
        <Button variation="danger">Decline</Button>
      </ButtonGroup>
    </StyledApprove>
  );
};

export default Approve;
