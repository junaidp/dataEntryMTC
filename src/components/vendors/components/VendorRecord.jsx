import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RichTextEditor from "./RichText";

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
              <Select
                id="regionsCovered"
                name="regionsCovered"
                className="form-control w-100 h-40"
                disabled
                defaultValue={vendor?.regionsCovered?vendor?.regionsCovered:"No Regions Provided"}
              >
                <MenuItem value="">Select Region</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="US">US</MenuItem>
                <MenuItem value="Germany">Germany</MenuItem>
                <MenuItem value="Pakistan">Pakistan</MenuItem>
                <MenuItem value="No Regions Provided">
                  No Regions Provided
                </MenuItem>
              </Select>
            </div>

            <div className="col-lg-6 mb-4">
              <Select
                id="manageVenue"
                name="manageVenue"
                className="form-control w-100 h-40"
                disabled
                defaultValue={vendor?.manageVenue || false}
              >
                <MenuItem value="">Select One</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
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
