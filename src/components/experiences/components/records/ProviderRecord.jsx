import React from "react";
import Button from "@mui/material/Button";
import ViewSelectedProvider from "../view-dialogs/ViewProvider";
import AddProviderDialog from "../extras-add-dialogs.jsx/provider/AddProviderDialog";
import { useDispatch, useSelector } from "react-redux";
import { setupAddExperience } from "../../../../global-redux/reducers/experiences/slice";
import { setupAddProvider } from "../../../../global-redux/reducers/providers/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditProviderDialog from "../edit-dialogs/edit-provider/EditProvider";

const ProviderRecord = ({ experience }) => {
  const dispatch = useDispatch();
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const { allProvider, providerAddSuccess, loading } = useSelector(
    (state) => state.providers
  );
  const [showEditProviderDialog, setShowEditProviderDialog] =
    React.useState(false);
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);
  const [duplicateProviderCall, setDuplicateProviderCall] =
    React.useState(false);

  function handleDeleteProvider(id) {
    let filteredExperienceObject = {
      ...experience,
      providers: experience?.providers?.filter((all) => all?.providerId !== id),
    };
    dispatch(setupAddExperience([filteredExperienceObject]));
  }

  function handleDuplicateProvider(item) {
    let currentDuplicatedProvider = allProvider?.find(
      (provider) => provider?.id === item?.providerId
    );
    if (currentDuplicatedProvider) {
      if (!loading) {
        dispatch(
          setupAddProvider([
            {
              name: currentDuplicatedProvider?.name + " Duplicated",
              address: currentDuplicatedProvider?.address,
              website: currentDuplicatedProvider?.website,
              pointOfContact: currentDuplicatedProvider?.pointOfContact,
              email: currentDuplicatedProvider?.email,
              manageVenue: currentDuplicatedProvider?.manageVenue,
              regionsCovered: currentDuplicatedProvider?.regionsCovered,
              vendorId: currentDuplicatedProvider?.vendorId,
              description: currentDuplicatedProvider?.description,
              termsNConditions: currentDuplicatedProvider?.termsNConditions,
            },
          ])
        );
      }
      setDuplicateProviderCall(true);
    }
  }

  React.useEffect(() => {
    if (providerAddSuccess === true && duplicateProviderCall === true) {
      toast.success("Provider Duplicated Successfully", {
        toastId: "providerDuplicated",
      });
      setDuplicateProviderCall(false);
    }
  }, [providerAddSuccess]);

  return (
    <div className="row mt-4 mb-4">
      {showViewSelectedProvider && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewSelectedProvider
              selectedProvider={selectedProvider}
              setShowViewSelectedProvider={setShowViewSelectedProvider}
              setShowEditProviderDialog={setShowEditProviderDialog}
              setDuplicateProviderCall={setDuplicateProviderCall}
              experience={experience}
            />
          </div>
        </div>
      )}
      {showEditProviderDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditProviderDialog
              setShowEditProviderDialog={setShowEditProviderDialog}
              selectedProvider={selectedProvider}
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
                          <Tooltip title="View" placement="top">
                            <i
                              className="fa-eye fa f-18 cursor-pointer"
                              onClick={() => {
                                setSelectedProvider(provider);
                                setShowViewSelectedProvider(true);
                              }}
                            ></i>
                          </Tooltip>
                          <Tooltip title="Delete" placement="top">
                            <i
                              className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                              onClick={() =>
                                handleDeleteProvider(provider?.providerId)
                              }
                            ></i>
                          </Tooltip>
                          <Tooltip title="Edit" placement="top">
                            <i
                              className="bi bi-pencil-square f-18  cursor-pointer"
                              onClick={() => {
                                setSelectedProvider(provider);
                                setShowEditProviderDialog(true);
                              }}
                            ></i>
                          </Tooltip>
                          <Tooltip title="Duplicate" placement="top">
                            <i
                              className="bi bi-copy f-18 cursor-pointer px-3"
                              onClick={() => handleDuplicateProvider(provider)}
                            ></i>
                          </Tooltip>
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
