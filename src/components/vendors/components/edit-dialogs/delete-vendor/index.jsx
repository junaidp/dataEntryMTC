import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupDeleteVendor,
  resetVendorAddSuccess,
} from "../../../../../global-redux/reducers/vendor/slice";

const DeleteVendorDialog = ({ setShowDeleteVendorDialog, currentVendorId }) => {
  const dispatch = useDispatch();
  const { loading, vendorAddSuccess } = useSelector((state) => state.vendors);

  function handleDeleteVendor() {
    if (!loading) {
      dispatch(setupDeleteVendor(`?vendorId=${currentVendorId}`));
    }
  }

  React.useEffect(() => {
    if (vendorAddSuccess) {
      dispatch(resetVendorAddSuccess());
      setShowDeleteVendorDialog(false);
    }
  }, [vendorAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the vendor?</p>
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
            onClick={() => setShowDeleteVendorDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVendorDialog;
