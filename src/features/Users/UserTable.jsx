import Table from "../../ui/Table";
import { useEffect, useState } from "react";

const UserTable = () => {
  const [rows, setRows] = useState([]);
  
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fname", headerName: "First Name", width: 200 },
    { field: "lname", headerName: "Last Name", width: 200 },
    { field: "cemail", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", type: "text", width: 150 },
  
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Users");
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

export default UserTable;
