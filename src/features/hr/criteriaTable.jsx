import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import DeleteConfirmationDialog from "../../ui/Dialog";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;
const CriteriaTable = () => {
  const { collectionData: templets, isLoading } = useGet("templetes");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { deleteEntity: deleteTemplete } = useDeleteEntity({
    method: "delete",
    endpoint: "/templetes",
    mutationKey: "[delete-templetes]",
    successMessage: "Apprisal Templete Deleted successfully",
    errorMessage: "Failed to delete Templete",
    invalidateQueries: "templetes",
    redirectPath: "",
  });
  if (isLoading) return <Spinner />;

  const rows = templets?.map((templete) => {
    const { _id: id, evaluationType: AppraisalType, language } = templete;

    return { id, AppraisalType, language };
  });

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteTemplete(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
  };
  const handleUpdateBtnClick = () => {};
  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 350,
    renderCell: (params) => {
      const row = params.row;
      return (
        <ButtonContainer>
          <Button
            style={{ backgroundColor: "#F7C566" }}
            size="small"
            onClick={() => handleUpdateBtnClick(row.id)}
            variation="secondary"
          >
            View
          </Button>

          <Button
            size="small"
            variation="danger"
            onClick={() => handleDeleteBtnClick(row.id)}
          >
            Delete
          </Button>
        </ButtonContainer>
      );
    },
  };
  const columns = [
    { field: "AppraisalType", headerName: "Appraisal Type", width: 400 },
    { field: "language", headerName: "Language" },

    actionColumn,
  ];

  return (
    <>
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

export default CriteriaTable;
