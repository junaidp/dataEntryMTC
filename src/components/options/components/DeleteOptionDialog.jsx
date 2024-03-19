import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupDeleteOption,
  resetOptions,
} from "../../../global-redux/reducers/options/slice";

const DeleteVendorDialog = ({ setShowDeleteOptionDialog, currentOptionId }) => {
  const dispatch = useDispatch();
  const { loading, optionAddSuccess } = useSelector((state) => state?.options);
  function handleDeleteOption() {
    if (!loading) {
      dispatch(setupDeleteOption(`?optionId=${currentOptionId}`));
    }
  }

  React.useEffect(() => {
    if (optionAddSuccess) {
      setShowDeleteOptionDialog(false);
      dispatch(resetOptions());
    }
  }, [optionAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the option?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteOption}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteOptionDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVendorDialog;
