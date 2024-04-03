import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  setupDeleteOption,
  setupAddOption,
} from "../../../../global-redux/reducers/options/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditOptionDialog from "../edit-dialogs/edit-option/EditOptionDialog";

const OptionRecord = ({
  setShowAddOptionDialog,
  setShowViewOptionDialog,
  setSelectedOption,
  selectedOption,
}) => {
  const dispatch = useDispatch();
  const { allOptions, loading, optionAddSuccess } = useSelector(
    (state) => state?.options
  );
  const [duplicateOptionCall, setDuplicateOptionCall] = React.useState(false);
  const [showOptionEditDialog, setShowOptionEditDialog] = React.useState(false);

  function handleDuplicateOption(item) {
    if (item) {
      if (!loading) {
        dispatch(
          setupAddOption([
            {
              experienceId: item?.experienceId,
              title: item?.title,
              xpAddress: item?.xpAddress,
              price: item?.price || [],
              duration: item?.duration || [],
              availableTime: item?.availableTime || [],
              links: item?.links || [],
              linkWithOtherExperience: item?.linkWithOtherExperience || [],
              providers: item?.providers || [],
              description: item?.description,
              termsAndConditions: item?.termsAndConditions,
              storyLineKeywords: item?.storyLineKeywords || [],
            },
          ])
        );
        setDuplicateOptionCall(true);
      }
    }
  }

  React.useEffect(() => {
    if (optionAddSuccess === true && duplicateOptionCall === true) {
      toast.success("Option Duplicated Successfully");
      setDuplicateOptionCall(false);
    }
  }, [optionAddSuccess]);

  return (
    <div className="mt-4 mb-4">
      {showOptionEditDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditOptionDialog
              setShowOptionEditDialog={setShowOptionEditDialog}
              selectedOption={selectedOption}
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
                onClick={() => setShowAddOptionDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                Option
              </div>
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Option List</th>
                      {allOptions && allOptions?.length !== 0 && (
                        <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {!allOptions || allOptions?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Options Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allOptions?.map((option, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedOption(option);
                                  setShowViewOptionDialog(true);
                                }}
                              >
                                {option?.title}
                              </Button>
                            </td>
                            <td>
                              <Tooltip title="View" placement="top">
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() => {
                                    setSelectedOption(option);
                                    setShowViewOptionDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <i
                                  className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                                  onClick={() =>
                                    dispatch(
                                      setupDeleteOption(
                                        `?optionId=${option?.id}`
                                      )
                                    )
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip title="Edit" placement="top">
                                <i
                                  className="bi bi-pencil-square f-18  cursor-pointer"
                                  onClick={() => {
                                    setSelectedOption(option);
                                    setShowOptionEditDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Duplicate" placement="top">
                                <i
                                  className="bi bi-copy f-18 cursor-pointer px-3"
                                  onClick={() => handleDuplicateOption(option)}
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

export default OptionRecord;
