import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const OptionRecord = ({
  setShowAddOptionDialog,
  setShowViewOptionDialog,
  setSelectedOption,
}) => {
  const { allOptions, loading } = useSelector((state) => state?.options);
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
                      <th className="per80">Option List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOptions?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Options Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allOptions?.map((option, index) => {
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

export default OptionRecord;
