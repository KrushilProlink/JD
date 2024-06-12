/* eslint-disable react/prop-types */
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormikHelpers, useFormik } from "formik";
import * as React from "react";
import * as yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { MyDropzone } from "./FileUload";
import Form from "./Form";
import { useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const steps = ["Upload JD", "Form to fill the requirement"];

interface AddProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  // Add your form fields here
}

const Add: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
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
          <Stepper activeStep={activeStep} className="py-5">
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
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset} variant="outlined">
                  Back
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
              <Box>{activeStep === 1 && <Form />}</Box>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
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
