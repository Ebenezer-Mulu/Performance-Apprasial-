import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useGet } from "../../hooks/useGet";
import Row from "../../ui/Row";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import DeleteConfirmationDialog from "../../ui/Dialog";
import Modal from "../../ui/Modal"; 

const UserTable = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    height: 8rem;
  `;

  const handleUpdate = () => {
    setIsModalOpen(true); 
  };

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
        <DeleteConfirmationDialog
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}> {/* Modal component */}
        <h1>Modal Content</h1>
      </Modal>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default UserTable;
