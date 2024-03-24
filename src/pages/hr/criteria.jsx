import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";
import CriteriaTable from "../../features/hr/criteriaTable";
import { Link } from "react-router-dom";

const Criteria = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h3"> Appraisal Template</Heading>
        <Button>
          <Link to="/hr/addCriteria"> Add Criteria</Link>
        </Button>
      </Row>
      <CriteriaTable/>
    </>
  );
};

export default Criteria;
