import StyledSelect from "../../ui/Select";
// import Peer from "../../ui/appraisal/peer";
import Row from "../../ui/Row";

const TmEvaluate = () => {
  return (
    <Row>
      <StyledSelect>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
      </StyledSelect>
      <Peer />
    </Row>
  );
};

export default TmEvaluate;
