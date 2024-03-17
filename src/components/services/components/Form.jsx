import React from "react";
import RichTextEditor from "../../../components/common/RichText";
import Chip from "@mui/material/Chip";

const ServiceForm = ({ service }) => {
  return (
    <div className="px-4 py-4">
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4 p-0">
            <label>Link With Other Experience</label>
            <p>
              {service?.linkWithOtherExperience
                ? service?.linkWithOtherExperience
                : "No Link With Other Experience Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Service title</label>
            <p>{service?.title ? service?.title : "No Title Provided"}</p>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <label>Service address</label>
          <p>{service?.address ? service?.address : "No Address Provided"}</p>
        </div>
        <div className="row">
          <div>
            <label className="mb-2">List Of Prices:</label>
            <div>
              {!service?.price || service?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                service?.price?.map((key, index) => {
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
            <label className="mb-2">List Of Durations:</label>
            <div>
              {!service?.duration || service?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                service.duration?.map((key, index) => {
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
            <label className="mb-2">List Of Available Times:</label>
            <div>
              {!service?.availableTime ||
              service?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                service?.availableTime?.map((key, index) => {
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
          <label className="mb-2">List Of Links:</label>
          <div>
            {service?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              service?.links?.map((key, index) => {
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
              placeholder="Description"
              initialValue={service.description}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
