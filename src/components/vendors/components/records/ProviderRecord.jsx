import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  changeSelectedProvider,
  setupDeleteProvider,
  setupAddProvider,
} from "../../../../global-redux/reducers/providers/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
import EditProviderDialog from "../edit-dialogs/edit-provider/EditProvider";

const providersRecord = ({
  setShowAddProviderDialog,
  setShowViewSelectedProvider,
}) => {
  const dispatch = useDispatch();
  const { allProvider, loading, providerAddSuccess } = useSelector(
    (state) => state.providers
  );
  const [duplicateProviderCall, setDuplicateProviderCall] =
    React.useState(false);
  const [showEditProviderDialog, setShowEditProviderDialog] =
    React.useState(false);

  function handleDuplicateProvider(item) {
    if (item) {
      if (!loading) {
        dispatch(
          setupAddProvider([
            {
              name: item?.name + " Duplicated",
              address: item?.address,
              website: item?.website,
              pointOfContact: item?.pointOfContact,
              email: item?.email,
              manageVenue: item?.manageVenue,
              regionsCovered: item?.regionsCovered,
              vendorId: item?.vendorId,
              description: item?.description,
              termsNConditions: item?.termsNConditions,
            },
          ])
        );
        setDuplicateProviderCall(true);
      }
    }
  }
  React.useEffect(() => {
    if (providerAddSuccess === true && duplicateProviderCall === true) {
      toast.success("Provider Duplicated Successfully");
      setDuplicateProviderCall(false);
    }
  }, [providerAddSuccess]);

  return (
    <div>
      {showEditProviderDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditProviderDialog
              setShowEditProviderDialog={setShowEditProviderDialog}
            />
          </div>
        </div>
      )}
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
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Provider List</th>
                      {allProvider && allProvider?.length !== 0 && (
                        <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allProvider?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Provider Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allProvider?.map((provider, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  dispatch(changeSelectedProvider(provider));
                                  setShowViewSelectedProvider(true);
                                }}
                              >
                                {provider?.name}
                              </Button>
                            </td>
                            <td>
                              <Tooltip title="View" placement="top">
                                <i
                                  className="fa-eye fa f-18 cursor-pointer"
                                  onClick={() => {
                                    dispatch(changeSelectedProvider(provider));
                                    setShowViewSelectedProvider(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Delete" placement="top">
                                <i
                                  className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                                  onClick={() =>
                                    dispatch(
                                      setupDeleteProvider(
                                        `?providerId=${provider?.id}`
                                      )
                                    )
                                  }
                                ></i>
                              </Tooltip>
                              <Tooltip title="Edit" placement="top">
                                <i
                                  className="bi bi-pencil-square f-18  cursor-pointer"
                                  onClick={() => {
                                    dispatch(changeSelectedProvider(provider));
                                    setShowEditProviderDialog(true);
                                  }}
                                ></i>
                              </Tooltip>
                              <Tooltip title="Duplicate" placement="top">
                                <i
                                  className="bi bi-copy f-18 px-3 cursor-pointer"
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
      )}
    </div>
  );
};

export default providersRecord;
