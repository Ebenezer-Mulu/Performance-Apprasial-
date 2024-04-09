import Table from "../../ui/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useAllUser } from "./UseAllUser";
import { useDeleteUser } from "./useDeleteUser";
import Row from "../../ui/Row";
const DeleteDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const UserTable = () => {
  const { users, isLoading, error } = useAllUser();
  const { deleteUser } = useDeleteUser();
  const handleUpdate = () => {};
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteUser(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };
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
            onClick={() => handleDeleteBtnClick(row.id)}
          >
            Delete
          </Button>
          <Button
            style={{
              marginLeft: "1rem",
            }}
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

  return (
    <>
      {showDeleteDialog && (
        <DeleteDialog>
          <div className="delete-dialog">
            <p>Are you sure you want to delete this college?</p>
            <Row type="horizontal">
              <Button
                style={{ margin: "5px" }}
                size="large"
                variation="danger"
                onClick={handleConfirmDelete}
              >
                Yes
              </Button>
              <Button size="large" onClick={handleCancelDelete}>
                No
              </Button>
            </Row>
          </div>
        </DeleteDialog>
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default UserTable;
