import Table from "../../ui/Table";
import { useEffect, useState } from "react";

const DepartmentTable = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "Dname", headerName: "Department Name", width: 200 },
    { field: "Dcode", headerName: "Department code", width: 200 },
    { field: "date", headerName: "Created at", width: 200 },
    { field: "college", headerName: "College", type: "text", width: 200 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Departments");
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Table columns={columns} rows={rows} />;
};

export default DepartmentTable;
