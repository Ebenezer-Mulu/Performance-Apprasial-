import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Table from "../../ui/Table";
import { useAllCollege } from "./useCollege";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDeleteCollege } from "./useDeleteCollege";
import { Row } from "react-bootstrap";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;

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

const CollegeTable = () => {
  const queryClient = useQueryClient();
  const { Colleges, isLoading, error } = useAllCollege();
  const { deleteCollege } = useDeleteCollege();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleUpdateBtnClick = (id) => {};

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
            onClick={() => handleUpdateBtnClick(row.id)}
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
      {showDeleteDialog && (
        <DeleteDialog>
          <div className="delete-dialog">
            <p>Are you sure you want to delete this college?</p>
            <Row type="horizontal">
              <Button
                style={{ margin: "10px" }}
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

export default CollegeTable;
