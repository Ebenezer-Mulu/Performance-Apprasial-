import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Search from "../../ui/Search";
import Button from "../../ui/Button";
import UserTable from "../../features/Users/UserTable";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../features/authentication/useUser";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useUser();
  const isAdmin = user.role === "admin";

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        {isAdmin && (
          <Button>
            <Link to="/admin/assignRole">Assign Role</Link>
          </Button>
        )}
      </Row>
      <Search
        onSearchChange={handleSearchChange}
        value={searchQuery}
        placeholder="Search for User"
      />
      <UserTable searchQuery={searchQuery} />
    </>
  );
};

export default Users;
