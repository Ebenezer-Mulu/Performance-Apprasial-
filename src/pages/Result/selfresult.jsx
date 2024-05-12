import React, { useState } from "react";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaStar,
} from "react-icons/fa";
import { useGet } from "../../hooks/useGet";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import ComplaintForm from "./ComplaintForm";
import { useUser } from "../../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
const getStatusColor = (status) => {
  switch (status) {
    case "In Progress":
      return "#ffc107";
    case "Completed":
      return "#28a745";
    case "Approved":
      return "#007bff";
    default:
      return "#6c757d";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "In Progress":
      return <FaStar style={{ color: getStatusColor(status) }} />;
    case "Completed":
      return <FaUserTie style={{ color: getStatusColor(status) }} />;
    case "Approved":
      return <FaChalkboardTeacher style={{ color: getStatusColor(status) }} />;
    default:
      return null;
  }
};

const Selfresult = () => {
  const { collectionData: users } = useGet("users/peers");
  const { collectionData: evalutionResult } = useGet("results");
  const { isLoading, collectionData: data } = useGet("results/final-result");
  const { collectionData: evalutionDetailResult } = useGet("results/detail");

  const navigate = useNavigate();
  const { collectionData: cycle } = useGet("cycles/active");
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const { user: currentUser } = useUser();

  const handleOpenComplaintModal = () => {
    setShowComplaintModal(true);
  };

  const handleCloseComplaintModal = () => {
    setShowComplaintModal(false);
  };
  if (isLoading) {
    return <Spinner />;
  }

  const filteredPeerEvalution = evalutionDetailResult?.filter((result) => {
    return (
      result?.evaluterRole === "peer" &&
      result?.evaluter === currentUser?._id &&
      result?.cycle === cycle?._id
    );
  });

  if (filteredPeerEvalution?.length < users?.length) {
    return (
      <p>
        Oops! It looks like you haven't evaluated all your peers yet. Please
        complete all peer evaluations before viewing the results.
      </p>
    );
  }

  if (!data.status || data.status !== "Approved") {
    return (
      <p>
        Hang tight! We're still processing your request. Please wait until the
        results are approved.
      </p>
    );
  }

  const evalutionData = data.weights;
  const status = data.status;

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 ", padding: "20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "32px",
          }}
        >
          Evaluation Result
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "10px" }}>{getStatusIcon(status)}</div>
          <h3 style={{ margin: "0", color: getStatusColor(status) }}>
            {status}
          </h3>
        </div>
        {evalutionData.map(
          (evaluator, index) =>
            evaluator &&
            Object.keys(evaluator).length > 0 &&
            index !== 3 && (
              <div
                key={index}
                style={{
                  border: "2px solid #3f51b5",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#e0e0e0",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      marginRight: "20px",
                      fontSize: "24px",
                      color: "#3f51b5",
                    }}
                  >
                    {index === 0 && <FaUserTie />}
                    {index === 1 && <FaStar />}
                    {index === 2 && <FaChalkboardTeacher />}
                  </div>

                  <div>
                    <h3 style={{ marginBottom: "10px" }}>{evaluator.name}</h3>
                    <p style={{ margin: "0" }}>Score: {evaluator.score}</p>
                  </div>
                </div>
                <div>
                  <p style={{ margin: "0" }}>Rank: {evaluator.rank}</p>
                </div>
              </div>
            )
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3
            style={{ fontSize: "32px", color: "#0000ff", marginBottom: "10px" }}
          >
            <FaUserGraduate style={{ marginRight: "10px" }} />
            Total Score: {evalutionData[3]?.total}
          </h3>
        </div>
        <Button
          style={{
            padding: "1.5rem",
            fontSize: "1.2rem",
            marginLeft: "74rem",
          }}
          onClick={handleOpenComplaintModal}
        >
          Submit Complaint
        </Button>
      </div>

      <ComplaintForm
        closeModal={handleCloseComplaintModal}
        open={showComplaintModal}
      />
    </>
  );
};

export default Selfresult;
