import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface Props {
  formik?: any;
}

const Skills: React.FC<Props> = (props) => {
  const { formik } = props;
  const [skillsInput, setSkillsInput] = React.useState("");
  const [altSkillsInput, setAltSkillsInput] = React.useState("");
  const [err, setErr] = React.useState("");

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

  const addSkillsTagsButton = (event: any) => {
    if (event.key === "Enter" && skillsInput?.trim() !== "") {
      event.preventDefault();

      if (skillsInput !== "") {
        if (formik?.values?.skills?.find((tag: any) => tag === skillsInput)) {
          setErr("Skills is already exists");
        } else {
          formik.setFieldValue("skills", [
            ...formik?.values?.skills,
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
    if (event.key === "Enter" && altSkillsInput?.trim() !== "") {
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
            ...formik?.values?.alternativeSkills,
            altSkillsInput,
          ]);
          setAltSkillsInput("");
          setErr("");
        }
      }
    }
  };

  const removeAltSkillsTag = (index: number) => {
    const newTags = [...formik?.values?.alternativeSkills];
    newTags.splice(index, 1);
    formik.setFieldValue("alternativeSkills", newTags);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="mt-5 pt-4 mx-5 px-5">
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
      >
        <Grid item  xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Skills Name</FormLabel>
          <ul
            id="tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginBottom: "0px",
              border:
                formik?.values?.skills?.length > 0 ? "1px solid #dce0e4" : "0",
              padding: formik?.values?.skills?.length > 0 ? "5px" : "0",
            }}
          >
            {formik?.values?.skills?.map((tag: any, index: number) => (
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
            ))}
            <TextField
              name="skills"
              type="text"
              size="small"
              fullWidth
              value={skillsInput}
              placeholder="Add Skills"
              onChange={(e: any) => {
                handleSkillsInputChange(e);
              }}
              onKeyDown={(event: any) => addSkillsTagsButton(event)}
              error={formik?.touched?.skills && Boolean(formik?.errors?.skills)}
              helperText={formik?.touched?.skills && formik?.errors?.skills}
            />
          </ul>
        </Grid>
        <Grid item  xs={12} sm={6} md={6} >
          <FormLabel className="fw-bold">Category</FormLabel>
          <TextField
            id="category"
            name="category"
            label=""
            size="small"
            maxRows={10}
            fullWidth
            value={formik?.values?.category}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.category && Boolean(formik?.errors?.category)
            }
            helperText={formik?.touched?.category && formik?.errors?.category}
          />
        </Grid>
        <Grid item  xs={12} sm={6} md={6} >
          <FormLabel className="fw-bold">Usage Context</FormLabel>
          <TextField
            id="usageContext"
            name="usageContext"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.usageContext}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.usageContext &&
              Boolean(formik?.errors?.usageContext)
            }
            helperText={
              formik?.touched?.usageContext && formik?.errors?.usageContext
            }
          />
        </Grid>
        <Grid item  xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Alternative Skills</FormLabel>
          <ul
            id="tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginBottom: "0px",
              border:
                formik?.values?.alternativeSkills?.length > 0
                  ? "1px solid #dce0e4"
                  : "0",
              padding:
                formik?.values?.alternativeSkills?.length > 0 ? "5px" : "0",
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
              name="alternativeSkills"
              type="text"
              size="small"
              fullWidth
              value={altSkillsInput}
              placeholder="Add Alt Skills"
              onChange={(e: any) => {
                handleAltSkillsInputChange(e);
              }}
              onKeyDown={(event: any) => addAltSkillsTagsButton(event)}
              error={
                formik?.touched?.alternativeSkills &&
                Boolean(formik?.errors?.alternativeSkills)
              }
              helperText={
                formik?.touched?.alternativeSkills &&
                formik?.errors?.alternativeSkills
              }
            />
          </ul>
        </Grid>
        <Grid item  xs={12} sm={6} md={6} >
          <FormLabel className="fw-bold">Mandatory</FormLabel>
          <TextField
            id="mandatory"
            name="mandatory"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.mandatory}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.mandatory && Boolean(formik?.errors?.mandatory)
            }
            helperText={formik?.touched?.mandatory && formik?.errors?.mandatory}
          />
        </Grid>
        <Grid item  xs={12} sm={6} md={6} >
          <FormLabel className="fw-bold">Relevant Experience</FormLabel>
          <TextField
            id="relevantExperience"
            name="relevantExperience"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.relevantExperience}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.relevantExperience &&
              Boolean(formik?.errors?.relevantExperience)
            }
            helperText={
              formik?.touched?.relevantExperience &&
              formik?.errors?.relevantExperience
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Skills;
