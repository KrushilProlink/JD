import {
  FormControl,
  FormLabel,
  Grid,
  IconButton,
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

  console.log(formik?.values, "formik?.values?.certifications");

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
              <Grid item xs={12} sm={5} md={5.1}>
                <FormLabel className="fw-bold">Certification Name</FormLabel>
                <TextField
                  id={`certificationName-${index}`}
                  name="certificationName"
                  value={certification?.certificationName}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5.1}>
                <FormLabel className="fw-bold">Certification Vendor</FormLabel>
                <TextField
                  id={`certificationVendor-${index}`}
                  name="certificationVendor"
                  value={certification?.certificationVendor}
                  onChange={(event: any) => handleChange(index, event)}
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={1.5}
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
