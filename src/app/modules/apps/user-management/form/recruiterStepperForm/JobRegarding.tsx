import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";

interface Props {
  formik?: any;
}

const JobRegarding: React.FC<Props> = (props) => {
  const { formik } = props;
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5 pt-4 mx-5 px-5">
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        style={{ width: "50%" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">Jd Summary</FormLabel>
          <TextField
            id="jdSummary"
            name="jdSummary"
            multiline
            rows={3}
            size="small"
            fullWidth
            value={formik?.values?.jdSummary}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.jdSummary && Boolean(formik?.errors?.jdSummary)
            }
            helperText={formik?.touched?.jdSummary && formik?.errors?.jdSummary}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">Job Responsibilities</FormLabel>
          <TextField
            id="jobResponsibilities"
            name="jobResponsibilities"
            size="small"
            multiline
            rows={3}
            fullWidth
            value={formik?.values?.jobResponsibilities}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.jobResponsibilities &&
              Boolean(formik?.errors?.jobResponsibilities)
            }
            helperText={
              formik?.touched?.jobResponsibilities &&
              formik?.errors?.jobResponsibilities
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">Job Requirements</FormLabel>
          <TextField
            id="jobRequirements"
            name="jobRequirements"
            size="small"
            multiline
            rows={3}
            fullWidth
            value={formik?.values?.jobRequirements}
            onChange={formik.handleChange}
            error={
              formik?.touched?.jobRequirements &&
              Boolean(formik?.errors?.jobRequirements)
            }
            helperText={
              formik?.touched?.jobRequirements &&
              formik?.errors?.jobRequirements
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default JobRegarding;
