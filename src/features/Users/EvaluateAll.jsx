

import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import { Rating } from "@mui/material"; // Import Rating component from Material-UI
import { useGet } from "../../hooks/useGet";
import { useDeleteEntity } from "../../hooks/useCustomeMutation";
import DeleteConfirmationDialog from "../../ui/Dialog";

const EvaluateAll = () => {
  const { collectionData: users, isLoading, error } = useGet("users");
  const { deleteEntity: deleteUser } = useDeleteEntity({
    method: "delete",
    endpoint: "/users",
    mutationKey: "[delete--user]",
    successMessage: " User deleted successfully",
    errorMessage: "Failed to delete User",
    invalidateQueries: "users",
    redirectPath: "/admin/users",
  });


  const [rowRatings, setRowRatings] = useState({});

  const handleRatingChange = (newValue, rowId) => {
   
    console.log(`Rating for row ${rowId}: ${newValue}`);
    setRowRatings((prevRowRatings) => ({
      ...prevRowRatings,
      [rowId]: newValue,
    }));
  };

  const actionColumn = {
    field: "Rating",
    headerName: "Score",
    width: 150,
    renderCell: (params) => {
      const rowId = params.row.id;
      const ratingValue = rowRatings[rowId] || 0;
      return (
        <Rating
          name={`rating-${rowId}`}
          value={ratingValue}
          onChange={(event, newValue) => handleRatingChange(newValue, rowId)}
          size="large" 
          sx={{ 
            "& .MuiRating-iconFilled": {
              color: ratingValue <= 2 ? "red" : "green", // Red for 1 and 2, Green for others
            },
          }}
        />
      );
    },
  };

  const columns = [
    { field: "fname", headerName: "Category", width: 200 },
    { field: "lname", headerName: "Criteria", width: 500 },
    actionColumn,
  ];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const rows = users.map((user) => {
    const { _id: id, firstName: fname, lastName: lname } = user;
    return { id, fname, lname };
  });

  return (
    <>
      <Table columns={columns} rows={rows} />
    </>
  );
};

export default EvaluateAll;
