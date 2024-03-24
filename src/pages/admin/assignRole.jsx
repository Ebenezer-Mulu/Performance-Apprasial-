import React, { useState, useEffect } from "react";
import { Field, Formik } from "formik";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "../../ui/Button";
import Table from "../../ui/Table";

const AssignRole = () => {
  const [rows, setRows] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({});

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
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="instructor">Instructor</MenuItem>
            <MenuItem value="assistant">Assistant</MenuItem>
            <MenuItem value="academic">Academic</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="director">Director</MenuItem>
            <MenuItem value="teamLeader">Team Leader</MenuItem>
            <MenuItem value="head">Head</MenuItem>
            <MenuItem value="dean">Dean</MenuItem>
          </Field>
        </Formik>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/Users");
      const data = await response.json();
  
      const rolesResponse = await fetch("http://localhost:3000/Roles");
      const rolesData = await rolesResponse.json();
  
 
      const usersWithRoles = data.map(user => {
        const roleInfo = rolesData.find(role => role.userId === user.id);
        return {
          ...user,
          role: roleInfo ? roleInfo.role : null,
        };
      });
  
      setRows(usersWithRoles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleClick = async () => {
    console.log("Selected Roles:", selectedRoles);
  
    // Assuming selectedRoles is an object with userId as keys and role as values
    for (const userId in selectedRoles) {
      const role = selectedRoles[userId];
  
      try {
        // Extract the actual user ID from the key (role-bff5)
        const actualUserId = userId.split('-')[1];
  
        // Make a PATCH request to update the user's role
        const response = await fetch(`http://localhost:3000/Users/${actualUserId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        });
  
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
          ...row,
          fname_lname: `${row.fname} ${row.lname}`,
        }))}
      />

      <Button onClick={handleClick}>Save</Button>
    </>
  );
};

export default AssignRole;
