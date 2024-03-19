import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteExperience } from "../../../global-redux/reducers/experiences/slice";

const DeleteExperienceDialog = ({
  setShowDeleteExperienceDialog,
  currentExperienceId,
}) => {
  const dispatch = useDispatch();
  const { experienceAddSuccess, loading } = useSelector(
    (state) => state.experiences
  );
  function handleDeleteExperience() {
    if (!loading) {
      dispatch(setupDeleteExperience(`?experienceId=${currentExperienceId}`));
    }
  }

  React.useEffect(() => {
    if (experienceAddSuccess) {
      setShowDeleteExperienceDialog(false);
    }
  }, [experienceAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the experience?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteExperience}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteExperienceDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExperienceDialog;
