import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useAllDepartment } from "./useDepartment";
import { useDeleteDepartment } from "./useDeleteDepartement";
import Row from "../../ui/Row";
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
const DepartmentTable = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { departments, isLoading, error } = useAllDepartment();
  const { deleteDepartment } = useDeleteDepartment();
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

  const handleUpdateBtnClick = () => {};
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
    { field: "departmentName", headerName: "Department Name", width: 250 },
    { field: "departmentCode", headerName: "Department code", width: 200 },
    { field: "collegeName", headerName: "College", type: "text", width: 250 },
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
                style={{ margin: "0px" }}
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

export default DepartmentTable;
