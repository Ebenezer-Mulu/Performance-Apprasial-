import Table from "../../ui/Table";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";

const CriteriaTable = () => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "appraisalType", headerName: "Appraisal Type", width: 400 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Button
          variation="secondary"
          onClick={() => handleButtonClick(params.row.id)}
        >
          View
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/Criteria_Type");
        const data = await response.json();
        setRows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (rowId) => {
    console.log("Button clicked for row with ID:", rowId);
  };

  return <Table columns={columns} rows={rows} />;
};

export default CriteriaTable;
