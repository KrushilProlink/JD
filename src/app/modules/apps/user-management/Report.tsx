import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import React, { useState } from "react";
import "../../../../_metronic/assets/report.css";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DownloadIcon from "@mui/icons-material/Download";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  data: any;
  close: () => void;
};

const Report: React.FC<Props> = ({ data, close }) => {
  const [openTabs, setOpenTabs] = useState(
    Array(data?.Evaluation?.length).fill(false)
  );
  const [loading, setLoading] = useState(false);

  const toggleTab = (index: number) => {
    const newOpenTabs = [...openTabs];
    newOpenTabs[index] = !newOpenTabs[index];
    setOpenTabs(newOpenTabs);
  };

  const generatePDF = () => {
    setLoading(true);
    setOpenTabs(Array(data?.Evaluation?.length).fill(true));
    const element = document.getElementById("content");
    if (element) {
      setTimeout(() => {
        html2pdf()
          .from(element)
          .set({
            margin: 1,
            filename: `call_report_${data?.candidate_number}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
          })
          .save()
          .then(() => {
            setOpenTabs(Array(data?.Evaluation?.length).fill(false));
            setLoading(false);
          });
      }, 500);
    } else {
      console.error("Element with ID 'content' not found.");
    }
  };

  return (
    <>
      <div className="card-header border-0 pt-6">
        <div>
          <button
            type="button"
            className="btn btn-light-primary"
            onClick={() => close()}
          >
            <span>
              <ChevronLeftIcon className="fs-1" />
            </span>
            <span className="">Back</span>
          </button>
        </div>
        <div className="" data-kt-user-table-toolbar="base">
          <button
            type="button"
            className="btn btn-light-primary me-3"
            onClick={generatePDF}
          >
            {!loading && (
              <span className="indicator-label">
                <span>
                  <DownloadIcon className="fs-1" />
                </span>
                <span className="ms-1">Download </span>
              </span>
            )}
            {loading && (
              <span className="indicator-progress" style={{ display: "block" }}>
                Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* {!loading === true ? ( */}
      <div className="container-new" id="content">
        <div className="header1">
          <h1>Call Quality & Analysis</h1>
        </div>
        <div className="details">
          <div className="container">
            <div className="row">
              <div className="info col col-md-6">
                <p>
                  Device ID: <span>{data?.device_id}</span>
                </p>
                <p>
                  Recruiter Name: <span>{data?.recruiter_name}</span>
                </p>
                <p>
                  Candidate Cell #: <span>{data?.candidate_number}</span>
                </p>
                <p>
                  Overall Score: <span>{data?.overall_score}</span>
                </p>
              </div>
              <div className="audio col  col-md-6">
                <p>
                  Audio File:{" "}
                  <span>
                    {data?.audio_file?.length > 0 &&
                      data?.audio_file[0]?.file_count}
                  </span>
                </p>
                {data?.audio_file?.length > 0 && (
                  <audio controls>
                    <source
                      src={data?.audio_file[0]?.audio_file}
                      type="audio/mpeg"
                    />
                  </audio>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="evaluation">
          <h2 className="text-center">Evaluation Snapshot</h2>
          {data?.Evaluation?.length > 0 &&
            data?.Evaluation?.map((item: any, index: number) => (
              <div className="section" key={index}>
                <h3>
                  {item?.category} : Score - {item?.average_score}
                  <span style={{ float: "right" }} id="tbtn">
                    {openTabs[index] ? (
                      <RemoveIcon
                        style={{ cursor: "pointer" }}
                        id="tbtn"
                        onClick={() => toggleTab(index)}
                      />
                    ) : (
                      <AddIcon
                        style={{ cursor: "pointer" }}
                        id="tbtn"
                        onClick={() => toggleTab(index)}
                      />
                    )}
                  </span>
                </h3>
                {openTabs[index] && (
                  <>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Parameter</th>
                            <th className="text-center">Score (out of 10)</th>
                            <th>Improvement/Comments</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item?.parameters?.length > 0 &&
                            item?.parameters?.map((i: any, ind: number) => (
                              <tr key={ind}>
                                <td>{i?.key}</td>
                                <td className="text-center">{i?.score}</td>
                                <td>{i?.improvements_or_comments}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* // ) : (
        // <div className="container-new py-5">
        //   <div
        //     style={{
        //       display: "flex",
        //       justifyContent: "center",
        //       flexDirection: "column",
        //       alignItems: "center",
        //       padding: "160px 0",
        //     }}
        //   >
        //     <span className="spinner-border text-primary" role="status"></span>
        //     <span className="text-muted fs-6 fw-semibold mt-5">Loading...</span>
        //   </div>
        // </div>
      // )} */}
    </>
  );
};

export default Report;
