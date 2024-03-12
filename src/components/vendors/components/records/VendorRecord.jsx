import React from "react";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../common/RichText";

const VendorRecord = ({ vendor }) => {
  return (
    <div>
      <div className="px-4 py-4">
        <div>
          <div className="col-lg-8 mb-4">
            <TextField
              id="name"
              name="name"
              label="Vendor’s name"
              variant="outlined"
              className="form-control"
              disabled
              defaultValue={vendor?.name || "No Name Provided"}
            />
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="address"
                name="address"
                label="Vendor’s address"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={vendor?.address || "No Address Provided"}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <TextField
                id="pointOfContact"
                name="pointOfContact"
                label="Point of Contact"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={
                  vendor?.pointOfContact || "No Point Of Contact Provided"
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="website"
                name="website"
                label="Website"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={vendor?.website || "No Website Provided"}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={vendor?.email || "No Email Provided"}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="pointOfContact"
                name="pointOfContact"
                label="Regions Covered"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={
                  vendor?.regionsCovered
                    ? vendor?.regionsCovered
                    : "No Regions Provided"
                }
              />
            </div>

            <div className="col-lg-6 mb-4">
              <TextField
                id="pointOfContact"
                name="pointOfContact"
                label="Manage Venue"
                variant="outlined"
                className="form-control"
                disabled
                defaultValue={vendor?.manageVenue === true ? "true" : "false"}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <RichTextEditor
                initialValue={
                  vendor.description
                    ? vendor.description
                    : "<p>No Description Provided</p>"
                }
                placeholder="Decsription"
                readonly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRecord;
