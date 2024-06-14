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

  const handleAddCertification = () => {
    formik.setFieldValue("certifications", [
      ...formik?.values?.certifications,
      { certificationName: "", certificationVendor: "" },
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
    const newCertifications = formik?.values?.certifications?.map(
      (certification: any, i: number) => {
        if (i === index) {
          return {
            ...formik?.values?.certifications,
            [event.target.name]: event.target.value,
          };
        }
        return certification;
      }
    );
    formik.setFieldValue("certifications", newCertifications);
  };

  console.log(formik?.values, "formik?.values?.certifications");

  return (
    <div>
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 0, sm: 5, md: 4 }}
        style={{ display: "flex", alignItems: "end" }}
      >
        {formik?.values?.certifications?.map(
          (certification: any, index: number) => (
            <>
              <Grid item xs={12} sm={5} md={5}>
                <FormLabel>Certification Name</FormLabel>
                <TextField
                  id={`certificationName-${index}`}
                  name="certifications.certificationName"
                  value={certification?.certificationName}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5}>
                <FormLabel>Certification Vendor</FormLabel>
                <TextField
                  id={`certificationVendor-${index}`}
                  name="certifications.certificationVendor"
                  value={certification?.certificationVendor}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2} alignItems={"center"}>
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
            </>
          )
        )}
      </Grid>
    </div>
  );
};

export default CertificationDetails;
