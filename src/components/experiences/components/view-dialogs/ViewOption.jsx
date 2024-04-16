import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../../common/RichText";
import { useSelector, useDispatch } from "react-redux";
import {
  setupAddOption,
  setupDeleteOption,
} from "../../../../global-redux/reducers/options/slice";

const ViewselectedOptionDialog = ({
  selectedOption,
  setShowViewOptionDialog,
  setDuplicateOptionCall,
  setShowOptionEditDialog,
}) => {
  const dispatch = useDispatch();
  const { allExperience } = useSelector((state) => state?.experiences);
  const { loading, optionAddSuccess } = useSelector((state) => state?.options);

  function handleDuplicateOption() {
    if (selectedOption) {
      if (!loading) {
        dispatch(
          setupAddOption([
            {
              experienceId: selectedOption?.experienceId,
              title: selectedOption?.title + " Duplicated",
              xpAddress: selectedOption?.xpAddress,
              price: selectedOption?.price || [],
              duration: selectedOption?.duration || [],
              availableTime: selectedOption?.availableTime || [],
              links: selectedOption?.links || [],
              linkWithOtherExperience:
                selectedOption?.linkWithOtherExperience || [],
              providers: selectedOption?.providers || [],
              description: selectedOption?.description,
              termsAndConditions: selectedOption?.termsAndConditions,
              storyLineKeywords: selectedOption?.storyLineKeywords || [],
            },
          ])
        );
        setDuplicateOptionCall(true);
      }
    }
  }

  React.useEffect(() => {
    if (optionAddSuccess === true) {
      setShowViewOptionDialog(false);
    }
  }, [optionAddSuccess]);

  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="pb-4 heading">View Option</h2>
        <div className="float-end ">
          <div
            className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
            onClick={() => {
              setShowViewOptionDialog(false);
              setShowOptionEditDialog(true);
            }}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            Edit
          </div>
          <div
            className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 ${
              loading && "disabled"
            }   `}
            onClick={() => {
              if (!loading) {
                dispatch(setupDeleteOption(`?optionId=${selectedOption?.id}`));
              }
            }}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {loading ? "Loading..." : "Delete"}
          </div>
          <div
            className={`btn btn-labeled btn-secondary px-3 shadow  my-4 ${
              loading && "disabled"
            }  `}
            onClick={handleDuplicateOption}
          >
            <span className="btn-label me-2">
              <i className="fa fa-check-circle f-18"></i>
            </span>
            {loading ? "Loading..." : "Duplicate"}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Title</label>
            <p>
              {selectedOption?.title
                ? selectedOption?.title
                : "No Title Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Address</label>
            <p>
              {selectedOption?.xpAddress
                ? selectedOption?.xpAddress
                : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <label>Experience</label>
            <p>
              {allExperience?.find(
                (all) => all?.id === selectedOption?.experienceId
              )?.title || "No Experience Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!selectedOption?.price || selectedOption?.price?.length === 0 ? (
                <lable>No Price Provided</lable>
              ) : (
                selectedOption?.price?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Durations</label>
            <div>
              {!selectedOption?.duration ||
              selectedOption?.duration?.length === 0 ? (
                <lable>No Duration Provided</lable>
              ) : (
                selectedOption.duration?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Available Times</label>
            <div>
              {!selectedOption?.availableTime ||
              selectedOption?.availableTime?.length === 0 ? (
                <lable>No Time Provided</lable>
              ) : (
                selectedOption?.availableTime?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2">List Of Links</label>
          <div>
            {selectedOption?.links?.length === 0 ? (
              <lable>No Link Provided</lable>
            ) : (
              selectedOption?.links?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords</label>
          <div>
            {!selectedOption?.storyLineKeywords ||
            selectedOption?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              selectedOption?.storyLineKeywords?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <label>Description</label>
            <RichTextEditor
              initialValue={selectedOption?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={selectedOption?.termsAndConditions}
              readonly={true}
            />
          </div>
        </div>
        <div className="flex mb-2 flex-end">
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={() => setShowViewOptionDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewselectedOptionDialog;
