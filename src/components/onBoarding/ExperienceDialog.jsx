import React from "react";
import { useSelector } from "react-redux";
import ExperienceCard from "./ExperienceCard";
const ViewExperienceDialog = ({ setShowViewExperienceDialog }) => {
  const { experiences } = useSelector((state) => state?.onBoard);

  React.useEffect(() => {
    if (experiences?.length === 0) {
      setShowViewExperienceDialog(false);
    }
  }, [experiences]);
  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="pb-4 heading">List Of Experiences</h2>

        <div className="mx-2">
          <div className="row">
            {experiences?.length === 0 ? (
              <p className="float-left">No Experience To Show!</p>
            ) : (
              experiences?.map((item, index) => {
                return (
                  <div className="col-lg-4 gap-4">
                    <ExperienceCard key={index} item={item} />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex mb-2 flex-end">
          <button
            type="button"
            className="btn btn-danger float-end mt-2 "
            onClick={() => setShowViewExperienceDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewExperienceDialog;
