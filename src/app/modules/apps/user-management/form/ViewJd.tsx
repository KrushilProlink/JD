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

const ViewJd: React.FC<Props> = ({ open, handleClose }) => {
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
            JD Details
          </Typography>
          <Typography className="btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-1">
            <ClearIcon onClick={handleClose} style={{ cursor: "pointer" }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>JD ID</th>
                <td>10</td>
              </tr>
              <tr>
                <th>Title</th>
                <td>Software Engineer</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>Develop and maintain applications</td>
              </tr>
              <tr>
                <th>Requirements</th>
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
            </tbody>
          </table>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewJd;
