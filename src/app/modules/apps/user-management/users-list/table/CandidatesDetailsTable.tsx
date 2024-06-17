import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { FC, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { KTIcon } from "../../../../../../_metronic/helpers";
import ViewCandidate from "../../form/ViewCandidate";
import ViewJDvsCVAnalysis from "../../form/ViewJDvsCVAnalysis";
const API_URL = import.meta.env.VITE_APP_API_URL;

type RecruiterCall = {
  audio_player: string;
  call_duration: string;
  candidate_cell_no: string;
  mcp_score: number;
  non_tech_score: number;
  overall_score: number;
  serial_no: number;
  speech_analysis_score: number;
  technical_score: number;
};

type CallReport = {
  audio_player?: string;
  call_duration?: string;
  candidate_cell_no?: string;
  mcp_score?: number;
  non_tech_score?: number;
  overall_score?: number;
  serial_no?: number;
  speech_analysis_score?: number;
  technical_score?: number;
};

const CandidatesDetailsTable: FC = () => {
  const [recruiterCallData, setRecruiterCallData] = useState<RecruiterCall[]>(
    []
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAnalysisView, setIsOpenAnalysisView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<CallReport>({});
  const location = useLocation();
  const { data }: any = location?.state || {};
  const { id } = useParams();
  const navigate = useNavigate();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const candidateList = [
    {
      candidateId: "200",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      status: "active",
    },
  ];

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchRecruiterCallData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recruiter-call-data/${id}`);
      if (response?.status === 200) {
        setRecruiterCallData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching recruiter-call-data:", error);
    }
    setIsLoading(false);
  };

  const handleDownload = async (cellNo: string) => {
    const payload = {
      candidate_id: cellNo,
      device_id: id,
    };
    const response = await axios.post(
      `${API_URL}/recruiter-call-report`,
      payload
    );
    if (response?.status === 200) {
      setReportData(response?.data?.data);
      setIsOpen(true);
    }
    // navigate(`/call-report/${response?.data?.data?.candidate_number}`, {
    //   state: { data: response?.data?.data },
    // });
  };

  // useEffect(() => {
  //   if (id) {
  //     fetchRecruiterCallData();
  //   }
  // }, []);

  return (
    <>
      <ViewCandidate open={isOpen} handleClose={() => setIsOpen(false)} />
      <ViewJDvsCVAnalysis
        open={isOpenAnalysisView}
        handleClose={() => setIsOpenAnalysisView(false)}
      />

      <div className="card-header border-0 pt-6">
        {/* <div className="card-title">
          <div className="d-flex align-items-center position-relative my-1">
            <KTIcon
              iconName="magnifier"
              className="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              data-kt-user-table-filter="search"
              className="form-control form-control-solid w-250px ps-14"
              placeholder="Search user"
            />
          </div>
        </div> */}
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
        <div className="" data-kt-user-table-toolbar="base">
          <button
            type="button"
            className="btn btn-light-primary me-3 "
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
          >
            <KTIcon iconName="filter" className="fs-2" />
            Filter
          </button>
          <div
            className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
            data-kt-menu="true"
          >
            <div className="px-7 py-5">
              <div className="fs-5 text-gray-900 fw-bolder">Filter Options</div>
            </div>

            <div className="px-7 py-5" data-kt-user-table-filter="form">
              <div className="mb-10">
                <label className="form-label fs-6 fw-bold">Date:</label>
                <input type="date" name="" className="form-control" id="" />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
                  data-kt-menu-dismiss="true"
                  data-kt-user-table-filter="reset"
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="btn btn-primary fw-bold px-6"
                  data-kt-menu-dismiss="true"
                  data-kt-user-table-filter="filter"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* <button type="button" className="btn btn-light-primary me-3">
            <KTIcon iconName="exit-up" className="fs-2" />
            Export
          </button> */}
        </div>
      </div>
      <div>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">Name</span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              Candidate Details
            </span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <button
              className="btn btn-sm btn-light-primary"
              onClick={() => navigate("add")}
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
            >
              <KTIcon iconName="plus" className="fs-3" />
              Add New
            </button>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="text-center">Sr No</th>
                  <th className="text-center">Candidate Name</th>
                  <th className=" text-center">Email Id</th>
                  <th className="text-center">Contact Number</th>
                  <th className="text-center">Source</th>
                  <th className="text-center">JD vs CV score</th>
                  <th className="text-center">Status</th>
                  <th className="text-center ">Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {!isLoading ? (
                  candidateList?.length > 0 &&
                  candidateList
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((item, index) => (
                      <tr>
                        <td className=" text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {"-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {item?.name || "-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {item?.email || "-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {"-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {"-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {"-"}
                        </td>
                        <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                          {item?.status || "-"}
                        </td>

                        <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center d-flex flex-nowrap justify-content-center">
                          <span
                            className=" btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-2"
                            onClick={() => setIsOpen(true)}
                          >
                            <div
                              className="card-toolbar"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-trigger="hover"
                              title="View Details"
                            >
                              <VisibilityIcon style={{ cursor: "pointer" }} />
                            </div>
                          </span>
                          <span className="flex-shrink-0 btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-2 ms-2">
                            <div
                              className="card-toolbar"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-trigger="hover"
                              title="Edit Details"
                            >
                              <EditIcon style={{ cursor: "pointer" }} />
                            </div>
                          </span>
                          <span className="flex-shrink-0 btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-2 ms-2">
                            <div
                              className="card-toolbar"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-trigger="hover"
                              title="Delete"
                            >
                              <DeleteIcon style={{ cursor: "pointer" }} />
                            </div>
                          </span>
                          <span
                            className="flex-shrink-0 btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-2 ms-2"
                            onClick={() => setIsOpenAnalysisView(true)}
                          >
                            <div
                              className="card-toolbar"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-trigger="hover"
                              title="Analysis Details"
                            >
                              <QueryStatsIcon style={{ cursor: "pointer" }} />
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center text-gray-900 fw-bold  fs-6"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "160px 0",
                        }}
                      >
                        <span
                          className="spinner-border text-primary"
                          role="status"
                        ></span>
                        <span className="text-muted fs-6 fw-semibold mt-5">
                          Loading...
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading && candidateList?.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center text-gray-900 fw-bold  fs-6"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
              {/* end::Table body */}
            </table>

            {candidateList?.length > 10 && !isLoading && (
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={candidateList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  );
};

export { CandidatesDetailsTable };
