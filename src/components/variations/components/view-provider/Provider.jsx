import React from "react";
import RichTextEditor from "../../../common/RichText";

const ViewProviderDialog = ({
  selectedProvider,
  setShowViewSelectedProvider,
}) => {
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Provider</h2>
      <div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <label>Provider name:</label>
            <p>
              {selectedProvider?.name
                ? selectedProvider?.name
                : "No Name Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Provider address:</label>
            <p>
              {selectedProvider?.address
                ? selectedProvider?.address
                : "No Address Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Point of Contact:</label>
            <p>
              {selectedProvider?.pointOfContact
                ? selectedProvider?.pointOfContact
                : "No Point Of Contact Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Website:</label>
            <p>
              {selectedProvider?.website
                ? selectedProvider?.website
                : "No Website Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Email:</label>
            <p>
              {selectedProvider?.email
                ? selectedProvider?.email
                : "No Email Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Manage Venue:</label>
            <p>
              {Boolean(selectedProvider.manageVenue) === true
                ? "True"
                : "False"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Regions:</label>
            <p>
              {selectedProvider?.regionsCovered
                ? selectedProvider?.regionsCovered
                : "No Regions Covered Provided"}
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description:</label>
            <RichTextEditor
              initialValue={selectedProvider.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions:</label>
            <RichTextEditor
              initialValue={selectedProvider.termsNConditions}
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
            onClick={() => setShowViewSelectedProvider(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProviderDialog;
