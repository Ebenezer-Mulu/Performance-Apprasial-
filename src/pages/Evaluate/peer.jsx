import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import UserTable from "../../features/Users/UserTable";
import TmUsers from "../../features/Users/TmUsers";
import { Link } from "react-router-dom";

const peer = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1"> Users</Heading>
        {/* <Button>
          <Link to="/admin/assignRole">Assign Role</Link>
        </Button> */}
      </Row>
      <Search placeholder="Search for User" />
     

      <TmUsers />
    </>
  );
};

export default peer;