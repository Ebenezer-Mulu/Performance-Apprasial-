import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Table from "../../ui/Table";

const CollegeTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Colleges");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    { field: "Cname", headerName: "College Name",width: 200 },
    { field: "Ccode", headerName: "College Code", width: 200  },
    { field: "Dnumber", headerName: "Number of Department", width: 200 },
    { field: "dean", headerName: "Dean", width: 200 },
  ];

  return <Table columns={columns} rows={rows} />;
};

export default CollegeTable;
