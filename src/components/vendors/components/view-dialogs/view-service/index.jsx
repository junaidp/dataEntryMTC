import React from "react";
import RichTextEditor from "../../../../common/RichText";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

const ViewServiceeDialog = ({ setShowViewSelectedService }) => {
  const { selectedService } = useSelector((state) => state.services);
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Service</h2>
      <div className="float-end ">
        <div className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}>
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Edit
        </div>
        <div className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}>
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Delete
        </div>
        <div className={`btn btn-labeled btn-secondary px-3 shadow  my-4 `}>
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Duplicate
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Service title:</label>
            <p>
              {selectedService?.title
                ? selectedService?.title
                : "No Title Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Service address:</label>
            <p>
              {selectedService?.address
                ? selectedService?.address
                : "No Address Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div>
            <label className="mb-2">List Of Prices:</label>
            <Card className="py-4">
              {!selectedService?.price ||
              selectedService?.price?.length === 0 ? (
                <lable className="mx-2">No Price Provided</lable>
              ) : (
                selectedService?.price?.map((key, index) => {
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
              {!selectedService?.duration ||
              selectedService?.duration?.length === 0 ? (
                <lable className="mx-2">No Duration Provided</lable>
              ) : (
                selectedService?.duration?.map((key, index) => {
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
              {!selectedService?.availableTime ||
              selectedService?.availableTime?.length === 0 ? (
                <lable className="mx-2">No Time Provided</lable>
              ) : (
                selectedService?.availableTime?.map((key, index) => {
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
            {!selectedService?.storyLineKeywords ||
            selectedService?.storyLineKeywords?.length === 0 ? (
              <lable className="mx-2">No Keyword Provided</lable>
            ) : (
              selectedService?.storyLineKeywords?.map((key, index) => {
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
          <label className="mb-2">List Of Link With Other Services:</label>
          <Card className="py-4">
            {!selectedService?.linkWithOtherService ||
            selectedService?.linkWithOtherService?.length === 0 ? (
              <p className="mx-2">No Link With Other Service Provided</p>
            ) : (
              selectedService?.linkWithOtherService?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.serviceName}-${key?.why}`}
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
            {!selectedService?.links || selectedService?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              selectedService?.links.map((key, index) => {
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

        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description:</label>
            <RichTextEditor
              initialValue={selectedService?.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions:</label>
            <RichTextEditor
              initialValue={selectedService?.termsAndConditions}
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
            onClick={() => setShowViewSelectedService(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewServiceeDialog;
