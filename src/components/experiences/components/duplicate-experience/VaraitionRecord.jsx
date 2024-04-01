import React from "react";
import Button from "@mui/material/Button";

const VariationRecord = ({
  setShowAddVariationDialog,
  setShowViewVariationDialog,
  setSelectedVariation,
  duplicateVariations,
  setDuplicateVariations,
}) => {
  return (
    <div className="mt-4 mb-4">
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
                    {duplicateVariations &&
                      duplicateVariations?.length !== 0 && (
                        <th className="per80">Actions</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {!duplicateVariations || duplicateVariations?.length === 0 ? (
                    <tr>
                      <td className="per80">
                        <Button className="cursor-pointer">
                          No Variation Found. Please Add One
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    duplicateVariations?.map((variation, index) => {
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
                                setDuplicateVariations((pre) =>
                                  pre.filter(
                                    (singleItem) =>
                                      singleItem?.id !== variation?.id
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
    </div>
  );
};

export default VariationRecord;
