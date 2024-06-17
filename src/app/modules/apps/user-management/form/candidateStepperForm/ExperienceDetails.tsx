import {
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";

interface Props {
  formik?: any;
}

const ExperienceDetails: React.FC<Props> = (props) => {
  const { formik } = props;
  console.log("formik", formik);

  const handleAddExperience = () => {
    formik.setFieldValue("experience", [
      ...formik?.values?.experience,
      {
        companyName: "",
        startDate: "",
        lastDate: "",
        location: "",
        jobTitle: "",
        comments: "",
      },
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    const newExperience = formik?.values?.experience?.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("experience", newExperience);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newExperience = formik?.values?.experience?.map(
      (exp: any, i: number) => {
        if (i === index) {
          return {
            ...exp,
            [name]: value,
          };
        }
        return exp;
      }
    );
    formik.setFieldValue("experience", newExperience);
  };

  return (
    <div className="mt-5 pt-4 mx-5 px-5" style={{ height: "44vh" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
        {formik?.values?.experience?.map((exp: any, index: number) => (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Company Name</FormLabel>
              <TextField
                id={`companyName-${index}`}
                name="companyName"
                value={exp?.companyName}
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Job Title</FormLabel>
              <TextField
                id={`jobTitle-${index}`}
                name="jobTitle"
                value={exp?.jobTitle}
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Start Date</FormLabel>
              <TextField
                id={`startDate-${index}`}
                name="startDate"
                value={exp?.startDate}
                type="date"
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Last Date</FormLabel>
              <TextField
                id={`lastDate-${index}`}
                name="lastDate"
                value={exp?.lastDate}
                type="date"
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Location</FormLabel>
              <TextField
                id={`location-${index}`}
                name="location"
                value={exp?.location}
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormLabel className="fw-bold">Comments</FormLabel>
              <TextField
                id={`comments-${index}`}
                name="comments"
                value={exp?.comments}
                multiline
                onChange={(event: any) => handleChange(index, event)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={0} sm={0} md={3}></Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              {index > 0 && (
                <IconButton onClick={() => handleRemoveExperience(index)}>
                  <MdRemoveCircleOutline />
                </IconButton>
              )}
              {index === formik?.values?.experience?.length - 1 && (
                <IconButton onClick={handleAddExperience}>
                  <MdAddCircleOutline />
                </IconButton>
              )}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
};

export default ExperienceDetails;
