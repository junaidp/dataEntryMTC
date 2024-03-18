import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setupDeleteService } from "../../../global-redux/reducers/services/slice";

const DeleteVendorDialog = ({
  setShowDeleteServiceDialog,
  currentServiceId,
}) => {
  const dispatch = useDispatch();
  const { loading, serviceAddSuccess } = useSelector((state) => state.services);

  function handleDeleteVendor() {
    if (!loading) {
      dispatch(setupDeleteService(`?serviceId=${currentServiceId}`));
    }
  }

  React.useEffect(() => {
    if (serviceAddSuccess) {
      setShowDeleteServiceDialog(false);
    }
  }, [serviceAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the service?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteVendor}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteServiceDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVendorDialog;
