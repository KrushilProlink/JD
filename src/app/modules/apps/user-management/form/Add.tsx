/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FieldArray, FormikHelpers, useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  Grid,
  FormLabel,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  FormHelperText,
  Chip,
} from "@mui/material";
import { MyDropzone } from "./FileUload";
import { useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Badge, Form } from "react-bootstrap";

const steps = [
  "Upload JD",
  "Basic Details",
  "Skills",
  "Certification Details",
  "Education Qualification",
  "Job Regarding",
  "Company Details",
];

interface AddProps {
  open: boolean;
  handleClose: () => void;
}

interface Certification {
  name: string;
  vendor: string;
}
interface FormValues {
  addQualifications: string;
  qualifications: any;
  skills: any;
  addSkills: string;
  alternativeSkills: any;
  addAlternativeSkills: string;
  addAltSkills: string;
}

const Add: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [qualificationsInput, setQualificationsInput] = React.useState("");
  const [skillsInput, setSkillsInput] = React.useState("");
  const [altSkillsInput, setAltSkillsInput] = React.useState("");
  const [err, setErr] = React.useState("");
  const [certifications, setCertifications] = React.useState<Certification[]>([
    { name: "", vendor: "" },
  ]);

  const handleAddCertification = () => {
    setCertifications([...certifications, { name: "", vendor: "" }]);
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCertifications = certifications.map((certification, i) => {
      if (i === index) {
        return { ...certification, [event.target.name]: event.target.value };
      }
      return certification;
    });
    setCertifications(newCertifications);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQualificationsInput(event.target.value);
  };

  const handleSkillsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkillsInput(event.target.value);
  };

  const handleAltSkillsInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAltSkillsInput(event.target.value);
  };

  const navigate = useNavigate();
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  // -----------  validationSchema
  const validationSchema = yup.object({
    // Define your validation schema here
  });

  // -----------   initialValues
  const initialValues: FormValues = {
    // Define your initial form values here
    qualifications: [],
    addQualifications: "",
    skills: [],
    addSkills: "",
    alternativeSkills: [],
    addAlternativeSkills: "",
    addAltSkills: "",
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

  const addTagsButton = (e: any) => {
    if (e.key === "Enter" && qualificationsInput.trim() !== "") {
      e.preventDefault();
      if (qualificationsInput !== "") {
        if (
          formik.values?.qualifications?.find(
            (tag: any) => tag === qualificationsInput
          )
        ) {
          setErr("Qualifications is already exists");
        } else {
          formik.setFieldValue("qualifications", [
            ...formik.values?.qualifications,
            qualificationsInput,
          ]);
          setQualificationsInput("");
          setErr("");
        }
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...formik.values?.qualifications];
    newTags.splice(index, 1);
    formik.setFieldValue("qualifications", newTags);
  };

  const addSkillsTagsButton = (event: any) => {
    if (event.key === "Enter" && skillsInput.trim() !== "") {
      event.preventDefault();

      if (skillsInput !== "") {
        if (formik.values?.skills?.find((tag: any) => tag === skillsInput)) {
          setErr("Skills is already exists");
        } else {
          formik.setFieldValue("skills", [
            ...formik.values?.skills,
            skillsInput,
          ]);
          setSkillsInput("");
          setErr("");
        }
      }
    }
  };

  const removeSkillsTag = (index: number) => {
    const newTags = [...formik.values?.skills];
    newTags.splice(index, 1);
    formik.setFieldValue("skills", newTags);
  };

  const addAltSkillsTagsButton = (event: any) => {
    if (event.key === "Enter" && altSkillsInput.trim() !== "") {
      event.preventDefault();

      if (altSkillsInput !== "") {
        if (
          formik.values?.alternativeSkills?.find(
            (tag: any) => tag === altSkillsInput
          )
        ) {
          setErr("Skills is already exists");
        } else {
          formik.setFieldValue("alternativeSkills", [
            ...formik.values?.alternativeSkills,
            altSkillsInput,
          ]);
          setAltSkillsInput("");
          setErr("");
        }
      }
    }
  };

  const removeAltSkillsTag = (index: number) => {
    const newTags = [...formik.values?.alternativeSkills];
    newTags.splice(index, 1);
    formik.setFieldValue("alternativeSkills", newTags);
  };

  return (
    <div>
      <div className="card-header border-0 pt-6">
        <div>
          <button
            type="button"
            className="btn btn-light-primary"
            onClick={() => navigate(-1)}
          >
            <span>
              <ChevronLeftIcon className="fs-1" />
            </span>
            <span className="">Back</span>
          </button>
        </div>
      </div>
      <div className="card-body py-3">
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel className="py-5">
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              // if (isStepOptional(index)) {
              //   labelProps.optional = (
              //     <Typography variant="caption">Optional</Typography>
              //   );
              // }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={{ textAlign: "center", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={() => {
                    handleReset();
                    navigate(-1);
                  }}
                  variant="outlined"
                >
                  Save
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box>
                {activeStep === 0 && (
                  <MyDropzone handleChangeStep={() => setActiveStep(1)} />
                )}
              </Box>
              <Box mt={3}>
                {activeStep === 1 && (
                  <>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                    >
                      <Grid item xs={12} sm={6} md={6}>
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
                      <Grid item xs={12} sm={6} md={6}>
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
                      <Grid item xs={12} sm={6} md={6}>
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
                      <Grid item xs={12} sm={6} md={6}>
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
                  </>
                )}
              </Box>
              <Box mt={3} display={"flex"} justifyContent={"center"}>
                {activeStep === 2 && (
                  <>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                      style={{ width: "50%" }}
                    >
                      <Grid item xs={12}>
                        <FormLabel>Skills Name</FormLabel>
                        <ul
                          id="tags"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "100%",
                            marginBottom: "0px",
                            border:
                              formik.values?.skills?.length > 0
                                ? "1px solid #dce0e4"
                                : "0",
                            padding:
                              formik.values?.skills?.length > 0 ? "5px" : "0",
                          }}
                        >
                          {formik.values?.skills?.map(
                            (tag: any, index: number) => (
                              <li
                                key={index}
                                style={{
                                  display: "flex",
                                  listStyle: "none",
                                  margin: "0 5px 5px 5px",
                                  backgroundColor: "grey",
                                  padding: "2px 5px 2px 8px",
                                  borderRadius: "20px",
                                  color: "#fff",
                                  fontSize: "12px",
                                  alignItems: "center",
                                }}
                              >
                                <span>{tag}</span>
                                <IoMdCloseCircleOutline
                                  style={{
                                    fontSize: "14px",
                                    color: "#fff",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => removeSkillsTag(index)}
                                />
                              </li>
                            )
                          )}
                          <TextField
                            name="addSkills"
                            type="text"
                            size="small"
                            fullWidth
                            value={skillsInput}
                            placeholder="Add Skills"
                            onChange={(e: any) => {
                              handleSkillsInputChange(e);
                            }}
                            onKeyDown={(event: any) =>
                              addSkillsTagsButton(event)
                            }
                            error={
                              formik.touched.addSkills &&
                              Boolean(formik.errors.addSkills)
                            }
                            helperText={
                              formik.touched.addSkills &&
                              formik.errors.addSkills
                            }
                          />
                        </ul>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Category</FormLabel>
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
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Usage Context</FormLabel>
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
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Alternative Skills</FormLabel>
                        <ul
                          id="tags"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "100%",
                            marginBottom: "0px",
                            border:
                              formik.values?.alternativeSkills?.length > 0
                                ? "1px solid #dce0e4"
                                : "0",
                            padding:
                              formik.values?.alternativeSkills?.length > 0
                                ? "5px"
                                : "0",
                          }}
                        >
                          {formik.values?.alternativeSkills?.map(
                            (tag: any, index: number) => (
                              <li
                                key={index}
                                style={{
                                  display: "flex",
                                  listStyle: "none",
                                  margin: "0 5px 5px 5px",
                                  backgroundColor: "grey",
                                  padding: "2px 5px 2px 8px",
                                  borderRadius: "20px",
                                  color: "#fff",
                                  fontSize: "12px",
                                  alignItems: "center",
                                }}
                              >
                                <span>{tag}</span>
                                <IoMdCloseCircleOutline
                                  style={{
                                    fontSize: "14px",
                                    color: "#fff",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => removeAltSkillsTag(index)}
                                />
                              </li>
                            )
                          )}
                          <TextField
                            name="addAltSkills"
                            type="text"
                            size="small"
                            fullWidth
                            value={altSkillsInput}
                            placeholder="Add Alt Skills"
                            onChange={(e: any) => {
                              handleAltSkillsInputChange(e);
                            }}
                            onKeyDown={(event: any) =>
                              addAltSkillsTagsButton(event)
                            }
                            error={
                              formik.touched.addAltSkills &&
                              Boolean(formik.errors.addAltSkills)
                            }
                            helperText={
                              formik.touched.addAltSkills &&
                              formik.errors.addAltSkills
                            }
                          />
                        </ul>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Mandatory</FormLabel>
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
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Relevant Experience</FormLabel>
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
                    </Grid>
                  </>
                )}
              </Box>
              <Box mt={3}>
                {activeStep === 3 && (
                  <>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                      style={{ display: "flex", alignItems: "end" }}
                    >
                      {certifications?.map((certification, index) => (
                        <>
                          <Grid item xs={12} sm={5} md={5}>
                            <FormLabel>Certification Name</FormLabel>
                            <TextField
                              id={`certificationName-${index}`}
                              name="name"
                              value={certification.name}
                              onChange={(event: any) =>
                                handleChange(index, event)
                              }
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} sm={5} md={5}>
                            <FormLabel>Certification Vendor</FormLabel>
                            <TextField
                              id={`certificationVendor-${index}`}
                              name="vendor"
                              value={certification.vendor}
                              onChange={(event: any) =>
                                handleChange(index, event)
                              }
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={2}
                            md={2}
                            alignItems={"center"}
                          >
                            {index > 0 && (
                              <IconButton
                                onClick={() => handleRemoveCertification(index)}
                              >
                                <MdRemoveCircleOutline />
                              </IconButton>
                            )}
                            {index === certifications.length - 1 && (
                              <IconButton onClick={handleAddCertification}>
                                <MdAddCircleOutline />
                              </IconButton>
                            )}
                          </Grid>
                        </>
                      ))}
                    </Grid>
                  </>
                )}
              </Box>
              <Box mt={3} display={"flex"} justifyContent={"center"}>
                {activeStep === 4 && (
                  <>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                      style={{
                        width: "50%",
                      }}
                    >
                      <Grid item xs={12}>
                        <FormLabel>Education Qualification</FormLabel>
                        <ul
                          id="tags"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "100%",
                            border:
                              formik.values?.qualifications?.length > 0
                                ? "1px solid #dce0e4"
                                : "0",
                            padding:
                              formik.values?.qualifications?.length > 0
                                ? "5px"
                                : "0",
                          }}
                        >
                          {formik.values?.qualifications?.map(
                            (tag: any, index: number) => (
                              <li
                                key={index}
                                style={{
                                  display: "flex",
                                  listStyle: "none",
                                  margin: "0 5px 5px 5px",
                                  backgroundColor: "grey",
                                  padding: "2px 5px 2px 8px",
                                  borderRadius: "20px",
                                  color: "#fff",
                                  fontSize: "12px",
                                  alignItems: "center",
                                }}
                              >
                                <span>{tag}</span>
                                <IoMdCloseCircleOutline
                                  style={{
                                    fontSize: "14px",
                                    color: "#fff",
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => removeTag(index)}
                                />
                              </li>
                            )
                          )}
                          <TextField
                            name="addQualifications"
                            type="text"
                            size="small"
                            fullWidth
                            value={qualificationsInput}
                            placeholder="Add Qualifications"
                            onChange={(e: any) => {
                              handleInputChange(e);
                            }}
                            onKeyDown={(event: any) => addTagsButton(event)}
                            error={
                              formik.touched.addQualifications &&
                              Boolean(formik.errors.addQualifications)
                            }
                            helperText={
                              formik.touched.addQualifications &&
                              formik.errors.addQualifications
                            }
                          />
                        </ul>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                {activeStep === 5 && (
                  <>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 0, sm: 5, md: 4 }}
                      style={{ width: "50%" }}
                    >
                      <Grid item xs={12} sm={12} md={12}>
                        <FormLabel>Jd Summary</FormLabel>
                        <TextField
                          id="jdSummary"
                          name="jdSummary"
                          multiline
                          rows={3}
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
                          rows={3}
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
                          rows={3}
                          fullWidth
                          //   value={formik.values.jobResponsibilities}
                          //   onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                {activeStep === 6 && (
                  <>
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
                          //   value={formik.values.jobResponsibilities}
                          //   onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12}>
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
                  </>
                )}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 5, pb: 4 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} variant="outlined">
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Add;
