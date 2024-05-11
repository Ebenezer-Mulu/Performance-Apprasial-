import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Instructor = () => {
  return (
    <TextField
      select
      name="instructor"  
      label="Instructor"
      sx={{
        marginBottom: "5px",
        width: "70%",
        "& label": { marginTop: "7px" },
      }}
      inputProps={{ style: { fontSize: "16px" } }}
      InputLabelProps={{ style: { fontSize: "16px" } }}
      variant="outlined"
      fullWidth
    >
      {/* Add your options here */}
      <MenuItem value="instructor1">Instructor 1</MenuItem>
      <MenuItem value="instructor2">Instructor 2</MenuItem>
      <MenuItem value="instructor3">Instructor 3</MenuItem>
    </TextField>
  );
};

export default Instructor;
