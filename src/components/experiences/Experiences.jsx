import React from "react";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setupGetAllExperienceWithOutParams,
  resetExperienceAddSuccess,
  setupAddExperience,
  resetDuplicateExperienceAddSuccess,
} from "../../global-redux/reducers/experiences/slice";
import AddExperienceDialog from "./components/AddExperieneDialog";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice";
import DeleteExperienceDialog from "./components/DeleteExperienceDialog";
import EditExperienceDialog from "./components/edit-experience-dialog/EditExperienceDialog";
import { useSelector } from "react-redux";
import Form from "./components/Form";
import {
  setupGetAllProviderWithOutParams,
  resetProviderAddSuccess,
} from "../../global-redux/reducers/providers/slice";
import {
  setupGetAllOptions,
  setupAddOption,
  resetOptionAddSuccess,
} from "../../global-redux/reducers/options/slice";
import {
  setupGetAllVariations,
  setupAddVariation,
  resetVariationAddSuccess,
} from "../../global-redux/reducers/variations/slice";
import { setupGetAllServiceWithOutParama } from "../../global-redux/reducers/services/slice";
import DuplicateExperienceDialog from "./components/duplicate-experience/DuplicateExperienceDialog";

const Experiences = ({
  showAddExperienceDialog,
  setShowAddExperienceDialog,
}) => {
  const dispatch = useDispatch();
  const {
    allExperience,
    experienceAddSuccess,
    loading,
    duplicateExperienceAddSuccess,
    singleDuplicateExperience,
  } = useSelector((state) => state.experiences);
  const { providerAddSuccess, currentProviderObject } = useSelector(
    (state) => state?.providers
  );
  const [showDuplicateDialog, setShowDuplicateDialog] = React.useState(false);
  const { optionAddSuccess } = useSelector((state) => state.options);
  const { variationAddSuccess } = useSelector((state) => state.variations);
  const [duplicateOptions, setDuplicateOptions] = React.useState([]);
  const [duplicateVariations, setDuplicateVariations] = React.useState([]);

  const [showDeleteExperienceDialog, setShowDeleteExperienceDialog] =
    React.useState(false);
  const [showEditExperienceDialog, setShowEditExperienceDialog] =
    React.useState(false);
  const [selectedExperience, setSelectedExperience] = React.useState({});
  const [currentExperienceId, setShowCurrentExperienceId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (currentExperienceId !== "" && currentExperienceId) {
      dispatch(setupGetAllOptions(`?experienceId=${currentExperienceId}`));
      dispatch(setupGetAllVariations(`?experienceId=${currentExperienceId}`));
    }
  }, [currentExperienceId]);

  React.useEffect(() => {
    if (optionAddSuccess) {
      dispatch(setupGetAllOptions(`?experienceId=${currentExperienceId}`));
      dispatch(resetOptionAddSuccess());
    }
  }, [optionAddSuccess]);
  React.useEffect(() => {
    if (variationAddSuccess) {
      dispatch(setupGetAllVariations(`?experienceId=${currentExperienceId}`));
      dispatch(resetVariationAddSuccess());
    }
  }, [variationAddSuccess]);

  React.useEffect(() => {
    if (providerAddSuccess) {
      let currentExperience = allExperience?.find(
        (all) => all?.id === currentExperienceId
      );
      let currentExperienceProviders = allExperience?.find(
        (all) => all?.id === currentExperienceId
      )?.providers;
      if (
        currentExperienceProviders &&
        currentExperienceProviders?.length !== 0
      ) {
        dispatch(
          setupAddExperience([
            {
              ...currentExperience,
              providers: [
                ...currentExperienceProviders,
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
        !currentExperienceProviders ||
        currentExperienceProviders?.length === 0
      ) {
        dispatch(
          setupAddExperience([
            {
              ...currentExperience,
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
    if (duplicateExperienceAddSuccess === true) {
      if (
        duplicateOptions &&
        duplicateOptions?.length !== 0 &&
        singleDuplicateExperience?.id
      ) {
        dispatch(
          setupAddOption(
            duplicateOptions?.map((option) => {
              return {
                experienceId: singleDuplicateExperience?.id,
                title: option?.title,
                xpAddress: option?.xpAddress,
                price: option?.price || [],
                duration: option?.duration || [],
                availableTime: option?.availableTime || [],
                links: option?.links || [],
                linkWithOtherExperience: null,
                providers: option?.providers || [],
                description: option?.description,
                termsAndConditions: option?.termsAndConditions,
                storyLineKeywords: option?.storyLineKeywords || [],
              };
            })
          )
        );
      }
      if (
        duplicateVariations &&
        duplicateVariations?.length !== 0 &&
        singleDuplicateExperience?.id
      ) {
        dispatch(
          setupAddVariation(
            duplicateVariations?.map((variation) => {
              return {
                experienceId: singleDuplicateExperience?.id,
                title: variation?.title,
                xpAddress: variation?.xpAddress,
                price: variation?.price || [],
                duration: variation?.duration || [],
                availableTime: variation?.availableTime || [],
                links: variation?.links || [],
                linkWithOtherExperience: null,
                providers: variation?.providers || [],
                description: variation?.description,
                termsAndConditions: variation?.termsAndConditions,
                storyLineKeywords: variation?.storyLineKeywords || [],
              };
            })
          )
        );
      }
      dispatch(setupGetAllExperienceWithOutParams());
      setShowCurrentExperienceId("");
      dispatch(resetExperienceAddSuccess());
      setPage(1);
      setDuplicateOptions([]);
      setDuplicateVariations([]);
      dispatch(resetDuplicateExperienceAddSuccess());
    }
  }, [duplicateExperienceAddSuccess]);

  React.useEffect(() => {
    if (experienceAddSuccess) {
      dispatch(setupGetAllExperienceWithOutParams());
      dispatch(setupGetAllProviderWithOutParams());
      setShowCurrentExperienceId("");
      dispatch(resetExperienceAddSuccess());
      setPage(1);
    }
  }, [experienceAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllProviderWithOutParams());
    dispatch(setupGetAllVendors());
    dispatch(setupGetAllServiceWithOutParama());
  }, []);

  return (
    <div>
      {showAddExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddExperienceDialog
              setShowAddExperienceDialog={setShowAddExperienceDialog}
            />
          </div>
        </div>
      )}
      {showDuplicateDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DuplicateExperienceDialog
              setShowDuplicateDialog={setShowDuplicateDialog}
              selectedExperience={selectedExperience}
              duplicateOptions={duplicateOptions}
              setDuplicateOptions={setDuplicateOptions}
              duplicateVariations={duplicateVariations}
              setDuplicateVariations={setDuplicateVariations}
            />
          </div>
        </div>
      )}
      {showDeleteExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteExperienceDialog
              setShowDeleteExperienceDialog={setShowDeleteExperienceDialog}
              currentExperienceId={currentExperienceId}
            />
          </div>
        </div>
      )}
      {showEditExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditExperienceDialog
              setShowEditExperienceDialog={setShowEditExperienceDialog}
              selectedExperience={selectedExperience}
            />
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : allExperience?.length === 0 ||
        allExperience[0]?.error === "Not Found" ? (
        "Experiences Not Found"
      ) : (
        <div className="accordion" id="accordionFlushExample">
          {allExperience
            ?.slice((page - 1) * 10, page * 10)
            ?.map((experience, index) => {
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
                      onClick={() => setShowCurrentExperienceId(experience?.id)}
                    >
                      <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                      {experience?.title
                        ? experience?.title
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
                              setSelectedExperience(experience);
                              setShowEditExperienceDialog(true);
                            }}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Edit
                          </div>
                          <div
                            className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                            onClick={() => setShowDeleteExperienceDialog(true)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Delete
                          </div>
                          <div
                            className={`btn btn-labeled btn-secondary px-3 shadow  my-4 `}
                            onClick={() => {
                              setSelectedExperience(experience);
                              setShowDuplicateDialog(true);
                            }}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Duplicate
                          </div>
                        </div>
                        <Form
                          experience={experience}
                          currentExperienceId={currentExperienceId}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Pagination
        count={Math.ceil(allExperience?.length / 10)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default Experiences;
