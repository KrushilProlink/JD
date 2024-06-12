import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import CircleLoader from "../components/CircleLoader"; // Update the path as needed
import { FaCheck, FaFileImage } from "react-icons/fa";
import cloud from "../../../../../_metronic/assets/images/Subtract.png";
import fileImage from "../../../../../_metronic/assets/images/file.png";

interface MyDropzoneProps {
  handleChangeStep: () => void;
}

const dropzoneStyle = {
  backgroundColor: "#ffffff0d",
  backgroundImage: ` url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%238E98A3FF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "rgb(0 0 0 / 12%) 0px 0px 32px -13px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "60vh",
  textAlign: "center",
  marginTop: "8px",
  margin: "5px",
};

const MyDropzone: React.FC<MyDropzoneProps> = (props) => {
  const { handleChangeStep } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [view, setView] = useState(false);
  const [file, setFile] = useState<File[] | null>(null);
  const navigate = useNavigate();

  const getFileExtension = (filename: string): string => {
    const parts = filename.split(".");
    if (parts.length > 1) {
      return parts.pop() as string;
    }
    return "";
  };

  const handleUpload = async (selectedFile: File[]): Promise<void> => {
    console.log(selectedFile[0], "selectedFile[0]");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile[0]);

      await axios.post(
        "https://oncore-server-public.vercel.app/api/upload-schedule",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRedirect = (): void => {
    const duration = 1000; // 1 second in milliseconds
    const increment = 100; // Update progress every 100 milliseconds
    const totalIncrements = duration / increment;
    const incrementAmount = 100 / totalIncrements;

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += incrementAmount;
      setProgress(currentProgress);
      setIsLoading(true);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setView(true);
          setIsLoading(false);
          handleUpload(file!);
        }, 5000); // Navigating after 5 seconds
      }
    }, increment);
  };

  return (
    <>
      {file?.length > 0 ? (
        <>
          <div style={dropzoneStyle}>
            {/* <CiFileOn className='display-1' style={{ color: "#92AFF8" }} /> */}
            <img
              src={fileImage}
              alt="file"
              width={"69px"}
              height={"103px"}
              style={{ marginBottom: "25px" }}
            />

            <Typography
              style={{ color: "#10253F", fontSize: "16px", fontWeight: "600" }}
              className="interFont pt-2"
            >
              {file && file[0]?.name}
            </Typography>
            <Typography
              style={{ color: "#10253F", fontSize: "16px", opacity: "0.5" }}
              className="interFont text-uppercase pt-1"
            >
              {getFileExtension(file[0]?.name)}
            </Typography>

            {!isLoading && (
              <div>
                {!view ? (
                  <Button
                    variant="contained"
                    onClick={() => handleRedirect()}
                    className="Manrope"
                    style={{
                      backgroundColor: "#1B84FF",
                      marginTop: "30px",
                      marginBottom: "10px",
                      fontSize: "16px",
                      fontWeight: "600",
                      padding: "8px 45px",
                      color: "#fff",
                      boxShadow: "none",
                    }}
                  >
                    Start
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    startIcon={<FaCheck />}
                    onClick={() => handleChangeStep()}
                    className="Manrope"
                    style={{
                      boxShadow: "none",
                      backgroundColor: "#1B84FF",
                      marginTop: "30px",
                      fontSize: "14px",
                      marginBottom: "8px",
                      fontWeight: "600",
                      padding: "8px 16px",
                      color: "#fff",
                    }}
                  >
                    View Results
                  </Button>
                )}
              </div>
            )}
            <div className="d-flex justify-content-center">
              {isLoading && (
                <div className="mt-4 mb-2">
                  <CircleLoader percentage={progress} />
                </div>
              )}
            </div>
            {/* <div className='mt-5'>
                                <Button variant='contained' startIcon={<FaCheck />} onClick={() => navigate('/dashboard/executive-reports')}> View Result</Button>
                            </div> */}
            <Typography
              variant="caption"
              onClick={() => setFile(null)}
              style={{
                cursor: "pointer",
                color: "#222E93",
                fontSize: "14px",
                fontWeight: "600",
              }}
              className="Manrope"
            >
              Replace File
            </Typography>
          </div>
        </>
      ) : (
        <>
          <div {...getRootProps()} style={dropzoneStyle}>
            {/* <FaCloudUploadAlt className='display-1 text-primary' /> */}
            <img
              src={cloud}
              alt="cloud"
              width={"95px"}
              height={"70px"}
              style={{ marginBottom: "29px" }}
            />

            <Typography
              style={{ fontWeight: "bold", fontSize: "18px" }}
              className="Manrope"
            >
              Upload Today's Schedule
            </Typography>
            <Typography
              style={{ color: "#10253F", fontSize: "14px", opacity: "50%" }}
              className="interFont"
            >
              Supported formats XLSX,CSV
            </Typography>
            <div className="mt-5 pt-3">
              <Typography
                style={{
                  color: "#10253F",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                className="interFont"
              >
                Drag and Drop
              </Typography>
              <Typography
                style={{
                  color: "#10253F",
                  fontSize: "14px",
                  opacity: "50%",
                  margin: "10px 0",
                }}
                className="interFont"
              >
                - or -
              </Typography>
              <Button
                variant="contained"
                className="Manrope"
                style={{
                  backgroundColor: "#1B84FF",
                  marginTop: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "8px 16px",
                  color: "#fff",
                  boxShadow: "none",
                }}
              >
                {" "}
                Select File
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { MyDropzone };
