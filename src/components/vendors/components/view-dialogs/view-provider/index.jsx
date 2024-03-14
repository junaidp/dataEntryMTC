import React from "react";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../../../common/RichText";
import { useSelector } from "react-redux";

const ViewProviderDialog = ({ setShowViewSelectedProvider }) => {
  const { selectedProvider } = useSelector((state) => state.providers);
  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Provider</h2>
      <div>
        <div className="col-lg-8 mb-4">
          <TextField
            id="name"
            name="name"
            label="Provider name"
            variant="outlined"
            className="form-control"
            value={selectedProvider?.name}
            disabled
            readonly
          />
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <TextField
              id="address"
              name="address"
              label="Provider address"
              variant="outlined"
              className="form-control"
              value={selectedProvider?.address}
              disabled
              readonly
            />
          </div>
          <div className="col-lg-6 mb-4">
            <TextField
              id="pointOfContact"
              name="pointOfContact"
              label="Point of Contact"
              variant="outlined"
              className="form-control"
              value={selectedProvider?.pointOfContact}
              disabled
              readonly
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
              value={selectedProvider?.website}
              disabled
              readonly
            />
          </div>
          <div className="col-lg-6 mb-4">
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              className="form-control"
              value={selectedProvider?.email}
              disabled
              readonly
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <TextField
              id="email"
              name="email"
              label="Regions"
              variant="outlined"
              className="form-control"
              value={selectedProvider?.regionsCovered}
              disabled
              readonly
            />
          </div>
          <div className="col-lg-6 mb-4">
            <TextField
              id="email"
              name="email"
              label="Manage Venue"
              variant="outlined"
              className="form-control"
              value={selectedProvider?.manageVenue === true ? "true" : false}
              disabled
              readonly
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <RichTextEditor
              placeholder="Vendor’ Description"
              initialValue={selectedProvider.description}
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
