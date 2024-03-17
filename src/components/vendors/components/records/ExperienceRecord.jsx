import React from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { changeSelectedExperience } from "../../../../global-redux/reducers/experiences/slice";

const experienceRecord = ({
  setShowAddExperienceDialog,
  setShowViewSelectedExperience,
}) => {
  const dispatch = useDispatch();
  const { allExperience, loading } = useSelector((state) => state.experiences);
  return (
    <div>
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
                      <th className="per80">Experience List</th>
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
