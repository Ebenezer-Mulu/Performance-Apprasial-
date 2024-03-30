import Table from "../../ui/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useAllUser } from "./UseAllUser";
import Pagination from "../../ui/Pagination";
const UserTable = () => {
  const { users, isLoading, error } = useAllUser();
  const handleDelete = () => {};

  const handleUpdate = () => {};
  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 250,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          <Button
            size="small"
            variation="danger"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variation="primary"
            onClick={() => handleUpdate(row)}
          >
            Update
          </Button>
        </ButtonContainer>
      );
    },
  };

  const columns = [
    { field: "fname", headerName: "First Name", width: 200 },
    { field: "lname", headerName: "Last Name", width: 200 },
    { field: "cemail", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", type: "text", width: 150 },
    actionColumn,
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  const rows = users.map((user) => {
    const {
      _id: id,
      firstName: fname,
      lastName: lname,
      email: cemail,
      role,
    } = user;

    return { id, fname, lname, cemail, role };
  });

  return <Table columns={columns} rows={rows} />;
};

export default UserTable;
