import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { setupDeleteVaration } from "../../../../global-redux/reducers/variations/slice";

const VariationRecord = ({
  setShowAddVariationDialog,
  setShowViewVariationDialog,
  setSelectedVariation,
}) => {
  const { allVariations, loading } = useSelector((state) => state?.variations);
  const dispatch = useDispatch();
  return (
    <div className="mt-4 mb-4">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className={`col-lg-12`}>
            <div className="row">
              <div
                className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
                onClick={() => setShowAddVariationDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                Variation
              </div>
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th className="per80">Variation List</th>
                      {allVariations && allVariations?.length !== 0 && (
                        <th className="per80">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {!allVariations || allVariations?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Variation Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allVariations?.map((variation, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedVariation(variation);
                                  setShowViewVariationDialog(true);
                                }}
                              >
                                {variation?.title}
                              </Button>
                            </td>
                            <td>
                              <i
                                className="fa-eye fa f-18 cursor-pointer"
                                onClick={() => {
                                  setSelectedVariation(variation);
                                  setShowViewVariationDialog(true);
                                }}
                              ></i>
                              <i
                                className="fa fa-trash text-danger f-18 px-3  cursor-pointer"
                                onClick={() =>
                                  dispatch(
                                    setupDeleteVaration(
                                      `?variationId=${variation?.id}`
                                    )
                                  )
                                }
                              ></i>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VariationRecord;
