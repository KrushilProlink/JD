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

interface FormValues {
  // Add your form fields here
}

const EducationDetails: React.FC<Props> = (props) => {
  const { formik } = props;

  const [inputDegree, setInputDegree] = React.useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDegree(event.target.value);
  };

  const addTagsButton = (event: any) => {
    if (event.key === "Enter" && inputDegree?.trim() !== "") {
      event.preventDefault();

      if (inputDegree !== "") {
        if (formik?.values?.degree?.find((tag: any) => tag === inputDegree)) {
          //   setErr("Skills is already exists");
        } else {
          formik.setFieldValue("degree", [
            ...formik?.values?.degree,
            inputDegree,
          ]);
          setInputDegree("");
        }
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...formik.values?.degree];
    newTags.splice(index, 1);
    formik.setFieldValue("degree", newTags);
  };

  return (
    <div className="mt-5 pt-4 mx-5 px-5" style={{ height: "44vh" }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Degree</FormLabel>
          <ul
            id="tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              marginBottom: "0px",
              border:
                formik?.values?.degree?.length > 0 ? "1px solid #dce0e4" : "0",
              padding: formik?.values?.degree?.length > 0 ? "5px" : "0",
            }}
          >
            {formik?.values?.degree?.map((tag: any, index: number) => (
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
            ))}
            <TextField
              name="degree"
              type="text"
              size="small"
              fullWidth
              value={inputDegree}
              placeholder="Add Degree"
              onChange={(e: any) => {
                handleInputChange(e);
              }}
              onKeyDown={(event: any) => addTagsButton(event)}
              error={formik?.touched?.degree && Boolean(formik?.errors?.degree)}
              helperText={formik?.touched?.degree && formik?.errors?.degree}
            />
          </ul>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Major</FormLabel>
          <TextField
            id="major"
            name="major"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.major}
            onChange={formik?.handleChange}
            error={formik?.touched?.major && Boolean(formik?.errors?.major)}
            helperText={formik?.touched?.major && formik?.errors?.major}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Score</FormLabel>
          <TextField
            id="score"
            name="score"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.score}
            onChange={formik?.handleChange}
            error={formik?.touched?.score && Boolean(formik?.errors?.score)}
            helperText={formik?.touched?.score && formik?.errors?.score}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Issued On</FormLabel>
          <TextField
            id="issuedOn"
            name="issuedOn"
            label=""
            size="small"
            type="date"
            fullWidth
            value={formik?.values?.issuedOn}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.issuedOn && Boolean(formik?.errors?.issuedOn)
            }
            helperText={formik?.touched?.issuedOn && formik?.errors?.issuedOn}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">School/College Name</FormLabel>
          <TextField
            id="school_collegeName"
            name="school_collegeName"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.school_collegeName}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.school_collegeName &&
              Boolean(formik?.errors?.school_collegeName)
            }
            helperText={
              formik?.touched?.school_collegeName &&
              formik?.errors?.school_collegeName
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <FormLabel className="fw-bold">Location</FormLabel>
          <TextField
            id="location"
            name="location"
            label=""
            size="small"
            fullWidth
            value={formik?.values?.location}
            onChange={formik?.handleChange}
            error={
              formik?.touched?.location && Boolean(formik?.errors?.location)
            }
            helperText={formik?.touched?.location && formik?.errors?.location}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationDetails;
