import React from "react";
import RichTextEditor from "../common/RichText";

const VendorRecord = ({ vendor }) => {
  return (
    <div>
      <div className="px-4 py-4">
        <div>
          <div className="col-lg-12 mb-4">
            <label>Vendor’s name</label>
            <p>{vendor?.name || "No Name Provided"}</p>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <label>Vendor’s address</label>
              <p>{vendor?.address || "No Address Provided"}</p>
            </div>
            <div className="col-lg-6 mb-4">
              <label>Point of Contact</label>
              <p>{vendor?.pointOfContact || "No Point Of Contact Provided"}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <label>Website</label>
              <p>{vendor?.website || "No Website Provided"}</p>
            </div>
            <div className="col-lg-6 mb-4">
              <label>Email</label>
              <p>{vendor?.email || "No Email Provided"}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <label>Regions Covered</label>
              <p>
                {vendor?.regionsCovered
                  ? vendor?.regionsCovered
                  : "No Regions Provided"}
              </p>
            </div>
            <div className="col-lg-6 mb-4">
              <label>Manage Venue</label>
              <p>{vendor?.manageVenue === true ? "true" : "false"}</p>
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
