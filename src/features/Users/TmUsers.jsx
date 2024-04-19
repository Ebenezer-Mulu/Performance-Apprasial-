import { useState } from "react";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import ButtonContainer from "../../ui/ButtonContainer";
import TmEvaluate from "../../pages/teamleader/TmEvaluate";

import { Link } from "react-router-dom";

const TmUsers = () => {
  const { collectionData: users, isLoading, error } = useGet("users");
  const { deleteEntity: deleteUser } = useDeleteEntity({
    method: "delete",
    endpoint: "/users",
    mutationKey: "[delete--user]",
    successMessage: " User deleted successfully",
    errorMessage: "Failed to delete User",
    invalidateQueries: "users",
    redirectPath: "/admin/users",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showevaluation, setShowevaluation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEvaluateBtnClick = (user) => {
    setSelectedUser(user);
    setShowevaluation(true);
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          <Button
            style={{ marginLeft: "5rem" }}
            size="small"
            variation="primary"
         
          >
            <Link to="/teamleader/tmeval">Evaluate</Link>
          </Button>
          
          
        </ButtonContainer>
      );
    },
  };

  const columns = [
    { field: "fname", headerName: "First Name", width: 200 },
    { field: "lname", headerName: "Last Name", width: 200 },
    { field: "cemail", headerName: "Email", width: 200 },
    actionColumn,
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = users.map((user) => {
    const { _id: id, firstName: fname, lastName: lname, email: cemail } = user;
    return { id, fname, lname, cemail };
  });

  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default TmUsers;
