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

const CompanyDetails: React.FC<Props> = (props) => {
  const { formik } = props;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        style={{ width: "50%" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Company Name</FormLabel>
          <TextField
            id="companyName"
            name="companyName"
            size="small"
            fullWidth
            value={formik?.values?.companyName}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.companyName &&
              Boolean(formik?.errors?.companyName)
            }
            helperText={
              formik?.touched?.companyName && formik?.errors?.companyName
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Company Website</FormLabel>
          <TextField
            id="companyWebsite"
            name="companyWebsite"
            size="small"
            fullWidth
            value={formik?.values?.companyWebsite}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.companyWebsite &&
              Boolean(formik?.errors?.companyWebsite)
            }
            helperText={
              formik?.touched?.companyWebsite && formik?.errors?.companyWebsite
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel>Company Headquarter</FormLabel>
          <TextField
            id="companyHeadquarter"
            name="companyHeadquarter"
            size="small"
            fullWidth
            value={formik?.values?.companyHeadquarter}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.companyHeadquarter &&
              Boolean(formik?.errors?.companyHeadquarter)
            }
            helperText={
              formik?.touched?.companyHeadquarter &&
              formik?.errors?.companyHeadquarter
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CompanyDetails;
