import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  setupDeleteExperience,
  setupAddExperience,
  changeSelectedExperience,
} from "../../../../global-redux/reducers/experiences/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditExperienceDialog from "../edit-dialogs/edit-experience/EditExperienceDialog";

const experienceRecord = ({
  setShowAddExperienceDialog,
  setShowViewSelectedExperience,
}) => {
  const dispatch = useDispatch();
  const [duplicateExperienceCall, setDuplicateExperienceCall] =
    React.useState(false);
  const { allExperience, loading, experienceAddSuccess } = useSelector(
    (state) => state.experiences
  );
  const [showEditExperienceDialog, setShowEditExperienceDialog] =
    React.useState(false);

  function handleDuplicateExperience(item) {
    if (item) {
      if (!loading) {
        dispatch(
          setupAddExperience([
            {
              title: item?.title,
              vendorId: item?.vendorId,
              providers: item?.providers || [],
              description: item?.description,
              address: item?.address,
              price: item?.price || [],
              duration: item?.duration || [],
              availableTime: item?.availableTime || [],
              links: item?.links || [],
              linkWithOtherExperience: item?.linkWithOtherExperience || [],
              linkWithOtherService: item?.linkWithOtherService || [],
              termsAndConditions: item?.termsAndConditions,
              storyLineKeywords: item?.storyLineKeywords || [],
            },
          ])
        );
        setDuplicateExperienceCall(true);
      }
    }
  }

  React.useEffect(() => {
    if (experienceAddSuccess === true && duplicateExperienceCall === true) {
      toast.success("Experience Duplicated Successfully");
      setDuplicateExperienceCall(false);
    }
  }, [experienceAddSuccess]);
  return (
    <div>
      {showEditExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditExperienceDialog
              setShowEditExperienceDialog={setShowEditExperienceDialog}
            />
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className={`col-lg-12`}>
            <div className="row">
              <div
                className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
                onClick={() => setShowAddExperienceDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                New XP
              </div>
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Experience List</th>
                      {allExperience && allExperience?.length !== 0 && (
                        <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allExperience?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Experience Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allExperience?.map((experience, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  dispatch(
                                    changeSelectedExperience(experience)
                                  );
                                  setShowViewSelectedExperience(true);
                                }}
                              >
                                {experience?.title}
                              </Button>
                            </td>

                            <td>
                              <Tooltip title="View" placement="top">
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() => {
                                    dispatch(
                                      changeSelectedExperience(experience)
                                    );
                                    setShowViewSelectedExperience(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <i
                                  className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                                  onClick={() =>
                                    dispatch(
                                      setupDeleteExperience(
                                        `?experienceId=${experience?.id}`
                                      )
                                    )
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip title="Edit" placement="top">
                                <i
                                  className="bi bi-pencil-square f-18  cursor-pointer"
                                  onClick={() => {
                                    dispatch(
                                      changeSelectedExperience(experience)
                                    );
                                    setShowEditExperienceDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Duplicate" placement="top">
                                <i
                                  className="bi bi-copy f-18 cursor-pointer px-3"
                                  onClick={() =>
                                    handleDuplicateExperience(experience)
                                  }
                                ></i>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default experienceRecord;
