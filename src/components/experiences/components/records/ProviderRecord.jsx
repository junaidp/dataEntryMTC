import React from "react";
import Button from "@mui/material/Button";
import ViewSelectedProvider from "../view-dialogs/ViewProvider";
import AddProviderDialog from "../extras-add-dialogs.jsx/provider/AddProviderDialog";

const ProviderRecord = ({ experience }) => {
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);
  return (
    <div className="row mt-4 mb-4">
      {showViewSelectedProvider && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewSelectedProvider
              selectedProvider={selectedProvider}
              setShowViewSelectedProvider={setShowViewSelectedProvider}
            />
          </div>
        </div>
      )}
      {showAddProviderDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddProviderDialog
              setShowAddProviderDialog={setShowAddProviderDialog}
            />
          </div>
        </div>
      )}
      <div className={`col-lg-12`}>
        <div className="row">
          <div
            className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
            onClick={() => setShowAddProviderDialog(true)}
          >
            <span className="btn-label me-4">
              <i className="fa fa-plus"></i>
            </span>
            Provider
          </div>
          <div className="col-lg-10">
            <table className="table table-bordered  table-hover rounded mb-0">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="per80">Provider List</th>
                </tr>
              </thead>
              <tbody>
                {!experience?.providers ||
                experience?.providers?.length === 0 ? (
                  <tr>
                    <td className="per80">
                      <Button className="cursor-pointer">
                        No Provider Found. Please Add One
                      </Button>
                    </td>
                  </tr>
                ) : (
                  experience?.providers?.map((provider, index) => {
                    return (
                      <tr key={index}>
                        <td className="per80">
                          <Button
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedProvider(provider);
                              setShowViewSelectedProvider(true);
                            }}
                          >
                            {provider?.providerName}
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
  );
};

export default ProviderRecord;
