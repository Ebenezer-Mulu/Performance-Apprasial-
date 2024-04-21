/* eslint-disable no-unused-vars */
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
        <Heading as="h1"> peers</Heading>
      </Row>
      <Search placeholder="Search for User" />

      <TmUsers />
    </>
  );
};

export default peer;
