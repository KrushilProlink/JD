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

interface FormValues {
  // Add your form fields here
}

const BasicDetails: React.FC<Props> = (props) => {
  const { formik } = props;
  return (
    <div
      className="mt-5 pt-4 mx-5 px-5"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        style={{ width: "50%" }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">First Name</FormLabel>
          <TextField
            id="firstName"
            name="firstName"
            label=""
            className="input-txt"
            size="small"
            maxRows={10}
            fullWidth
            value={formik?.values?.firstName}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.firstName && Boolean(formik?.errors?.firstName)
            }
            helperText={formik?.touched?.firstName && formik?.errors?.firstName}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">Last Name</FormLabel>
          <TextField
            id="lastName"
            name="lastName"
            label=""
            className="input-txt"
            size="small"
            fullWidth
            value={formik?.values?.lastName}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.lastName && Boolean(formik?.errors?.lastName)
            }
            helperText={formik?.touched?.lastName && formik?.errors?.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <FormLabel className="fw-bold">Country Code</FormLabel>
          <TextField
            id="phone.countryCode"
            name="phone.countryCode"
            label=""
            className="input-txt"
            size="small"
            fullWidth
            value={formik?.values?.phone?.countryCode}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.phone?.countryCode &&
              Boolean(formik?.errors?.phone.countryCode)
            }
            helperText={
              formik?.touched?.phone?.countryCode &&
              formik?.errors?.phone?.countryCode
            }
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <FormLabel className="fw-bold">Number</FormLabel>
          <TextField
            id="phone.number"
            name="phone.number"
            label=""
            className="input-txt"
            size="small"
            fullWidth
            value={formik?.values?.phone?.number}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.phone?.number &&
              Boolean(formik?.errors?.phone?.number)
            }
            helperText={
              formik?.touched?.phone?.number && formik?.errors?.phone?.number
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <FormLabel className="fw-bold">Email Address</FormLabel>
          <TextField
            id="emailAddress"
            name="emailAddress"
            label=""
            className="input-txt"
            size="small"
            fullWidth
            value={formik?.values?.emailAddress}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.emailAddress &&
              Boolean(formik?.errors?.emailAddress)
            }
            helperText={
              formik?.touched?.emailAddress && formik?.errors?.emailAddress
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicDetails;
