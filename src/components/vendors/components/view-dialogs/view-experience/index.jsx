import React from "react";
import RichTextEditor from "../../../../common/RichText";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

const ViewExperienceDialog = ({ setShowViewSelectedExperience }) => {
  const { selectedExperience } = useSelector((state) => state?.experiences);
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Experience</h2>
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Experience title:</label>
            <p>
              {selectedExperience?.title
                ? selectedExperience?.title
                : "No Title Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Experience address:</label>
            <p>
              {selectedExperience?.address
                ? selectedExperience?.address
                : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <label className="mb-2">List Of Prices:</label>
            <Card className="py-4">
              {!selectedExperience?.price ||
              selectedExperience?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                selectedExperience?.price?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                    />
                  );
                })
              )}
            </Card>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Durations:</label>
            <Card className="py-4">
              {!selectedExperience?.duration ||
              selectedExperience?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                selectedExperience?.duration?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                    />
                  );
                })
              )}
            </Card>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Available Times:</label>
            <Card className="py-4">
              {!selectedExperience?.availableTime ||
              selectedExperience?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                selectedExperience?.availableTime?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                    />
                  );
                })
              )}
            </Card>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords:</label>
          <Card className="py-4">
            {!selectedExperience?.storyLineKeywords ||
            selectedExperience?.storyLineKeywords?.length === 0 ? (
              <lable className="mx-2">No Keyword Provided</lable>
            ) : (
              selectedExperience?.storyLineKeywords?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                  />
                );
              })
            )}
          </Card>
        </div>
        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Experiences:</label>
          <Card className="py-4">
            {!selectedExperience?.linkWithOtherExperience ||
            selectedExperience?.linkWithOtherExperience?.length === 0 ? (
              <p className="mx-2">No Link With Other Experince Provided</p>
            ) : (
              selectedExperience?.linkWithOtherExperience?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.experienceName}-${key?.why}`}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                  />
                );
              })
            )}
          </Card>
        </div>
        <div className="mb-4">
          <label className="mb-2">List Of Links:</label>
          <Card className="py-4">
            {!selectedExperience?.links ||
            selectedExperience?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              selectedExperience?.links.map((key, index) => {
                return (
                  <Chip
                    label={key?.link}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                  />
                );
              })
            )}
          </Card>
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description:</label>
            <RichTextEditor
              initialValue={selectedExperience?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions:</label>
            <RichTextEditor
              initialValue={selectedExperience?.termsAndConditions}
              readonly={true}
            />
          </div>
        </div>
      </div>

      <div className="flex mb-2 flex-end">
        <div className="mx-4">
          <button
            type="button"
            className="btn btn-danger float-end"
            onClick={() => setShowViewSelectedExperience(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewExperienceDialog;
