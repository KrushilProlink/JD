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

const ViewCandidate: React.FC<Props> = ({ open, handleClose }) => {
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
            Candidate Details
          </Typography>
          <Typography className="btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-1">
            <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Candidate Id</th>
                <td>200</td>
              </tr>
              <tr>
                <th>Candidate Name</th>
                <td>Jane Doe</td>
              </tr>
              <tr>
                <th>Email Id</th>
                <td>jane.doe@example.com</td>
              </tr>
              <tr>
                <th>Experience</th>
                <td>4 years</td>
              </tr>
              <tr>
                <th>Skills</th>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Java" />
                    <Chip label="Spring" />
                  </Stack>
                </td>
              </tr>
              <tr>
                <th>Location</th>
                <td>New York, NY</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewCandidate;
