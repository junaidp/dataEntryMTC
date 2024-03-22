import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../../common/RichText";
import { useSelector } from "react-redux";

const ViewSelectedVariationDialog = ({
  selectedVariation,
  setShowViewVariationDialog,
}) => {
  const { allProvider } = useSelector((state) => state?.providers);
  const { allExperience } = useSelector((state) => state?.experiences);
  return (
    <div className="px-4 py-4">
      <div>
        <h2 className="pb-4 heading">View Variation</h2>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Title</label>
            <p>
              {selectedVariation?.title
                ? selectedVariation?.title
                : "No Title Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Address</label>
            <p>
              {selectedVariation?.xpAddress
                ? selectedVariation?.xpAddress
                : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Provider</label>
            <p>
              {allProvider?.find(
                (all) => all?.id === selectedVariation?.providerId
              )?.name || "No Provider Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Experience</label>
            <p>
              {allExperience?.find(
                (all) => all?.id === selectedVariation?.experienceId
              )?.title || "No Experience Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!selectedVariation?.price ||
              selectedVariation?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                selectedVariation?.price?.map((key, index) => {
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
              {!selectedVariation?.duration ||
              selectedVariation?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                selectedVariation.duration?.map((key, index) => {
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
              {!selectedVariation?.availableTime ||
              selectedVariation?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                selectedVariation?.availableTime?.map((key, index) => {
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
            {selectedVariation?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              selectedVariation?.links?.map((key, index) => {
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
            {!selectedVariation?.storyLineKeywords ||
            selectedVariation?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              selectedVariation?.storyLineKeywords?.map((key, index) => {
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
              initialValue={selectedVariation?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={selectedVariation?.termsAndConditions}
              readonly={true}
            />
          </div>
        </div>
        <div className="flex mb-2 flex-end">
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={() => setShowViewVariationDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSelectedVariationDialog;
