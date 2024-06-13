import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

interface AddProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  // Add your form fields here
}

const Form: React.FC = () => {
  // -----------  validationSchema
  const validationSchema = yup.object({
    // Define your validation schema here
  });

  // -----------   initialValues
  const initialValues: FormValues = {
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    emailAddress: "",
    address: "",
    leadSource: "0",
    leadStatus: "",
    leadScore: "",
    alternatePhoneNumber: "",
    additionalEmailAddress: "",
    instagramProfile: "",
    twitterProfile: "",
    typeOfInsurance: "",
    desiredCoverageAmount: "",
    specificPolicyFeatures: "",
    QualificationStatus: "",
    policyType: "",
    policyNumber: "",
    startDate: "",
    endDate: "",
    coverageAmount: "",
    termLength: "",
    conversionReason: "",
    conversionDateTime: "",
    leadCategory: "",
    leadPriority: "",
    assigned_agent: "",
  };

  // formik
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        // Handle form submission
      } catch (error) {
        // Handle error
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form style={{ marginTop: "50px" }}>
        <Typography
          style={{ marginBottom: "15px", marginTop: "15px" }}
          variant="h6"
        >
          Job Location
        </Typography>
        {/* <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
          <Grid item xs={12} sm={4} md={4}>
            <FormLabel>City</FormLabel>
            <TextField
              id="city"
              name="city"
              label=""
              size="small"
              maxRows={10}
              fullWidth
              //   value={formik.values.firstName}
              //   onChange={formik.handleChange}
              //   error={
              //     formik.touched.firstName && Boolean(formik.errors.firstName)
              //   }
              //   helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormLabel>State</FormLabel>
            <TextField
              id="state"
              name="state"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <FormLabel>Country</FormLabel>
            <TextField
              id="country"
              name="country"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid> */}
        <Grid
          container
          rowSpacing={3}
          mt={2}
          columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        >
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Minimum Salary</FormLabel>
            <TextField
              id="minimumSalary"
              name="minimumSalary"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
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
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <FormLabel>Work Type</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="jobType"
                name="jobType"
                size="small"
                fullWidth
                // value={formik.values.workType}
                // onChange={formik.handleChange}
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
                // value={formik.values.workType}
                // onChange={formik.handleChange}
              >
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Contract Duration(if contract)</FormLabel>
            <TextField
              id="maximumSalary"
              name="maximumSalary"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid>
        <Typography
          style={{ marginBottom: "15px", marginTop: "15px" }}
          variant="h6"
        >
          Skills List
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Skill Name</FormLabel>
            <TextField
              id="skillName"
              name="skillName"
              label=""
              multiline
              rows={2}
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Category</FormLabel>
            <TextField
              id="category"
              name="category"
              label=""
              multiline
              rows={2}
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Alternative Skills</FormLabel>
            <TextField
              id="alternativeSkills"
              name="alternativeSkills"
              label=""
              multiline
              rows={2}
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Usage Context</FormLabel>
            <TextField
              id="usage context"
              name="usage context"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Mandatory</FormLabel>
            <TextField
              id="mandatory"
              name="mandatory"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Relevant Experience</FormLabel>
            <TextField
              id="relevantExperience"
              name="relevantExperience"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid>

        <Typography
          style={{ marginBottom: "15px", marginTop: "15px" }}
          variant="h6"
        >
          Certification
        </Typography>
        <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Certification Name</FormLabel>
            <TextField
              id="certificationName"
              name="certificationName"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Certification Vendor </FormLabel>
            <TextField
              id="certificationVendor"
              name="certificationVendor"
              label=""
              size="small"
              fullWidth
              //   value={formik.values.lastName}
              //   onChange={formik.handleChange}
              //   error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              //   helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
        </Grid>

        <Grid
          container
          rowSpacing={3}
          mt={2}
          columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        >
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Education Qualification</FormLabel>
            <TextField
              id="educationQualification"
              name="educationQualification"
              multiline
              rows={2}
              //   type="number"
              size="small"
              fullWidth
              //   value={formik.values.educationQualification}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Jd Summary</FormLabel>
            <TextField
              id="jdSummary"
              name="jdSummary"
              multiline
              rows={2}
              //   type="number"
              size="small"
              fullWidth
              //   value={formik.values.educationQualification}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Job Responsibilities</FormLabel>
            <TextField
              id="jobResponsibilities"
              name="jobResponsibilities"
              size="small"
              multiline
              rows={2}
              fullWidth
              //   value={formik.values.jobResponsibilities}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Job Requirements</FormLabel>
            <TextField
              id="jobRequirements"
              name="jobRequirements"
              size="small"
              multiline
              rows={2}
              fullWidth
              //   value={formik.values.jobResponsibilities}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Company Name</FormLabel>
            <TextField
              id="companyName"
              name="companyName"
              size="small"
              fullWidth
              //   value={formik.values.jobResponsibilities}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Company Website</FormLabel>
            <TextField
              id="companyWebsite"
              name="companyWebsite"
              size="small"
              fullWidth
              //   value={formik.values.jobResponsibilities}
              //   onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <FormLabel>Company Headquarter</FormLabel>
            <TextField
              id="companyHeadquarter"
              name="companyHeadquarter"
              size="small"
              fullWidth
              //   value={formik.values.jobResponsibilities}
              //   onChange={formik.handleChange}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Form;
