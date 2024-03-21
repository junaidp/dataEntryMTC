import React from "react";
import RichTextEditor from "../../../components/common/RichText";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";

const Form = ({ experience }) => {
  const { allVendors } = useSelector((state) => state?.vendors);
  const { allProvider } = useSelector((state) => state?.providers);
  return (
    <div className="px-4 py-4">
      <div>
        <div className="row mx-0" style={{ margin: "0px" }}>
          <div className="col-lg-6 mb-4 p-0">
            <label>Experience title</label>
            <p>{experience?.title ? experience?.title : "No Title Provided"}</p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Experience address</label>
            <p>
              {experience?.address
                ? experience?.address
                : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row mx-0" style={{ margin: "0px" }}>
          <div className="col-lg-5 mb-4 p-0">
            <label>Vendor</label>
            <p>
              {allVendors?.find((item) => item?.id === experience?.vendorId)
                ?.name || "No Vendor Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4 p-0">
            <label>Provider</label>
            <p>
              {allProvider?.find((item) => item?.id === experience?.providerId)
                ?.name || "No Provider Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!experience?.price || experience?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                experience?.price?.map((key, index) => {
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
              {!experience?.duration || experience?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                experience?.duration?.map((key, index) => {
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
              {!experience?.availableTime ||
              experience?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                experience?.availableTime?.map((key, index) => {
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
        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords</label>
          <div>
            {!experience?.storyLineKeywords ||
            experience?.storyLineKeywords?.length === 0 ? (
              <lable className="mx-2">No Keyword Provided</lable>
            ) : (
              experience?.storyLineKeywords?.map((key, index) => {
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

        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Experiences</label>
          <div>
            {!experience?.linkWithOtherExperience ||
            experience?.linkWithOtherExperience?.length === 0 ? (
              <p className="mx-2">No Link With Other Experince Provided</p>
            ) : (
              experience?.linkWithOtherExperience?.map((key, index) => {
                return (
                  <Chip
                    label={key?.experienceName ? key?.experienceName : key?.why}
                    key={index}
                    variant="outlined"
                    className={`mr-2 mb-2`}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2">List Of Links</label>
          <div>
            {!experience?.links || experience?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              experience?.links.map((key, index) => {
                return (
                  <Chip
                    label={key?.link}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description</label>
            <RichTextEditor
              initialValue={experience?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={experience?.termsAndConditions}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
