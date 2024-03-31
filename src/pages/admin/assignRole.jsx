import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import { useAllUser } from "../../features/Users/UseAllUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const assignRole = async (roleMappings) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      "http://localhost:5000/api/v1/users/assign-role",
      roleMappings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to assign role");
  }
};
const AssignRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: assignRole,
    onSuccess: () => {
      toast.success("Role assigned and password sent via email successfully");
      queryClient.invalidateQueries("employee");
      navigate("/admin/users");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Failed to Assign Role");
    },
  });
  const [selectedRoles, setSelectedRoles] = useState({});
  const { users, isLoading, error } = useAllUser();
  const columns = [
    { field: "fname", headerName: "First Name", width: 200 },
    { field: "lname", headerName: "Last Name", width: 200 },
    { field: "cemail", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: (params) => (
        <Formik initialValues={{ role: "" }} onSubmit={() => {}}>
          <Field
            name={`${params.row.id}`}
            as={Select}
            fullWidth
            onChange={(e) => {
              const updatedRoles = { ...selectedRoles };
              updatedRoles[`${params.row.id}`] = e.target.value;
              setSelectedRoles(updatedRoles);
            }}
          >
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="acadamic">Acadamic</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="director">Director</MenuItem>
            <MenuItem value="teamLeader">Team Leader</MenuItem>
            <MenuItem value="head">Head</MenuItem>
            <MenuItem value="dean">Dean</MenuItem>
            <MenuItem value="adminstrative">Adminstrative</MenuItem>
            <MenuItem value="hr">Hr</MenuItem>
            <MenuItem value="assistance">Assistance</MenuItem>
          </Field>
        </Formik>
      ),
    },
  ];
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = users.filter((user) => user.role === undefined);

  const handleClick = async () => {
    mutate(selectedRoles);
  };

  return (
    <>
      <Table
        columns={columns}
        rows={rows.map((row) => ({
          id: row._id,
          cemail: row.email,
          role: row.role,
          fname: row.firstName,
          lname: row.lastName,
        }))}
      />

      <Button
        style={{ width: "20rem", marginLeft: "40rem" }}
        variation="primary"
        size="medium"
        onClick={handleClick}
      >
        Save
      </Button>
    </>
  );
};

export default AssignRole;
