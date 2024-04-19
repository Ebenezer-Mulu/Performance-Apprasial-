import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../ui/Table";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { Row } from "react-bootstrap";
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import DeleteConfirmationDialog from "../../ui/Dialog";
<<<<<<< HEAD
import ButtonContainer from "../../ui/ButtonContainer"
import UpdateCollegeModal from "../../pages/admin/updateCollege";
=======

import ButtonContainer from "../../ui/ButtonContainer";

>>>>>>> f1ea6148c45f4b8fd5ba3eab5d4e15b0a2e5a1bb

const CollegeTable = () => {
  const queryClient = useQueryClient();
  const { collectionData: Colleges, isLoading, error } = useGet("colleges");
  const { deleteEntity: deleteCollege } = useDeleteEntity({
    method: "delete",
    endpoint: "/colleges",
    mutationKey: "[delete-colleges]",
    successMessage: "college deleted successfully",
    errorMessage: "Failed to delete College",
    invalidateQueries: "colleges",
    redirectPath: "/admin/college",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedCollege, setUpdatedCollege] = useState({});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const cancelUpdating = () => {
    setIsUpdate(false);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteCollege(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };

  const handleUpdateBtnClick = (row) => {
    setUpdatedCollege(row);
    setIsUpdate(true);
  };

  const rows = Colleges.map((college) => {
    const {
      _id: id,
      collegeName,
      collegeCode,
      numberOfDepartment,
      dean,
    } = college;

    return {
      id,
      collegeName,
      collegeCode,
      numberOfDepartment,
      dean,
    };
  });

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
    { field: "collegeName", headerName: "College Name", width: 250 },
    { field: "collegeCode", headerName: "College Code", width: 200 },
    {
      field: "numberOfDepartment",
      headerName: "Number of Department",
      width: 180,
    },
    { field: "dean", headerName: "Dean", width: 200 },

    actionColumn,
  ];

  return (
    <>
        {isUpdate && (
        <UpdateCollegeModal
        //  id={id}
          handleClose={cancelUpdating}
          courseToUpdate={updatedCollege}
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

export default CollegeTable;
