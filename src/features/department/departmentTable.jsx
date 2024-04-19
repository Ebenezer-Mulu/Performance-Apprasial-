import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import DeleteConfirmationDialog from "../../ui/Dialog";
import Row from "../../ui/Row";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";

import ButtonContainer from "../../ui/ButtonContainer";
import UpdateDepartmentModal from "../../pages/admin/updateDepartment";

const DepartmentTable = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedDepartment, setUpdatedDepartment] = useState({});

  const {
    collectionData: departments,
    isLoading,
    error,
  } = useGet("departments");
  const { deleteEntity: deleteDepartment } = useDeleteEntity({
    method: "delete",
    endpoint: "/departments",
    mutationKey: "[delete-department]",
    successMessage: "Department deleted successfully",
    errorMessage: "Failed to delete Department",
    invalidateQueries: "departments",
    redirectPath: "/admin/departments",
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteDepartment(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const rows = departments.map((department) => {
    const { _id: id, departmentCode, collegeId, departmentName } = department;
    const collegeName = collegeId?.collegeName;
    return {
      id,
      departmentCode,
      collegeName,
      departmentName,
    };
  });

  const handleUpdateBtnClick = (row) => {
    setUpdatedDepartment(row);
    setIsUpdate(true);
  };

  const cancelUpdating = () => {
    setIsUpdate(false);
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 300,
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
            size="small"
            onClick={() => handleUpdateBtnClick(row)}
            variation="primary"
          >
            Update
          </Button>
        </ButtonContainer>
      );
    },
  };
  const columns = [
    { field: "departmentName", headerName: "Department Name", width: 250 },
    { field: "departmentCode", headerName: "Department code", width: 200 },
    { field: "collegeName", headerName: "College", type: "text", width: 250 },
    actionColumn,
  ];

  return (
    <>
         {isUpdate && (
        <UpdateDepartmentModal
        //  id={id}
          handleClose={cancelUpdating}
          courseToUpdate={updatedDepartment}
          open={isUpdate}
        />
      )}
      {showDeleteDialog && (
        <DeleteConfirmationDialog
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default DepartmentTable;
