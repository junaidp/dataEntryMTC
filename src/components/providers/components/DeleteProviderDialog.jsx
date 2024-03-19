import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteProvider } from "../../../global-redux/reducers/providers/slice";

const DeleteProviderDialog = ({
  setShowDeleteProviderDialog,
  currentProviderId,
}) => {
  const dispatch = useDispatch();
  const { providerAddSuccess, loading } = useSelector(
    (state) => state.providers
  );
  function handleDeleteProvider() {
    if (!loading) {
      dispatch(setupDeleteProvider(`?providerId=${currentProviderId}`));
    }
  }

  React.useEffect(() => {
    if (providerAddSuccess) {
      setShowDeleteProviderDialog(false);
    }
  }, [providerAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the provider?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteProvider}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteProviderDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProviderDialog;
