import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../common/RichText";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import ViewSelectedProvider from "./view-provider/Provider";
import AddProviderDialog from "./add-provider/Provider";
import { setupAddOption } from "../../../global-redux/reducers/options/slice";
import { setupAddProvider } from "../../../global-redux/reducers/providers/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditProviderDialog from "./edit-provider/EditProvider";

const optionForm = ({ option }) => {
  const dispatch = useDispatch();
  const [duplicateProvider, setDuplicateProvider] = React.useState(false);
  const { allExperience } = useSelector((state) => state?.experiences);
  const { allProvider, providerAddSuccess, loading } = useSelector(
    (state) => state.providers
  );
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);
  const [showEditProviderDialog, setShowEditProviderDialog] =
    React.useState(false);

  function handleDeleteProvider(id) {
    let filteredOptionObject = {
      ...option,
      providers: option?.providers?.filter((all) => all?.providerId !== id),
    };
    dispatch(setupAddOption([filteredOptionObject]));
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
      setDuplicateProvider(true);
    }
  }

  React.useEffect(() => {
    if (providerAddSuccess === true && duplicateProvider === true) {
      toast.success("Provider Duplicated Successfully", {
        toastId: "optionSectionDuplicated",
      });
      setDuplicateProvider(false);
    }
  }, [providerAddSuccess]);
  return (
    <div className="px-4 py-4">
      {showViewSelectedProvider && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewSelectedProvider
              selectedProvider={selectedProvider}
              setShowViewSelectedProvider={setShowViewSelectedProvider}
              setShowEditProviderDialog={setShowEditProviderDialog}
              setDuplicateProvider={setDuplicateProvider}
              option={option}
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
      <div>
        <div className="row">
          <div className="col-lg-4 mb-4" style={{ marginLeft: "-12px" }}>
            <label>Title</label>
            <p>{option?.title ? option?.title : "No Title Provided"}</p>
          </div>
          <div className="col-lg-4 mb-4">
            <label>Address</label>
            <p>
              {option?.xpAddress ? option?.xpAddress : "No Address Provided"}
            </p>
          </div>
          <div className="col-lg-4 mb-4">
            <label>Experience</label>
            <p>
              {allExperience?.find((all) => all?.id === option?.experienceId)
                ?.title || "No Experience Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!option?.price || option?.price?.length === 0 ? (
                <lable>No Price Provided</lable>
              ) : (
                option?.price?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Durations</label>
            <div>
              {!option?.duration || option?.duration?.length === 0 ? (
                <lable>No Duration Provided</lable>
              ) : (
                option.duration?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Available Times</label>
            <div>
              {!option?.availableTime || option?.availableTime?.length === 0 ? (
                <lable>No Time Provided</lable>
              ) : (
                option?.availableTime?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-2">List Of Links</label>
          <div>
            {option?.links?.length === 0 ? (
              <lable>No Link Provided</lable>
            ) : (
              option?.links?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords</label>
          <div>
            {!option?.storyLineKeywords ||
            option?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              option?.storyLineKeywords?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="max-height-200 overflow-y-auto mb-4">
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
                  Provider
                </div>
                <div className="col-lg-10">
                  <table className="table table-bordered  table-hover rounded mb-0">
                    <thead className="bg-secondary text-white">
                      <tr>
                        <th>Provider List</th>
                        {option?.providers &&
                          option?.providers?.length !== 0 && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {!option?.providers || option?.providers?.length === 0 ? (
                        <tr>
                          <td className="per80">
                            <Button className="cursor-pointer">
                              No Provider Found. Please Add One
                            </Button>
                          </td>
                        </tr>
                      ) : (
                        option?.providers?.map((provider, index) => {
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
                                    onClick={() =>
                                      handleDuplicateProvider(provider)
                                    }
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
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <label>Description</label>
            <RichTextEditor
              initialValue={
                option?.description !== ""
                  ? option?.description
                  : "No Description Provided"
              }
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={
                option?.termsAndConditions !== ""
                  ? option?.termsAndConditions
                  : "No Terms & Condition Provided"
              }
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default optionForm;
