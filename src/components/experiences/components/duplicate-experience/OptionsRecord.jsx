import React from "react";
import Button from "@mui/material/Button";
const OptionRecord = ({
  setShowAddOptionDialog,
  setShowViewOptionDialog,
  setSelectedOption,
  duplicateOptions,
  setDuplicateOptions,
}) => {
  return (
    <div className="mt-4 mb-4">
      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div
              className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
              onClick={() => setShowAddOptionDialog(true)}
            >
              <span className="btn-label me-4">
                <i className="fa fa-plus"></i>
              </span>
              Option
            </div>
            <div className="col-lg-10">
              <table className="table table-bordered  table-hover rounded mb-0">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Option List</th>
                    {duplicateOptions && duplicateOptions?.length !== 0 && (
                      <th>Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {!duplicateOptions || duplicateOptions?.length === 0 ? (
                    <tr>
                      <td className="per80">
                        <Button className="cursor-pointer">
                          No Options Found. Please Add One
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    duplicateOptions?.map((option, index) => {
                      return (
                        <tr key={index}>
                          <td className="per80">
                            <Button
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedOption(option);
                                setShowViewOptionDialog(true);
                              }}
                            >
                              {option?.title}
                            </Button>
                          </td>
                          <td>
                            <i
                              className="fa-eye fa f-18 cursor-pointer"
                              onClick={() => {
                                setSelectedOption(option);
                                setShowViewOptionDialog(true);
                              }}
                            ></i>
                            <i
                              className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                              onClick={() =>
                                setDuplicateOptions((pre) =>
                                  pre.filter(
                                    (singleItem) =>
                                      singleItem?.id !== option?.id
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

export default OptionRecord;
