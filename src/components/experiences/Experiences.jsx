import React from "react";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setupGetAllExperienceWithOutParams,
  resetExperienceAddSuccess,
} from "../../global-redux/reducers/experiences/slice";
import AddExperienceDialog from "./components/AddExperieneDialog";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice";
import DeleteExperienceDialog from "./components/DeleteExperienceDialog";
import EditExperienceDialog from "./components/edit-experience-dialog/EditExperienceDialog";
import { useSelector } from "react-redux";
import Form from "./components/Form";
import { setupGetAllProviderWithOutParams } from "../../global-redux/reducers/providers/slice";
import { setupGetAllOptions } from "../../global-redux/reducers/options/slice";
import { setupGetAllVariations } from "../../global-redux/reducers/variations/slice";
import { resetOptionAddSuccess } from "../../global-redux/reducers/options/slice";
import { resetVariationAddSuccess } from "../../global-redux/reducers/variations/slice";

const Experiences = ({
  showAddExperienceDialog,
  setShowAddExperienceDialog,
}) => {
  const dispatch = useDispatch();
  const { allExperience, experienceAddSuccess, loading } = useSelector(
    (state) => state.experiences
  );
  const { providerAddSuccess } = useSelector((state) => state?.providers);
  const { optionAddSuccess } = useSelector((state) => state.options);
  const { variationAddSuccess } = useSelector((state) => state.variations);

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
    dispatch(setupGetAllOptions(`?experienceId=${currentExperienceId}`));
    dispatch(setupGetAllVariations(`?experienceId=${currentExperienceId}`));
  }, [currentExperienceId]);

  React.useEffect(() => {
    dispatch(setupGetAllOptions(`?experienceId=${currentExperienceId}`));
    dispatch(resetOptionAddSuccess());
  }, [optionAddSuccess]);
  React.useEffect(() => {
    dispatch(setupGetAllVariations(`?experienceId=${currentExperienceId}`));
    dispatch(resetVariationAddSuccess());
  }, [variationAddSuccess]);

  React.useEffect(() => {
    if (experienceAddSuccess || providerAddSuccess) {
      setShowCurrentExperienceId("");
      dispatch(setupGetAllExperienceWithOutParams());
      dispatch(setupGetAllVendors());
      dispatch(setupGetAllProviderWithOutParams());
      dispatch(resetExperienceAddSuccess());
    }
  }, [experienceAddSuccess, providerAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllProviderWithOutParams());
    dispatch(setupGetAllVendors());
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
