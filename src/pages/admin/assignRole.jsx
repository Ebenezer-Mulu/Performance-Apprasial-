import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import { useAllUser } from "../../features/Users/UseAllUser";

const AssignRole = () => {
  const [selectedRoles, setSelectedRoles] = useState({});
  const { users, isLoading, error } = useAllUser();
  const columns = [
    { field: "fname_lname", headerName: "Full Name", width: 300 },
    { field: "cemail", headerName: "Email", width: 200 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: (params) => (
        <Formik initialValues={{ role: "" }} onSubmit={() => {}}>
          <Field
            name={`role-${params.row.id}`}
            as={Select}
            fullWidth
            onChange={(e) => {
              const updatedRoles = { ...selectedRoles };
              updatedRoles[`role-${params.row.id}`] = e.target.value;
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
            <MenuItem value="teamLeader">Team Leader</MenuItem>
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

  const rows = users.filter((user) => {
    console.log(user.role === undefined);
    console.log(user.role);
  });

  console.log(rows);

  const handleClick = async () => {
    console.log("Selected Roles:", selectedRoles);

    // Assuming selectedRoles is an object with userId as keys and role as values
    for (const userId in selectedRoles) {
      const role = selectedRoles[userId];

      try {
        // Extract the actual user ID from the key (role-bff5)
        const actualUserId = userId.split("-")[1];

        // Make a PATCH request to update the user's role
        const response = await fetch(
          `http://localhost:3000/Users/${actualUserId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update role for user ${actualUserId}`);
        }

        console.log(`Role updated successfully for user ${actualUserId}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Table
        columns={columns}
        rows={rows.map((row) => ({
          id: row._id,
          cemail: row.email,
          role: row.role,
          fname_lname: `${row.firstName} ${row.lastName}`,
        }))}
      />

      <Button onClick={handleClick}>Save</Button>
    </>
  );
};

export default AssignRole;
