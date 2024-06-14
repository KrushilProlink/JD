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

const EducationQualification: React.FC<Props> = (props) => {
  const { formik } = props;
  const [qualificationsInput, setQualificationsInput] = React.useState("");
  const [err, setErr] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQualificationsInput(event.target.value);
  };

  const addTagsButton = (e: any) => {
    if (e.key === "Enter" && qualificationsInput?.trim() !== "") {
      e.preventDefault();
      if (qualificationsInput !== "") {
        if (
          formik?.values?.qualifications?.find(
            (tag: any) => tag === qualificationsInput
          )
        ) {
          setErr("Qualifications is already exists");
        } else {
          formik.setFieldValue("qualifications", [
            ...formik?.values?.qualifications,
            qualificationsInput,
          ]);
          setQualificationsInput("");
          setErr("");
        }
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...formik?.values?.qualifications];
    newTags.splice(index, 1);
    formik.setFieldValue("qualifications", newTags);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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
                formik?.values?.qualifications?.length > 0
                  ? "1px solid #dce0e4"
                  : "0",
              padding: formik?.values?.qualifications?.length > 0 ? "5px" : "0",
            }}
          >
            {formik?.values?.qualifications?.map((tag: any, index: number) => (
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
              name="qualifications"
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
                formik?.touched?.qualifications &&
                Boolean(formik?.errors?.qualifications)
              }
              helperText={
                formik?.touched?.qualifications &&
                formik?.errors?.qualifications
              }
            />
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default EducationQualification;
