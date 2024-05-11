import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField, MenuItem } from "@mui/material";
import Row from "../../ui/Row";
import styled from "styled-components";
import Button from "../../ui/Button";

const Report = styled.div`
  padding: 50px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
  }
`;

const BottomRightButton = styled(Button)`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const UserInfo = () => {
  const { id } = useParams();
  const [mainTabValue, setMainTabValue] = useState("1");
  const [nestedTabValue, setNestedTabValue] = useState("3");
  const [selectedYear, setSelectedYear] = useState("");

  const handleMainTabChange = (event, newValue) => {
    setMainTabValue(newValue);
  };

  const handleNestedTabChange = (event, newValue) => {
    setNestedTabValue(newValue);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const isLastTab = mainTabValue === "2";

  const handleDownload = () => {};

  return (
    <TabContext value={mainTabValue}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          sx={{
            "& .MuiTab-root": {
              fontSize: "1.25rem",
            },
          }}
          onChange={handleMainTabChange}
          aria-label="lab API tabs example"
        >
          <Tab label="Personal Information" value="1" />
          <Tab label="Evaluation Result" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <Report>
          <Row>
            <label>Full Name</label>
            <label>Email</label>
            <label>Starting Day</label>
            <label>Age</label>
            <label>Gender</label>
            <label>Phone Number</label>
            <label>College</label>
            <label>Department</label>
            <label>Address</label>
          </Row>
        </Report>
      </TabPanel>
      <TabPanel value="2">
        <Row>
          <TextField
            select
            label="Evaluation Year"
            fullWidth
            value={selectedYear}
            onChange={handleYearChange}
          >
            <MenuItem value="2016">2016</MenuItem>
            <MenuItem value="2017">2017</MenuItem>
          </TextField>
        </Row>
        <TabContext value={nestedTabValue}>
          <TabList
            sx={{
              "& .MuiTab-root": {
                fontSize: "1.25rem",
                marginTop: "3rem",
              },
            }}
            onChange={handleNestedTabChange}
          >
            <Tab label="I semester" value="3" />
            <Tab label="II semester" value="4" />
          </TabList>
          <TabPanel value="3">
            <Report>Contents of I semester</Report>
          </TabPanel>
          <TabPanel value="4">
            <Report>Contents of II semester</Report>
          </TabPanel>
        </TabContext>
        {isLastTab && (
          <BottomRightButton onClick={handleDownload}>
            Download to PDF
          </BottomRightButton>
        )}
      </TabPanel>
    </TabContext>
  );
};

export default UserInfo;
