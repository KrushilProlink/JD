import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Rating } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { KTIcon, toAbsoluteUrl } from "../../../../../../_metronic/helpers";
import Add from "../../form/Add";
// import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import ViewJd from "../../form/ViewJd";
const API_URL = import.meta.env.VITE_APP_API_URL;

type CallData = {
  serial_no: number;
  device_id: string;
  no_of_calls: number;
  overall_score: number;
  recruiter_name: string;
  team: string;
  total_call_duration: string;
};

const RecruiterDetailsTable: FC = () => {
  // const [allCallData, setAllCallData] = useState<CallData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const jdList = [
    {
      jdId: 10,
      title: "Software Engineer",
      date: "2024-06-12",
      status: "active",
    },
  ];

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const fetchAllCallData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`${API_URL}/all-call-data`);
  //     if (response?.status === 200) {
  //       setAllCallData(response?.data?.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching call data:", error);
  //   }
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchAllCallData();
  // }, []);

  return (
    <div>
      <ViewJd open={isOpen} handleClose={() => setIsOpen(false)} />
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
        <div></div>
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
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        {/* <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
          Requirement Details
          </span>
        </h3> */}
        <div></div>
        <div
          className="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          // title="Click to add a user"
        >
          <button
            className="btn btn-sm btn-light-primary"
            onClick={() => navigate("add")}
            // data-bs-toggle='modal'
            // data-bs-target='#kt_modal_invite_friends'
          >
            <KTIcon iconName="plus" className="fs-3" />
            <span>{/* <FileUploadIcon /> */}</span>
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
          <table className="table  table-row-gray-300 align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="text-center">JD ID</th>
                <th className="text-center">Title</th>
                <th className=" text-center">Date</th>
                <th className=" text-center">Status</th>
                <th className="text-center pe-4">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {!isLoading ? (
                jdList?.length > 0 &&
                jdList
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((item: any, index: number) => (
                    <tr>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
                        {item?.jdId || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.title || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.date || "-"}
                      </td>
                      <td className="text-gray-900 fw-bold text-hover-primary fs-6 text-center">
                        {item?.status || "-"}
                      </td>

                      <td className="text-gray-900 fw-bold text-hover-primary fs-6  text-center">
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
                        <span className="flex-shrink-0 btn btn-bg-secondary btn-color-muted btn-active-color-primary btn-sm p-2 ms-2">
                          <div
                            className="card-toolbar"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-trigger="hover"
                            title="Candidate Details"
                          >
                            <PersonIcon
                              style={{ cursor: "pointer" }}
                              onClick={() => navigate(`candidatesDetails/1}`)}
                            />
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
              {jdList?.length === 0 && !isLoading && (
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
          {jdList?.length > 0 && !isLoading && (
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={jdList.length}
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
  );
};

export { RecruiterDetailsTable };
