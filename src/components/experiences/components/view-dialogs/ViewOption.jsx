import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../../common/RichText";
import { useSelector } from "react-redux";

const ViewselectedOptionDialog = ({
  selectedOption,
  setShowViewOptionDialog,
}) => {
  const { allExperience } = useSelector((state) => state?.experiences);
  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="pb-4 heading">View Option</h2>
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
