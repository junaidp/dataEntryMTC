import React from "react";
import RichTextEditor from "../../../common/RichText";
import { useSelector, useDispatch } from "react-redux";
import { setupAddOption } from "../../../../global-redux/reducers/options/slice";
import { setupAddProvider } from "../../../../global-redux/reducers/providers/slice";

const ViewProviderDialog = ({
  selectedProvider,
  setShowViewSelectedProvider,
  setShowEditProviderDialog,
  setDuplicateProvider,
  option,
}) => {
  const dispatch = useDispatch();
  const { allProvider, loading, providerAddSuccess } = useSelector(
    (state) => state?.providers
  );
  const { optionAddSuccess, loading: optLoading } = useSelector(
    (state) => state?.options
  );
  const [provider, setProvider] = React.useState({});

  function handleDuplicateProvider() {
    let currentDuplicatedProvider = allProvider?.find(
      (provider) => provider?.id === selectedProvider?.providerId
    );
    if (currentDuplicatedProvider) {
      if (!loading) {
        dispatch(
          setupAddProvider([
            {
              name: currentDuplicatedProvider?.name + " Duplicated",
              address: currentDuplicatedProvider?.address,
              website: currentDuplicatedProvider?.website,
              pointOfContact: currentDuplicatedProvider?.pointOfContact,
              email: currentDuplicatedProvider?.email,
              manageVenue: currentDuplicatedProvider?.manageVenue,
              regionsCovered: currentDuplicatedProvider?.regionsCovered,
              vendorId: currentDuplicatedProvider?.vendorId,
              description: currentDuplicatedProvider?.description,
              termsNConditions: currentDuplicatedProvider?.termsNConditions,
            },
          ])
        );
      }
      setDuplicateProvider(true);
    }
  }

  function handleDeleteProvider(id) {
    let filteredOptionObject = {
      ...option,
      providers: option?.providers?.filter((all) => all?.providerId !== id),
    };
    dispatch(setupAddOption([filteredOptionObject]));
  }

  React.useEffect(() => {
    if (providerAddSuccess === true || optionAddSuccess === true) {
      setShowViewSelectedProvider(false);
    }
  }, [providerAddSuccess, optionAddSuccess]);

  React.useEffect(() => {
    setProvider(
      allProvider?.find((all) => all?.id === selectedProvider?.providerId)
    );
  }, []);
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
          className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4  ${
            optLoading && "disabled"
          }  `}
          onClick={() => handleDeleteProvider(selectedProvider?.providerId)}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          {optLoading ? "Loading..." : "Delete"}
        </div>
        <div
          className={`btn btn-labeled btn-secondary px-3 shadow  my-4   ${
            loading && "disabled"
          } `}
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
            <p>{provider?.name ? provider?.name : "No Name Provided"}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Provider address:</label>
            <p>
              {provider?.address ? provider?.address : "No Address Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Point of Contact:</label>
            <p>
              {provider?.pointOfContact
                ? provider?.pointOfContact
                : "No Point Of Contact Provided"}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Website:</label>
            <p>
              {provider?.website ? provider?.website : "No Website Provided"}
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Email:</label>
            <p>{provider?.email ? provider?.email : "No Email Provided"}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mb-4">
            <label>Manage Venue:</label>
            <p>{Boolean(provider.manageVenue) === true ? "True" : "False"}</p>
          </div>
          <div className="col-lg-6 mb-4">
            <label>Regions:</label>
            <p>
              {provider?.regionsCovered
                ? provider?.regionsCovered
                : "No Regions Covered Provided"}
            </p>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description:</label>
            <RichTextEditor
              initialValue={provider.description}
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions:</label>
            <RichTextEditor
              initialValue={provider.termsNConditions}
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
