/* eslint-disable react/prop-types */
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Check from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SchoolIcon from "@mui/icons-material/School";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import WorkIcon from "@mui/icons-material/Work";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/material/styles";
import { FormikHelpers, useFormik } from "formik";
import * as React from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { MyDropzone } from "../components/FileUload";
import BasicDetails from "./candidateStepperForm/BasicDetails";
import AddressDetails from "./candidateStepperForm/AddressDetails";
import CertificationDetails from "./candidateStepperForm/CertificationDetails";
import EducationDetails from "./candidateStepperForm/EducationDetails";
import ExperienceDetails from "./candidateStepperForm/ExperienceDetails";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#1b84ff",
    }),
    "& .QontoStepIcon-completedIcon": {
      color: "#1b84ff",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(42,42,215,1) 0%, rgba(0,212,255,1) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(42,42,215,1) 0%, rgba(0,212,255,1) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(42,42,215,1) 0%, rgba(0,212,255,1) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(42,42,215,1) 0%, rgba(0,212,255,1) 100%)",
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <FileUploadIcon />,
    2: <AssignmentIcon />,
    3: <LocationOnIcon />,
    4: <WorkspacePremiumIcon />,
    5: <SchoolIcon />,
    6: <WorkIcon />,
    7: <ApartmentIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

// const QontoConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 10,
//     left: 'calc(-50% + 16px)',
//     right: 'calc(50% + 16px)',
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#1976d2',
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       borderColor: '#1976d2',
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderTopWidth: 3,
//     borderRadius: 1,
//   },
// }));

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

const AddCandidate: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [initialValue, setInitialValue] = React.useState<any>({
    firstName: "",
    lastName: "",
    phone: {
      countryCode: "",
      number: "",
    },
    emailAddress: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
    certifications: [
      {
        name: "",
        issueDate: "",
        expirationDate: "",
        issuedBy: "",
      },
    ],
    experience: [
      {
        companyName: "",
        startDate: "",
        lastDate: "",
        location: "",
        jobTitle: "",
        comments: "",
      },
    ],
    degree: [],
    major: "",
    score: "",
    issuedOn: "",
    school_collegeName: "",
    location: "",
  });
  const [formValue, setFormValue] = React.useState<any>({});

  const basicDetailsFormInitialValue = {
    firstName: "",
    lastName: "",
    phone: {
      countryCode: "",
      number: "",
    },
    emailAddress: "",
  };
  const addressFormInitialValue = {
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
  };
  const certificationsFormInitialValue = {
    certifications: [
      {
        name: "",
        issueDate: "",
        expirationDate: "",
        issuedBy: "",
      },
    ],
  };
  const experienceFormInitialValue = {
    experience: [
      {
        companyName: "",
        startDate: "",
        lastDate: "",
        location: "",
        jobTitle: "",
        comments: "",
      },
    ],
  };

  const educationFormInitialValue = {
    degree: [],
    major: "",
    score: "",
    issuedOn: "",
    school_collegeName: "",
    location: "",
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
      label: "Upload CV",
      validation: validationSchema,
      initialValue: "",
      component: (
        <MyDropzone
          handleChangeStep={() => setActiveStep(1)}
          title="Upload CV"
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
      label: "Address",
      validation: validationSchema,
      initialValue: addressFormInitialValue,
      component: <AddressDetails />,
    },
    {
      label: "Certification Details",
      validation: validationSchema,
      initialValue: certificationsFormInitialValue,
      component: <CertificationDetails />,
    },
    {
      label: "Education Details",
      validation: validationSchema,
      initialValue: educationFormInitialValue,
      component: <EducationDetails />,
    },
    {
      label: "Experience Details",
      validation: validationSchema,
      initialValue: experienceFormInitialValue,
      component: <ExperienceDetails />,
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
      <div className="border-0">
        <div>
          <button
            type="button"
            className="btn btn-light-primary mb-5"
            onClick={() => navigate(-1)}
          >
            <span>
              <ChevronLeftIcon className="fs-1" />
            </span>
            <span className="">Back</span>
          </button>
        </div>
      </div>
      <div
        className="card-body py-3 rounded-3"
        style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
      >
        <Box
          sx={{ width: "100%", height: "680px", position: "relative" }}
          pt={3}
          px={2}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<ColorlibConnector />}
            className="py-5"
          >
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
                  style={{ fontSize: "25px", fontWeight: "bold" }}
                >
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    {...labelProps}
                    style={{ fontWeight: "900" }}
                  >
                    {item?.label}
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Box sx={{ textAlign: "center", pt: 4 }} px={5}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button
                  onClick={() => {
                    handleReset();
                    navigate(-1);
                  }}
                  variant="outlined"
                  className="fw-bold"
                >
                  Save
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {steps?.map((item, index) => (
                // <Box mt={3}>{activeStep === index && item?.component}</Box>
                <Box mt={3} style={{ overflowY: "auto" }}>
                  {activeStep === index &&
                    React.cloneElement(item.component, { formik })}
                </Box>
              ))}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 4,
                  position: "absolute",
                  bottom: "18px",
                  width: "97%",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={() => handleBack(formik?.values)}
                  sx={{ mr: 1 }}
                  variant="outlined"
                  className="fw-bold"
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
                  className="fw-bold"
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

export default AddCandidate;
