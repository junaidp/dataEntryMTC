import React from "react";
import {
  resetVariationAddSuccess,
  setupGetAllVariationsWithOutParams,
  setupAddVariation,
} from "../../global-redux/reducers/variations/slice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setupGetAllExperienceWithOutParams } from "../../global-redux/reducers/experiences/slice";
import { CircularProgress } from "@mui/material";
import Form from "./components/Form.jsx";
import Pagination from "@mui/material/Pagination";
import AddVariationDialog from "./components/AddVariationDialog.jsx";
import DeleteVariationDialog from "./components/DeleteVariationDialog.jsx";
import EditVariationDialog from "./components/edit-variation/EditVariationDialog.jsx";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice.jsx";
import {
  setupGetAllProviderWithOutParams,
  resetProviderAddSuccess,
} from "../../global-redux/reducers/providers/slice.jsx";
import DuplicateVariationDialog from "./components/DuplicateVariationDialog.jsx";

const Variation = ({ showAddVariationDialog, setShowAddVariationDialog }) => {
  const dispatch = useDispatch();
  const [showEditVariationDialog, setShowEditVariationDialog] =
    React.useState(false);
  const { providerAddSuccess, currentProviderObject } = useSelector(
    (state) => state?.providers
  );
  const [showDuplicateDialog, setShowDuplicateDialog] = React.useState(false);
  const [showDeleteVariationDialog, setShowDeleteVariationDialog] =
    React.useState(false);
  const [currentVariationId, setCurrentVariationId] = React.useState("");
  const [selectedVaraition, setSelectedVariation] = React.useState({});
  const { loading, allVariations, variationAddSuccess } = useSelector(
    (state) => state?.variations
  );
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (providerAddSuccess) {
      let currentVariation = allVariations?.find(
        (all) => all?.id === currentVariationId
      );
      let currentVariationProviders = allVariations?.find(
        (all) => all?.id === currentVariationId
      )?.providers;
      if (
        currentVariationProviders &&
        currentVariationProviders?.length !== 0
      ) {
        dispatch(
          setupAddVariation([
            {
              ...currentVariation,
              providers: [
                ...currentVariationProviders,
                {
                  providerId: currentProviderObject?.id,
                  providerName: currentProviderObject?.name,
                },
              ],
            },
          ])
        );
      }
      if (
        !currentVariationProviders ||
        currentVariationProviders?.length === 0
      ) {
        dispatch(
          setupAddVariation([
            {
              ...currentVariation,
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
    if (variationAddSuccess) {
      dispatch(setupGetAllVariationsWithOutParams());
      dispatch(setupGetAllProviderWithOutParams());
      setSelectedVariation({});
      setCurrentVariationId("");
      dispatch(resetVariationAddSuccess());
      setPage(1);
    }
  }, [variationAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllVariationsWithOutParams());
    dispatch(setupGetAllProviderWithOutParams());
    dispatch(setupGetAllVendors());
  }, []);

  return (
    <div>
      {showAddVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddVariationDialog
              setShowAddVariationDialog={setShowAddVariationDialog}
            />
          </div>
        </div>
      )}
      {showDuplicateDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DuplicateVariationDialog
              setShowDuplicateDialog={setShowDuplicateDialog}
              selectedVaraition={selectedVaraition}
            />
          </div>
        </div>
      )}
      {showEditVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditVariationDialog
              setShowEditVariationDialog={setShowEditVariationDialog}
              selectedVaraition={selectedVaraition}
            />
          </div>
        </div>
      )}
      {showDeleteVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteVariationDialog
              setShowDeleteVariationDialog={setShowDeleteVariationDialog}
              currentVariationId={currentVariationId}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="mt-2">
          <CircularProgress />
        </div>
      ) : allVariations?.length === 0 ||
        allVariations[0]?.error === "Not Found" ? (
        <p className="mt-4">Variations Not Found.</p>
      ) : (
        <div className="mt-2">
          <div className="accordion" id="accordionFlushExample">
            {allVariations
              ?.slice((page - 1) * 10, page * 10)
              ?.map((variation, index) => {
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
                        onClick={() => setCurrentVariationId(variation?.id)}
                      >
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        {variation?.title
                          ? variation?.title
                          : "No Title Provided"}
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
                                setSelectedVariation(variation);
                                setShowEditVariationDialog(true);
                              }}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Edit
                            </div>
                            <div
                              className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                              onClick={() => setShowDeleteVariationDialog(true)}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Delete
                            </div>
                            <div
                              className={`btn btn-labeled btn-secondary px-3 shadow  my-4 `}
                              onClick={() => {
                                setSelectedVariation(variation);
                                setShowDuplicateDialog(true);
                              }}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Duplicate
                            </div>
                          </div>
                          <Form variation={variation} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            count={Math.ceil(allVariations?.length / 10)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Variation;
