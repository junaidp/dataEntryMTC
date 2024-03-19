import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setupDeleteVaration,
  resetVariations,
} from "../../../global-redux/reducers/variations/slice";

const DeleteVariationDialog = ({
  setShowDeleteVariationDialog,
  currentVariationId,
}) => {
  const dispatch = useDispatch();
  const { loading, variationAddSuccess } = useSelector(
    (state) => state?.variations
  );
  function handleDeleteVariation() {
    if (!loading) {
      dispatch(setupDeleteVaration(`?variationId=${currentVariationId}`));
    }
  }

  React.useEffect(() => {
    if (variationAddSuccess) {
      setShowDeleteVariationDialog(false);
      dispatch(resetVariations());
    }
  }, [variationAddSuccess]);
  return (
    <div className="px-4 py-4">
      <div>
        <p>Are you sure you want to delete the variation?</p>
      </div>
      <div className="flex mb-2 flex-end">
        <div>
          <button
            type="submit"
            className={`btn btn-danger float-start ${loading && "disabled"} `}
            onClick={handleDeleteVariation}
          >
            {loading ? "Loading..." : "Delete"}
          </button>
        </div>
        <div className="mx-2">
          <button
            type="button"
            className="btn btn-primary float-end"
            onClick={() => setShowDeleteVariationDialog(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVariationDialog;
