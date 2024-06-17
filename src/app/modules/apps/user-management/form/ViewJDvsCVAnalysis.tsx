import ClearIcon from "@mui/icons-material/Clear";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const ViewJDvsCVAnalysis: React.FC<Props> = ({ open, handleClose }) => {
  const analysisReport = {
    jdId: "10",
    candidateId: "200",
    score: "85",
    matchReason: "Skills match: Java, Spring",
    details: {
      rolesMatch: true,
      skillsMatch: { Java: 90, Spring: 85 },
      experienceMatch: 80,
      educationMatch: 95,
      locationMatch: 75,
      domainMatch: 80,
      stabilityScore: 70,
      jobChangeFrequencyScore: 60,
      jobHopper: false,
    },
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        onClose={handleClose}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" className="fw-bold">
            JD vs CV Analysis Details
          </Typography>
          <Typography className="btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-1">
            <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Score</th>
                <td>{analysisReport?.score}%</td>
              </tr>
              <tr>
                <th>Match reason</th>
                <td>{analysisReport?.matchReason}</td>
              </tr>
              <tr>
                <th>Roles Matching</th>
                <td>
                  {analysisReport?.details?.rolesMatch === true
                    ? "true"
                    : "false"}
                </td>
              </tr>
              <tr>
                <th>Skill Match</th>
                <td>
                  {Object.entries(analysisReport?.details?.skillsMatch).map(
                    ([key, value]) => (
                      <div key={key}>
                        <strong>{key} :</strong> {value}%
                      </div>
                    )
                  )}
                </td>
              </tr>
              <tr>
                <th>Experience Match</th>
                <td>{analysisReport?.details?.experienceMatch}%</td>
              </tr>
              <tr>
                <th>Education Match</th>
                <td>{analysisReport?.details?.educationMatch}%</td>
              </tr>
              <tr>
                <th>Location Match</th>
                <td>{analysisReport?.details?.locationMatch}%</td>
              </tr>
              <tr>
                <th>Domain Match</th>
                <td>{analysisReport?.details?.domainMatch}%</td>
              </tr>
              <tr>
                <th>Stability Score</th>
                <td>{analysisReport?.details?.stabilityScore}%</td>
              </tr>
              <tr>
                <th>Job Change Frequency Score</th>
                <td>{analysisReport?.details?.jobChangeFrequencyScore}%</td>
              </tr>
              <tr>
                <th>Job Hopper</th>
                <td>
                  {analysisReport?.details?.jobHopper === true
                    ? "true"
                    : "false"}
                </td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewJDvsCVAnalysis;
