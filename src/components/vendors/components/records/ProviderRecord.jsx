import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const providersRecord = ({ setShowAddProviderDialog }) => {
  const { allProvider, loading } = useSelector((state) => state.providers);
  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="row">
          <div className={`col-lg-12`}>
            <div className="row">
              <div
                className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
                onClick={() => setShowAddProviderDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                New Provider
              </div>
              <div className="col-lg-10 mb-4">
                <table className="table table-bordered  table-hover rounded">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Sr No.</th>
                      <th className="per80">Provider List</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProvider?.length === 0 ? (
                      <tr>
                        <td>1</td>
                        <td className="per80">
                          <Button>No Provider Found. Please Add One</Button>
                        </td>
                      </tr>
                    ) : (
                      allProvider?.map((provider, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="per80">
                              <Button>{provider?.name}</Button>
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

export default providersRecord;
