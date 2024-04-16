import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  setupDeleteVaration,
  setupAddVariation,
} from "../../../../global-redux/reducers/variations/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditVariationDialog from "../edit-dialogs/edit-variation/EditVariationDialog";

const VariationRecord = ({
  setShowAddVariationDialog,
  setShowViewVariationDialog,
  setSelectedVariation,
  selectedVariation,
  duplicateVariationCall,
  setDuplicateVariationCall,
  showEditVariationDialog,
  setShowEditVariationDialog,
}) => {
  const dispatch = useDispatch();
  const { allVariations, loading, variationAddSuccess } = useSelector(
    (state) => state?.variations
  );
  function handleDuplicateVariation(item) {
    if (item) {
      if (!loading) {
        dispatch(
          setupAddVariation([
            {
              experienceId: item?.experienceId,
              title: item?.title + " Duplicated",
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
        setDuplicateVariationCall(true);
      }
    }
  }

  React.useEffect(() => {
    if (variationAddSuccess === true && duplicateVariationCall === true) {
      toast.success("Variation Duplicated Successfully", {
        toastId: "variationDuplicated",
      });
      setDuplicateVariationCall(false);
    }
  }, [variationAddSuccess]);

  return (
    <div className="mt-4 mb-4">
      {showEditVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditVariationDialog
              setShowEditVariationDialog={setShowEditVariationDialog}
              selectedVariation={selectedVariation}
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
                onClick={() => setShowAddVariationDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                Variation
              </div>
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="per80">Variation List</th>
                      {allVariations && allVariations?.length !== 0 && (
                        <th className="per80">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {!allVariations || allVariations?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Variation Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allVariations?.map((variation, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedVariation(variation);
                                  setShowViewVariationDialog(true);
                                }}
                              >
                                {variation?.title}
                              </Button>
                            </td>
                            <td>
                              <Tooltip title="View" placement="top">
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() => {
                                    setSelectedVariation(variation);
                                    setShowViewVariationDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <i
                                  className="fa fa-trash text-danger f-18 px-3  cursor-pointer"
                                  onClick={() =>
                                    dispatch(
                                      setupDeleteVaration(
                                        `?variationId=${variation?.id}`
                                      )
                                    )
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip title="Edit" placement="top">
                                <i
                                  className="bi bi-pencil-square f-18  cursor-pointer"
                                  onClick={() => {
                                    setSelectedVariation(variation);
                                    setShowEditVariationDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Duplicate" placement="top">
                                <i
                                  className="bi bi-copy f-18 cursor-pointer px-3"
                                  onClick={() =>
                                    handleDuplicateVariation(variation)
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

export default VariationRecord;
