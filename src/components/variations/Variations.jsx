import React from "react";
import {
  resetVariationAddSuccess,
  setupGetAllVariationsWithOutParams,
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

const Variation = ({ showAddVariationDialog, setShowAddVariationDialog }) => {
  const dispatch = useDispatch();
  const [showEditVariationDialog, setShowEditVariationDialog] =
    React.useState(false);
  const { providerAddSuccess } = useSelector((state) => state?.providers);
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
    if (variationAddSuccess || providerAddSuccess) {
      setSelectedVariation({});
      setCurrentVariationId("");
      dispatch(resetVariationAddSuccess());
      dispatch(setupGetAllExperienceWithOutParams());
      dispatch(setupGetAllVariationsWithOutParams());
      dispatch(setupGetAllVendors());
    }
  }, [variationAddSuccess, providerAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllVariationsWithOutParams());
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
