import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Table from "../../ui/Table";
import { useAllCollege } from "./useCollege";
import { useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import { toast } from "react-hot-toast";
import axios from "axios";

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  height: 8rem;
`;

const CollegeTable = () => {
  const queryClient = useQueryClient();
  const { Colleges, isLoading, error } = useAllCollege();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleDeleteCollege = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/v1/Colleges/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        queryClient.invalidateQueries("colleges");
        toast.success("College Deleted successfully");
      } else {
        throw new Error("No data found in the response");
      }
    } catch (error) {
      console.error("ERROR", err);
      toast.error("Failed to delete college");
    }
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
          <Button size="small" variation="danger">
            Delete
          </Button>
          <Button size="small" variation="primary">
            Update
          </Button>
        </ButtonContainer>
      );
    },
  };

  const columns = [
    { field: "collegeName", headerName: "College Name", width: 200 },
    { field: "collegeCode", headerName: "College Code", width: 200 },
    {
      field: "numberOfDepartment",
      headerName: "Number of Department",
      width: 200,
    },
    { field: "dean", headerName: "Dean", width: 200 },

    actionColumn,
  ];

  return <Table columns={columns} rows={rows} />;
};

export default CollegeTable;
