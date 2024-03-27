import React from "react";
import Button from "@mui/material/Button";
import ViewSelectedProvider from "../view-dialogs/ViewProvider";
import AddProviderDialog from "../extras-add-dialogs.jsx/provider/AddProviderDialog";
import { useDispatch } from "react-redux";
import { setupAddExperience } from "../../../../global-redux/reducers/experiences/slice";

const ProviderRecord = ({ experience }) => {
  const dispatch = useDispatch();
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);

  function handleDeleteProvider(id) {
    let filteredExperienceObject = {
      ...experience,
      providers: experience?.providers?.filter((all) => all?.providerId !== id),
    };
    dispatch(setupAddExperience([filteredExperienceObject]));
  }

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
                  {experience?.providers &&
                    experience?.providers?.length !== 0 && (
                      <th className="per80">Actions</th>
                    )}
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
                        <td>
                          <i
                            className="fa-eye fa f-18 cursor-pointer"
                            onClick={() => {
                              setSelectedProvider(provider);
                              setShowViewSelectedProvider(true);
                            }}
                          ></i>
                          <i
                            className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                            onClick={() =>
                              handleDeleteProvider(provider?.providerId)
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
  );
};

export default ProviderRecord;
