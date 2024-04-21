import styled from "styled-components";
import Button from "../../ui/Button";
import React, { useState, useEffect } from "react";
import Table from "../../ui/Table";
import ButtonContainer from "../../ui/ButtonContainer";
import { useGet } from "../../hooks/useGet";
import DeleteConfirmationDialog from "../../ui/Dialog";
import Spinner from "../../ui/Spinner";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import UpdateCourseModal from "../../pages/head/updateCourse";

const CourseTable = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedCourse, setUpdatedCourse] = useState({});

  const { collectionData: Courses, isLoading, error } = useGet("courses");
  const { deleteEntity: deleteCourse } = useDeleteEntity({
    method: "delete",
    endpoint: "/courses",
    mutationKey: "[delete-course]",
    successMessage: "Course deleted successfully",
    errorMessage: "Failed to delete Course",
    invalidateQueries: "courses",
    redirectPath: "/head/courses",
  });

  const handleUpdateBtnClick = (row) => {
    setUpdatedCourse(row);
    setIsUpdate(true);
  };

  const cancelUpdating = () => {
    setIsUpdate(false);
  };

  const handleDeleteBtnClick = (id) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteCourse(deleteId);
      setShowDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteId(null);
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

  let instId;
  if (isLoading) return <Spinner />;
  const rows = Courses.map((course) => {
    const {
      _id: id,
      name: Cname,
      code: Ccode,
      isActive,
      semester,
      batch,
      endDate,
    } = course;

    const instructor = course.instructor
      ? `${course.instructor?.firstName} ${course?.instructor?.lastName}`
      : " not assigned";
    instId = course?.instructor?._id;

    return {
      id,
      Cname,
      semester,
      Ccode,
      instructor,
      isActive,
      batch,
    };
  });

  const columns = [
    { field: "Cname", headerName: "Course Name", width: 250 },
    { field: "Ccode", headerName: "Code", width: 100 },
    {
      field: "instructor",
      headerName: "Instructor",
      type: "text",
      width: 120,
    },

    { field: "batch", headerName: "Batch", type: "text", width: 100 },
    { field: "semester", headerName: "Semester", type: "text", width: 100 },
    { field: "isActive", headerName: "Active", type: "text", width: 100 },

    actionColumn,
  ];

  return (
    <>
      {isUpdate && (
        <UpdateCourseModal
          instId={instId}
          handleClose={cancelUpdating}
          courseToUpdate={updatedCourse}
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

export default CourseTable;
