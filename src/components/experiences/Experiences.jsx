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

import { useSelector } from "react-redux";
import Form from "./components/Form";

const Experiences = ({
  showAddExperienceDialog,
  setShowAddExperienceDialog,
}) => {
  const dispatch = useDispatch();
  const { allExperience, experienceAddSuccess, loading } = useSelector(
    (state) => state.experiences
  );
  // const [showDeleteExperienceDialog, setShowDeleteExperienceDialog] =
  //   React.useState(false);
  // const [currentExperienceId, setShowCurrentExperienceId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (experienceAddSuccess) {
      dispatch(setupGetAllExperienceWithOutParams());
      dispatch(setupGetAllVendors());
      dispatch(resetExperienceAddSuccess());
    }
  }, [experienceAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
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
                        <Form experience={experience} />
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
