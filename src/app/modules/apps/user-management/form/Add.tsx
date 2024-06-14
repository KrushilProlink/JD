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
import { MyDropzone } from "../components/FileUload";
import { useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Badge, Form } from "react-bootstrap";
import BasicDetails from "./recruiterStepperForm/BasicDetails";
import Skills from "./recruiterStepperForm/Skills";
import CertificationDetails from "./recruiterStepperForm/CertificationDetails";
import EducationQualification from "./recruiterStepperForm/EducationQualification";
import JobRegarding from "./recruiterStepperForm/JobRegarding";
import CompanyDetails from "./recruiterStepperForm/CompanyDetails";

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
  const [initialValue, setInitialValue] = React.useState<any>({
    role: "",
    minimumExperience: "",
    maximumExperience: "",
    jobLocation: {
      city: "",
      state: "",
      country: "",
    },
    minimumSalary: "",
    maximumSalary: "",
    workType: "",
    jobType: "",
    contractDuration: "",
    skills: [],
    category: "",
    usageContext: "",
    alternativeSkills: [],
    mandatory: "",
    relevantExperience: "",
    certifications: [
      {
        certificationName: "",
        certificationVendor: "",
      },
    ],
    qualifications: [],
    jdSummary: "",
    jobResponsibilities: "",
    jobRequirements: "",
    companyName: "",
    companyWebsite: "",
    companyHeadquarter: "",
  });
  const [formValue, setFormValue] = React.useState<any>({});

  const basicDetailsFormInitialValue = {
    role: "",
    minimumExperience: "",
    maximumExperience: "",
    jobLocation: {
      city: "",
      state: "",
      country: "",
    },
    minimumSalary: "",
    maximumSalary: "",
    workType: "",
    jobType: "",
    contractDuration: "",
  };
  const skillsFormInitialValue = {
    skills: [],
    category: "",
    usageContext: "",
    alternativeSkills: [],
    mandatory: "",
    relevantExperience: "",
  };
  const certificationFormInitialValue = {
    certifications: [
      {
        certificationName: "",
        certificationVendor: "",
      },
    ],
  };

  const qualificationFormInitialValue = {
    qualifications: [],
  };
  const jobRegardingFormInitialValue = {
    jdSummary: "",
    jobResponsibilities: "",
    jobRequirements: "",
  };
  const companyDetailsFormInitialValue = {
    companyName: "",
    companyWebsite: "",
    companyHeadquarter: "",
  };

  const navigate = useNavigate();
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // const handleNext = () => {
  //   let newSkipped = skipped;
  //   if (isStepSkipped(activeStep)) {
  //     newSkipped = new Set(newSkipped.values());
  //     newSkipped.delete(activeStep);
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped(newSkipped);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };
  const handleNext = async (values: any, validateForm?: any) => {
    const valid = await validateForm();

    if (Object.keys(valid).length > 0) {
      return;
    }

    setFormValue((prevValues: any) => ({
      ...prevValues,
      [activeStep]: values,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (values: any) => {
    setFormValue((prevValues: any) => ({
      ...prevValues,
      [activeStep]: values,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const validationSchema = yup.object({
    // Define your validation schema here
  });

  const steps = [
    {
      label: "Upload JD",
      validation: validationSchema,
      initialValue: basicDetailsFormInitialValue,
      component: (
        <MyDropzone
          handleChangeStep={() => setActiveStep(1)}
          title="Upload JD"
        />
      ),
    },
    {
      label: "Basic Details",
      validation: validationSchema,
      initialValue: basicDetailsFormInitialValue,
      component: <BasicDetails />,
    },
    {
      label: "Skills",
      validation: validationSchema,
      initialValue: skillsFormInitialValue,
      component: <Skills />,
    },
    {
      label: "Certification Details",
      validation: validationSchema,
      initialValue: certificationFormInitialValue,
      component: <CertificationDetails />,
    },
    {
      label: "Education Qualification",
      validation: validationSchema,
      initialValue: qualificationFormInitialValue,
      component: <EducationQualification />,
    },
    {
      label: "Job Regarding",
      validation: validationSchema,
      initialValue: jobRegardingFormInitialValue,
      component: <JobRegarding />,
    },
    {
      label: "Company Details",
      validation: validationSchema,
      initialValue: companyDetailsFormInitialValue,
      component: <CompanyDetails />,
    },
  ];

  const formValues = formValue[activeStep]
    ? formValue[activeStep]
    : steps[activeStep]?.initialValue;

  // formik
  const formik = useFormik<FormValues>({
    initialValues: formValues,
    validationSchema: steps[activeStep]?.validation,
    enableReinitialize: true,
    onSubmit: async (
      values: FormValues,

      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      console.log("values--------------::", values);
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
            {steps.map((item, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step
                  key={item?.label}
                  {...stepProps}
                  style={{ fontSize: "25px" }}
                >
                  <StepLabel {...labelProps}>{item?.label}</StepLabel>
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
              {steps?.map((item, index) => (
                // <Box mt={3}>{activeStep === index && item?.component}</Box>
                <Box mt={3}>
                  {activeStep === index &&
                    React.cloneElement(item.component, { formik })}
                </Box>
              ))}

              <Box sx={{ display: "flex", flexDirection: "row", pt: 5, pb: 4 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={() => handleBack(formik?.values)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={() =>
                    handleNext(formik?.values, formik?.validateForm)
                  }
                  type={activeStep === steps.length - 1 ? "submit" : "button"}
                  variant="outlined"
                >
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
