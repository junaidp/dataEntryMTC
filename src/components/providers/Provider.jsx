import React from "react";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setupGetAllProviderWithOutParams,
  resetProviderAddSuccess,
} from "../../global-redux/reducers/providers/slice";
import AddProviderDialog from "./components/AddProviderDialog";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice";
import RichTextEditor from "../../components/common/RichText";
import { useSelector } from "react-redux";

const Providers = ({ showAddProvidereDialog, setShowAddProviderDialog }) => {
  const dispatch = useDispatch();
  const { allProvider, providerAddSuccess, loading } = useSelector(
    (state) => state.providers
  );
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (providerAddSuccess) {
      dispatch(setupGetAllProviderWithOutParams());
      dispatch(setupGetAllVendors());
      dispatch(resetProviderAddSuccess());
    }
  }, [providerAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllProviderWithOutParams());
    dispatch(setupGetAllVendors());
  }, []);

  return (
    <div>
      {showAddProvidereDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddProviderDialog
              setShowAddProviderDialog={setShowAddProviderDialog}
            />
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : allProvider?.length === 0 || allProvider[0]?.error === "Not Found" ? (
        "Providers Not Found"
      ) : (
        <div className="accordion" id="accordionFlushExample">
          {allProvider
            ?.slice((page - 1) * 10, page * 10)
            ?.map((provider, index) => {
              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                    >
                      <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                      {provider?.name ? provider?.name : "No Name Provided"}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="container">
                        <div className="float-end mb-2">
                          <div
                            className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Edit
                          </div>
                          <div
                            className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Delete
                          </div>
                        </div>
                        <div className="px-4 py-4">
                          <h2 className="pb-4 heading">View Provider</h2>
                          <div>
                            <div className="col-lg-12 mb-4">
                              <label>Provider name</label>
                              <p>
                                {provider?.name
                                  ? provider?.name
                                  : "No Name Provided"}
                              </p>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 mb-4">
                                <label>Provider address</label>
                                <p>
                                  {provider?.address
                                    ? provider?.address
                                    : "No Address Provided"}
                                </p>
                              </div>
                              <div className="col-lg-6 mb-4">
                                <label>Point of Contact</label>
                                <p>
                                  {provider?.pointOfContact
                                    ? provider?.pointOfContact
                                    : "No Point Of Contact Provided"}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 mb-4">
                                <label>Website</label>
                                <p>
                                  {provider?.website
                                    ? provider?.website
                                    : "No Website Provided"}
                                </p>
                              </div>
                              <div className="col-lg-6 mb-4">
                                <label>Email</label>
                                <p>
                                  {provider?.email
                                    ? provider?.email
                                    : "No Email Provided"}
                                </p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 mb-4">
                                <label>Manage Venue</label>
                                <p>
                                  {Boolean(provider.manageVenue) === true
                                    ? "True"
                                    : "False"}
                                </p>
                              </div>
                              <div className="col-lg-6 mb-4">
                                <label>Regions</label>
                                <p>
                                  {provider?.regionsCovered
                                    ? provider?.regionsCovered
                                    : "No Regions Covered Provided"}
                                </p>
                              </div>
                            </div>
                            <div className="row mb-4">
                              <div className="col-lg-12">
                                <label>Description</label>
                                <RichTextEditor
                                  placeholder="Vendor’ Description"
                                  initialValue={provider.description}
                                  readonly={true}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Pagination
        count={Math.ceil(allProvider?.length / 10)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default Providers;
