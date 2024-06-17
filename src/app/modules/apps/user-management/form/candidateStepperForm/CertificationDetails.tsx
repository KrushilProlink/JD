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

const CertificationDetails: React.FC<Props> = (props) => {
  const { formik } = props;
  console.log("formik", formik);

  const handleAddCertification = () => {
    formik.setFieldValue("certifications", [
      ...formik?.values?.certifications,
      { name: "", issueDate: "", expirationDate: "", issuedBy: "" },
    ]);
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = formik?.values?.certifications?.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("certifications", newCertifications);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newCertifications = formik?.values?.certifications?.map(
      (certification: any, i: number) => {
        if (i === index) {
          return {
            ...certification,
            [name]: value,
          };
        }
        return certification;
      }
    );
    formik.setFieldValue("certifications", newCertifications);
  };

  return (
    <div className="mt-5 pt-4 mx-5 px-5" style={{ height: "44vh" }}>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        style={{ display: "flex", alignItems: "end" }}
      >
        {formik?.values?.certifications?.map(
          (certification: any, index: number) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={5} md={2.5}>
                <FormLabel className="fw-bold">Name</FormLabel>
                <TextField
                  id={`name-${index}`}
                  name="name"
                  value={certification?.name}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <FormLabel className="fw-bold">Issue Date</FormLabel>
                <TextField
                  id={`issueDate-${index}`}
                  name="issueDate"
                  value={certification?.issueDate}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <FormLabel className="fw-bold">Expiration Date</FormLabel>
                <TextField
                  id={`expirationDate-${index}`}
                  name="expirationDate"
                  value={certification?.expirationDate}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2.5} md={2.5}>
                <FormLabel className="fw-bold">Issued By</FormLabel>
                <TextField
                  id={`issuedBy-${index}`}
                  name="issuedBy"
                  value={certification?.issuedBy}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={2}
                display={"flex"}
                justifyContent={"center"}
              >
                {index > 0 && (
                  <IconButton onClick={() => handleRemoveCertification(index)}>
                    <MdRemoveCircleOutline />
                  </IconButton>
                )}
                {index === formik?.values?.certifications?.length - 1 && (
                  <IconButton onClick={handleAddCertification}>
                    <MdAddCircleOutline />
                  </IconButton>
                )}
              </Grid>
            </React.Fragment>
          )
        )}
      </Grid>
    </div>
  );
};

export default CertificationDetails;
