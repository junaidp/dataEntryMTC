import React from "react";
import Chip from "@mui/material/Chip";
import RichTextEditor from "../../common/RichText";
import { useSelector, useDispatch } from "react-redux";
import ViewSelectedProvider from "./view-provider/Provider";
import AddProviderDialog from "./add-provider/Provider";
import Button from "@mui/material/Button";
import { setupAddVariation } from "../../../global-redux/reducers/variations/slice";

const variationForm = ({ variation }) => {
  const dispatch = useDispatch();
  const { allExperience } = useSelector((state) => state?.experiences);
  const [selectedProvider, setSelectedProvider] = React.useState({});
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);
  function handleDeleteProvider(id) {
    let filteredVariationObject = {
      ...variation,
      providers: variation?.providers?.filter((all) => all?.providerId !== id),
    };
    dispatch(setupAddVariation([filteredVariationObject]));
  }
  return (
    <div className="px-4 py-4">
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
      <div>
        <div className="row">
          <div className="col-lg-4 mb-4" style={{ marginLeft: "-12px" }}>
            <label>Title</label>
            <p>{variation?.title ? variation?.title : "No Title Provided"}</p>
          </div>
          <div className="col-lg-4 mb-4">
            <label>Address</label>
            <p>
              {variation?.xpAddress
                ? variation?.xpAddress
                : "No Address Provided"}
            </p>
          </div>

          <div className="col-lg-4 mb-4">
            <label>Experience</label>
            <p>
              {allExperience?.find((all) => all?.id === variation?.experienceId)
                ?.title || "No Experience Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!variation?.price || variation?.price?.length === 0 ? (
                <lable>No Price Provided</lable>
              ) : (
                variation?.price?.map((key, index) => {
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
              {!variation?.duration || variation?.duration?.length === 0 ? (
                <lable>No Duration Provided</lable>
              ) : (
                variation.duration?.map((key, index) => {
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
              {!variation?.availableTime ||
              variation?.availableTime?.length === 0 ? (
                <lable>No Time Provided</lable>
              ) : (
                variation?.availableTime?.map((key, index) => {
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
            {variation?.links?.length === 0 ? (
              <lable>No Link Provided</lable>
            ) : (
              variation?.links?.map((key, index) => {
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
            {!variation?.storyLineKeywords ||
            variation?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              variation?.storyLineKeywords?.map((key, index) => {
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
                        {variation?.providers &&
                          variation?.providers?.filter(
                            (singleItem) => singleItem !== null
                          )?.length !== 0 && <th>Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {!variation?.providers ||
                      variation?.providers?.filter(
                        (singleItem) => singleItem !== null
                      )?.length === 0 ? (
                        <tr>
                          <td className="per80">
                            <Button className="cursor-pointer">
                              No Provider Found. Please Add One
                            </Button>
                          </td>
                        </tr>
                      ) : (
                        variation?.providers
                          ?.filter((singleItem) => singleItem !== null)
                          ?.map((provider, index) => {
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
        </div>

        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <label>Description</label>
            <RichTextEditor
              initialValue={
                variation?.description !== ""
                  ? variation?.description
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
                variation?.termsAndConditions !== ""
                  ? variation?.termsAndConditions
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

export default variationForm;
