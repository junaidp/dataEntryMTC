import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../common/RichText";
import { useSelector } from "react-redux";

const optionForm = ({ option }) => {
  const { allProvider } = useSelector((state) => state?.providers);
  const { allExperience } = useSelector((state) => state?.experiences);
  return (
    <div className="px-4 py-4">
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4 p-0" style={{ marginLeft: "-12px" }}>
            <label>Title</label>
            <p>{option?.title ? option?.title : "No Title Provided"}</p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Address</label>
            <p>
              {option?.xpAddress ? option?.xpAddress : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 mb-4 p-0">
            <label>Vendor</label>
            <p>
              {allProvider?.find((all) => all?.id === option?.providerId)
                ?.name || "No Vendor Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4" style={{ marginLeft: "-25px" }}>
            <label>Experience</label>
            <p>
              {allExperience?.find((all) => all?.id === option?.experienceId)
                ?.title || "No Experience Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!option?.price || option?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                option?.price?.map((key, index) => {
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
              {!option?.duration || option?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                option.duration?.map((key, index) => {
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
              {!option?.availableTime || option?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                option?.availableTime?.map((key, index) => {
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
            {option?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              option?.links?.map((key, index) => {
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
            {!option?.storyLineKeywords ||
            option?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              option?.storyLineKeywords?.map((key, index) => {
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
              initialValue={option?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={option?.termsAndConditions}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default optionForm;
