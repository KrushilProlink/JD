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

const AddressDetails: React.FC<Props> = (props) => {
  const { formik } = props;
  return (
    <div className="mt-5 pt-4 mx-5 px-5">
      <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Address Line 1</FormLabel>
          <TextField
            id="addressLineOne"
            name="addressLineOne"
            label=""
            size="small"
            maxRows={10}
            fullWidth
            value={formik?.values?.addressLineOne}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.addressLineOne &&
              Boolean(formik?.errors?.addressLineOne)
            }
            helperText={
              formik?.touched?.addressLineOne && formik?.errors?.addressLineOne
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Address Line 2</FormLabel>
          <TextField
            id="addressLineTwo"
            name="addressLineTwo"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.addressLineTwo}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.addressLineTwo &&
              Boolean(formik?.errors?.addressLineTwo)
            }
            helperText={
              formik?.touched?.addressLineTwo && formik?.errors?.addressLineTwo
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">City</FormLabel>
          <TextField
            id="city"
            name="city"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.city}
            onChange={formik?.handleChange}
            error={formik?.touched?.city && Boolean(formik?.errors?.city)}
            helperText={formik?.touched?.city && formik?.errors?.city}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Zip Code</FormLabel>
          <TextField
            id="zipCode"
            name="zipCode"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.zipCode}
            onChange={formik?.handleChange}
            error={formik?.touched?.zipCode && Boolean(formik?.errors?.zipCode)}
            helperText={formik?.touched?.zipCode && formik?.errors?.zipCode}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">State</FormLabel>
          <TextField
            id="state"
            name="state"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.state}
            onChange={formik?.handleChange}
            error={formik?.touched?.state && Boolean(formik?.errors?.state)}
            helperText={formik?.touched?.state && formik?.errors?.state}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Country</FormLabel>
          <TextField
            id="country"
            name="country"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.country}
            onChange={formik?.handleChange}
            error={formik?.touched?.country && Boolean(formik?.errors?.country)}
            helperText={formik?.touched?.country && formik?.errors?.country}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressDetails;
