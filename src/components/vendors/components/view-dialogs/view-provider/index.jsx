import React from "react";
import RichTextEditor from "../../../../common/RichText";
import { useSelector, useDispatch } from "react-redux";
import {
  setupAddProvider,
  setupDeleteProvider,
} from "../../../../../global-redux/reducers/providers/slice";

const ViewProviderDialog = ({
  setShowViewSelectedProvider,
  setDuplicateProviderCall,
  setShowEditProviderDialog,
}) => {
  const dispatch = useDispatch();
  const { selectedProvider, loading, providerAddSuccess } = useSelector(
    (state) => state.providers
  );
  function handleDuplicateProvider() {
    if (selectedProvider) {
      if (!loading) {
        dispatch(
          setupAddProvider([
            {
              name: selectedProvider?.name + " Duplicated",
              address: selectedProvider?.address,
              website: selectedProvider?.website,
              pointOfContact: selectedProvider?.pointOfContact,
              email: selectedProvider?.email,
              manageVenue: selectedProvider?.manageVenue,
              regionsCovered: selectedProvider?.regionsCovered,
              vendorId: selectedProvider?.vendorId,
              description: selectedProvider?.description,
              termsNConditions: selectedProvider?.termsNConditions,
            },
          ])
        );
        setDuplicateProviderCall(true);
      }
    }
  }
  React.useEffect(() => {
    if (providerAddSuccess === true) {
      setShowViewSelectedProvider(false);
    }
  }, [providerAddSuccess]);

  return (
    <div className="px-4 py-4">
      <h2 className="pb-4 heading">View Provider</h2>
      <div className="float-end ">
        <div
          className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
          onClick={() => {
            setShowViewSelectedProvider(false);
            setShowEditProviderDialog(true);
          }}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          Edit
        </div>
        <div
          className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 ${
            loading && "disabled"
          } `}
          onClick={() => {
            if (!loading) {
              dispatch(
                setupDeleteProvider(`?providerId=${selectedProvider?.id}`)
              );
            }
          }}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          {loading ? "Loading..." : "Delete"}
        </div>
        <div
          className={`btn btn-labeled btn-secondary px-3 shadow  my-4 ${
            loading && "disabled"
          }`}
          onClick={handleDuplicateProvider}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          {loading ? "Loading..." : "Duplicate"}
        </div>
      </div>
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
