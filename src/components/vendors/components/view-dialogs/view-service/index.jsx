import React from "react";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../../../common/RichText";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

const ViewServiceDialog = ({ setShowViewSelectedService }) => {
  const { selectedService } = useSelector((state) => state.services);
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Service</h2>
      <div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <TextField
              id="title"
              name="title"
              label="Service title"
              variant="outlined"
              className="form-control"
              value={selectedService?.title}
              disabled
              readonly
            />
          </div>
          <div className="col-lg-6 mb-4">
            <TextField
              id="title"
              name="linkWithOtherExperience"
              label="Link With Other Experience"
              variant="outlined"
              className="form-control"
              value={selectedService?.linkWithOtherExperience}
              disabled
              readonly
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <TextField
              id="address"
              name="address"
              label="Service address"
              variant="outlined"
              className="form-control"
              value={selectedService?.address}
              disabled
              readonly
            />
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
                selectedService.duration?.map((key, index) => {
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

        <div className="mt-4">
          <label className="mb-2">List Of Links:</label>
          <Card className="py-4">
            {selectedService?.links?.length === 0 ? (
              <lable className="mx-2">No Link Provided</lable>
            ) : (
              selectedService?.links?.map((key, index) => {
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

        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <RichTextEditor
              placeholder="Description"
              initialValue={selectedService.description}
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

export default ViewServiceDialog;
