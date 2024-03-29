import React from "react";
import {
  resetOptionAddSuccess,
  setupGetAllOptionsWithOutParams,
  setupAddOption,
} from "../../global-redux/reducers/options/slice";
import { useDispatch, useSelector } from "react-redux";
import { setupGetAllExperienceWithOutParams } from "../../global-redux/reducers/experiences/slice";
import { CircularProgress } from "@mui/material";
import Form from "./components/Form.jsx";
import Pagination from "@mui/material/Pagination";
import AddOptionDialog from "./components/AddOptionDialog.jsx";
import DeleteOptionDialog from "./components/DeleteOptionDialog.jsx";
import EditOptionDialog from "./components/edit-option/EditOptionDialog.jsx";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice.jsx";
import {
  setupGetAllProviderWithOutParams,
  resetProviderAddSuccess,
} from "../../global-redux/reducers/providers/slice";
import DuplicateDialog from "./components/DuplicateDialog.jsx";

const Options = ({ setShowAddOptionDialog, showAddOptionDialog }) => {
  const dispatch = useDispatch();
  const [showEditOptionDialog, setShowEditOptionDialog] = React.useState(false);
  const { providerAddSuccess, currentProviderObject } = useSelector(
    (state) => state?.providers
  );
  const [showDuplicateDialog, setShowDuplicateDialog] = React.useState(false);
  const [showDeleteOptionDialog, setShowDeleteOptionDialog] =
    React.useState(false);
  const [currentOptionId, setCurrentOptionId] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState({});
  const { loading, allOptions, optionAddSuccess } = useSelector(
    (state) => state?.options
  );
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (providerAddSuccess) {
      let currentOption = allOptions?.find(
        (all) => all?.id === currentOptionId
      );
      let currentOptionProviders = allOptions?.find(
        (all) => all?.id === currentOptionId
      )?.providers;
      if (currentOptionProviders && currentOptionProviders?.length !== 0) {
        dispatch(
          setupAddOption([
            {
              ...currentOption,
              providers: [
                ...currentOptionProviders,
                {
                  providerId: currentProviderObject?.id,
                  providerName: currentProviderObject?.name,
                },
              ],
            },
          ])
        );
      }
      if (!currentOptionProviders || currentOptionProviders?.length === 0) {
        dispatch(
          setupAddOption([
            {
              ...currentOption,
              providers: [
                {
                  providerId: currentProviderObject?.id,
                  providerName: currentProviderObject?.name,
                },
              ],
            },
          ])
        );
      }

      setTimeout(() => {
        dispatch(resetProviderAddSuccess());
      }, 2000);
    }
  }, [providerAddSuccess]);

  React.useEffect(() => {
    if (optionAddSuccess) {
      setSelectedOption({});
      setCurrentOptionId("");
      dispatch(resetOptionAddSuccess());
      dispatch(setupGetAllExperienceWithOutParams());
      dispatch(setupGetAllOptionsWithOutParams());
      dispatch(setupGetAllVendors());
      dispatch(setupGetAllProviderWithOutParams());
      setPage(1)
    }
  }, [optionAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllOptionsWithOutParams());
    dispatch(setupGetAllVendors());
    dispatch(setupGetAllProviderWithOutParams());
  }, []);

  return (
    <div>
      {showAddOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddOptionDialog setShowAddOptionDialog={setShowAddOptionDialog} />
          </div>
        </div>
      )}
      {showDuplicateDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DuplicateDialog
              setShowDuplicateDialog={setShowDuplicateDialog}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      )}
      {showEditOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditOptionDialog
              setShowEditOptionDialog={setShowEditOptionDialog}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      )}
      {showDeleteOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteOptionDialog
              setShowDeleteOptionDialog={setShowDeleteOptionDialog}
              currentOptionId={currentOptionId}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="mt-2">
          <CircularProgress />
        </div>
      ) : allOptions?.length === 0 || allOptions[0]?.error === "Not Found" ? (
        <p className="mt-2">Options Not Found</p>
      ) : (
        <div className="mt-2">
          <div className="accordion" id="accordionFlushExample">
            {allOptions
              ?.slice((page - 1) * 10, page * 10)
              ?.map((option, index) => {
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
                        onClick={() => setCurrentOptionId(option?.id)}
                      >
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        {option?.title ? option?.title : "No Title Provided"}
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
                              onClick={() => {
                                setSelectedOption(option);
                                setShowEditOptionDialog(true);
                              }}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Edit
                            </div>
                            <div
                              className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                              onClick={() => setShowDeleteOptionDialog(true)}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Delete
                            </div>
                            <div
                              className={`btn btn-labeled btn-secondary px-3 shadow  my-4 `}
                              onClick={() => {
                                setSelectedOption(option);
                                setShowDuplicateDialog(true);
                              }}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Duplicate
                            </div>
                          </div>

                          <Form option={option} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            count={Math.ceil(allOptions?.length / 10)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Options;
