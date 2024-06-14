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
    <div>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Role</FormLabel>
          <TextField
            id="role"
            name="role"
            label=""
            size="small"
            maxRows={10}
            fullWidth
            value={formik?.values?.role}
            onChange={formik?.handleChange}
            error={formik?.touched?.role && Boolean(formik?.errors?.role)}
            helperText={formik?.touched?.role && formik?.errors?.role}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Minimum Experience</FormLabel>
          <TextField
            id="minimumExperience"
            name="minimumExperience"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.minimumExperience}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.minimumExperience &&
              Boolean(formik?.errors?.minimumExperience)
            }
            helperText={
              formik?.touched?.minimumExperience &&
              formik?.errors?.minimumExperience
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Maximum Experience</FormLabel>
          <TextField
            id="maximumExperience"
            name="maximumExperience"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.maximumExperience}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.maximumExperience &&
              Boolean(formik?.errors?.maximumExperience)
            }
            helperText={
              formik?.touched?.maximumExperience &&
              formik?.errors?.maximumExperience
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>City</FormLabel>
          <TextField
            id="city"
            name="jobLocation.city"
            label=""
            size="small"
            maxRows={10}
            fullWidth
            value={formik?.values?.jobLocation?.city}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.jobLocation?.city &&
              Boolean(formik?.errors?.jobLocation?.city)
            }
            helperText={
              formik?.touched?.jobLocation?.city &&
              formik?.errors?.jobLocation?.city
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>State</FormLabel>
          <TextField
            id="state"
            name="jobLocation.state"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.jobLocation?.state}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.jobLocation?.state &&
              Boolean(formik?.errors?.jobLocation?.state)
            }
            helperText={
              formik?.touched?.jobLocation?.state &&
              formik?.errors?.jobLocation?.state
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Country</FormLabel>
          <TextField
            id="country"
            name="jobLocation.country"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.jobLocation?.country}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.jobLocation?.country &&
              Boolean(formik?.errors?.jobLocation?.country)
            }
            helperText={
              formik?.touched?.jobLocation?.country &&
              formik?.errors?.jobLocation?.country
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Minimum Salary</FormLabel>
          <TextField
            id="minimumSalary"
            name="minimumSalary"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.minimumSalary}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.minimumSalary &&
              Boolean(formik?.errors?.minimumSalary)
            }
            helperText={
              formik?.touched?.minimumSalary && formik?.errors?.minimumSalary
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Maximum Salary</FormLabel>
          <TextField
            id="maximumSalary"
            name="maximumSalary"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.maximumSalary}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.maximumSalary &&
              Boolean(formik?.errors?.maximumSalary)
            }
            helperText={
              formik?.touched?.maximumSalary && formik?.errors?.maximumSalary
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <FormLabel>Work Type</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="workType"
              name="workType"
              size="small"
              fullWidth
              value={formik?.values?.workType}
              onChange={formik?.handleChange}
            >
              <MenuItem value="remote">Remote</MenuItem>
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="office">Office</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormControl fullWidth>
            <FormLabel>Job Type</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="jobType"
              name="jobType"
              size="small"
              fullWidth
              value={formik?.values?.jobType}
              onChange={formik?.handleChange}
            >
              <MenuItem value="permanent">Permanent</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel>Contract Duration(if contract)</FormLabel>
          <TextField
            id="contractDuration"
            name="contractDuration"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.contractDuration}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.contractDuration &&
              Boolean(formik?.errors?.contractDuration)
            }
            helperText={
              formik?.touched?.contractDuration &&
              formik?.errors?.contractDuration
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BasicDetails;
