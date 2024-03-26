import React from "react";
import RichTextEditor from "../../../components/common/RichText";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";

const ServiceForm = ({ service }) => {
  const { allVendors } = useSelector((state) => state?.vendors);
  return (
    <div className="px-4 py-4">
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4" style={{ marginLeft: "-14px" }}>
            <label>Service title</label>
            <p>{service?.title ? service?.title : "No Title Provided"}</p>
          </div>

          <div className="col-lg-6 mb-4">
            <label>Service address</label>
            <p>{service?.address ? service?.address : "No Address Provided"}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <label>Vendor</label>
            <p>
              {allVendors?.find((all) => all?.id === service?.vendorId)?.name ||
                "No Vendor Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!service?.price || service?.price?.length === 0 ? (
                <lable>No Price Provided</lable>
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
            <label className="mb-2">List Of Durations</label>
            <div>
              {!service?.duration || service?.duration?.length === 0 ? (
                <lable>No Duration Provided</lable>
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
            <label className="mb-2">List Of Available Times</label>
            <div>
              {!service?.availableTime ||
              service?.availableTime?.length === 0 ? (
                <lable>No Time Provided</lable>
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

        <div className="mt-4 mb-4">
          <label className="mb-2">List Of Links</label>
          <div>
            {service?.links?.length === 0 ? (
              <lable>No Link Provided</lable>
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
        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Services</label>
          <div>
            {!service?.linkWithOtherService ||
            service?.linkWithOtherService?.length === 0 ? (
              <p>No Link With Other Service Provided</p>
            ) : (
              service?.linkWithOtherService?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.serviceName}-${key?.why}`}
                    key={index}
                    variant="outlined"
                    className="mb-2 mr-2"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Experiences</label>
          <div>
            {!service?.linkWithOtherExperience ||
            service?.linkWithOtherExperience?.length === 0 ? (
              <p>No Link With Other Experience Provided</p>
            ) : (
              service?.linkWithOtherExperience?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.experienceName}-${key?.why}`}
                    key={index}
                    variant="outlined"
                    className="mb-2 mr-2"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords</label>
          <div>
            {!service?.storyLineKeywords ||
            service?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              service?.storyLineKeywords?.map((key, index) => {
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
              initialValue={
                service?.description !== ""
                  ? service?.description
                  : "No Description Provided"
              }
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <label>Terms & Condition</label>
            <RichTextEditor
              initialValue={
                service?.termsAndConditions !== ""
                  ? service?.termsAndConditions
                  : "No Terms & Conditions Provided"
              }
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
