import React from "react";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {
  setupGetAllService,
  resetServiceAddSuccess,
} from "../../global-redux/reducers/services/slice";
import {
  setupGetAllProvider,
  resetProviderAddSuccess,
} from "../../global-redux/reducers/providers/slice";
import {
  setupGetAllExperience,
  resetExperienceAddSuccess,
} from "../../global-redux/reducers/experiences/slice";
import VendorRecord from "./components/records/VendorRecord";
import ExperienceRecord from "./components/records/ExperienceRecord";
import ServiceRecord from "./components/records/ServiceRecord";
import ProviderRecord from "./components/records/ProviderRecord";
import AddVendorDialog from "./components/add-dialogs/add-vendor/AddVendorDialog";
import AddExperienceDialog from "./components/add-dialogs/add-experience/AddExperienceDialog";
import AddServiceDialog from "./components/add-dialogs/add-service/AddServiceDialog";
import AddProviderDialog from "./components/add-dialogs/add-provider/AddProviderDialog";
import ViewExperieceDialog from "./components/view-dialogs/view-experience";
import ViewProviderDialog from "./components/view-dialogs/view-provider";
import ViewServiceDialog from "./components/view-dialogs/view-service";
import EditVendorDialog from "./components/edit-dialogs/edit-vendor/index";
import DeleteVendorDialog from "./components/delete-vendor/index";

const Vendor = ({ setShowAddVendorDialog, showAddVendorDialog }) => {
  const { allVendors, loading, vendorAddSuccess } = useSelector(
    (state) => state.vendors
  );
  const { allExperience, experienceAddSuccess } = useSelector(
    (state) => state.experiences
  );
  const { allProvider, providerAddSuccess } = useSelector(
    (state) => state.providers
  );
  const { allService, serviceAddSuccess } = useSelector(
    (state) => state.services
  );

  const dispatch = useDispatch({ showAddVendorDialog });
  const [vendorPage, setVendorPage] = React.useState(1);
  const [currentVendorId, setCurrentVendorId] = React.useState("");
  const [showAddExperienceDialog, setShowAddExperienceDialog] =
    React.useState(false);
  const [showAddServiceDialog, setShowAddServiceDialog] = React.useState(false);
  const [duplicateServiceCall, setDuplicateServiceCall] = React.useState(false);
  const [showEditServiceDialog, setShowEditServceDialog] =
    React.useState(false);
  const [showAddProviderDialog, setShowAddProviderDialog] =
    React.useState(false);
  const [duplicateProviderCall, setDuplicateProviderCall] =
    React.useState(false);
  const [showEditProviderDialog, setShowEditProviderDialog] =
    React.useState(false);

  const [showViewSelectedExperience, setShowViewSelectedExperience] =
    React.useState(false);
  const [showEditExperienceDialog, setShowEditExperienceDialog] =
    React.useState(false);
  const [duplicateExperienceCall, setDuplicateExperienceCall] =
    React.useState(false);
  const [showViewSelectedService, setShowViewSelectedService] =
    React.useState(false);
  const [showViewSelectedProvider, setShowViewSelectedProvider] =
    React.useState(false);
  const [showEditVendorDialog, setShowEditVendorDialog] = React.useState(false);
  const [showDeleteVendorDialog, setShowDeleteVendorDialog] =
    React.useState(false);
  const handleChangeVendorPage = (_, value) => {
    setVendorPage(value);
  };
  React.useEffect(() => {
    if (currentVendorId && currentVendorId !== "") {
      dispatch(setupGetAllService(currentVendorId));
      dispatch(setupGetAllProvider(currentVendorId));
      dispatch(setupGetAllExperience(currentVendorId));
    }
  }, [currentVendorId]);

  React.useEffect(() => {
    if (vendorAddSuccess) {
      setCurrentVendorId("");
      dispatch(setupGetAllVendors());
      setVendorPage(1);
    }
  }, [vendorAddSuccess]);

  React.useEffect(() => {
    if (experienceAddSuccess) {
      dispatch(setupGetAllExperience(currentVendorId));
      dispatch(resetExperienceAddSuccess());
    }
  }, [experienceAddSuccess]);
  React.useEffect(() => {
    if (serviceAddSuccess) {
      dispatch(setupGetAllService(currentVendorId));
      dispatch(resetServiceAddSuccess());
    }
  }, [serviceAddSuccess]);
  React.useEffect(() => {
    if (providerAddSuccess) {
      dispatch(setupGetAllProvider(currentVendorId));
      dispatch(resetProviderAddSuccess());
    }
  }, [providerAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllVendors());
  }, []);

  return (
    <div className="col-lg-12 w-100">
      {showAddVendorDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddVendorDialog setShowAddVendorDialog={setShowAddVendorDialog} />
          </div>
        </div>
      )}
      {showEditVendorDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditVendorDialog
              setShowEditVendorDialog={setShowEditVendorDialog}
              currentVendorId={currentVendorId}
            />
          </div>
        </div>
      )}
      {showDeleteVendorDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteVendorDialog
              setShowDeleteVendorDialog={setShowDeleteVendorDialog}
              currentVendorId={currentVendorId}
            />
          </div>
        </div>
      )}
      {showAddExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddExperienceDialog
              setShowAddExperienceDialog={setShowAddExperienceDialog}
              currentVendorId={currentVendorId}
            />
          </div>
        </div>
      )}
      {showViewSelectedExperience && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewExperieceDialog
              setShowViewSelectedExperience={setShowViewSelectedExperience}
              setShowEditExperienceDialog={setShowEditExperienceDialog}
              setDuplicateExperienceCall={setDuplicateExperienceCall}
            />
          </div>
        </div>
      )}
      {showAddServiceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddServiceDialog
              setShowAddServiceDialog={setShowAddServiceDialog}
              currentVendorId={currentVendorId}
            />
          </div>
        </div>
      )}
      {showViewSelectedService && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewServiceDialog
              setShowViewSelectedService={setShowViewSelectedService}
              setShowEditServceDialog={setShowEditServceDialog}
              setDuplicateServiceCall={setDuplicateServiceCall}
            />
          </div>
        </div>
      )}
      {showAddProviderDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddProviderDialog
              setShowAddProviderDialog={setShowAddProviderDialog}
              currentVendorId={currentVendorId}
              
            />
          </div>
        </div>
      )}
      {showViewSelectedProvider && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewProviderDialog
              setShowViewSelectedProvider={setShowViewSelectedProvider}
              setDuplicateProviderCall={setDuplicateProviderCall}
              setShowEditProviderDialog={setShowEditProviderDialog}
            />
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : allVendors?.length === 0 || allVendors[0]?.error === "Not Found" ? (
        "Not Vendor Found"
      ) : (
        <div className="accordion" id="accordionFlushExample">
          {allVendors
            ?.slice((vendorPage - 1) * 10, vendorPage * 10)
            ?.map((vendor, index) => {
              return (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                      onClick={() => setCurrentVendorId(vendor?.id)}
                    >
                      <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                      {vendor?.name ? vendor?.name : "No Name Provided"}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div className="container">
                        <div className="float-end mb-2">
                          <div
                            className={`btn btn-labeled btn-primary px-3 shadow  my-4 `}
                            onClick={() => setShowEditVendorDialog(true)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Edit
                          </div>
                          <div
                            className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                            onClick={() => setShowDeleteVendorDialog(true)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Delete
                          </div>
                        </div>
                        <VendorRecord
                          key={index}
                          vendor={vendor}
                          setCurrentVendorId={setCurrentVendorId}
                        />
                        <div className="  col-lg-6 h-40 shadow h-40 text-between mb-4 margin-auto">
                          Expertise
                        </div>
                        <div className="px-4 py-2 ml-4">
                          <div className="max-height-200 overflow-y-auto mb-4">
                            <ExperienceRecord
                              setShowAddExperienceDialog={
                                setShowAddExperienceDialog
                              }
                              setShowViewSelectedExperience={
                                setShowViewSelectedExperience
                              }
                              showEditExperienceDialog={
                                showEditExperienceDialog
                              }
                              setShowEditExperienceDialog={
                                setShowEditExperienceDialog
                              }
                              duplicateExperienceCall={duplicateExperienceCall}
                              setDuplicateExperienceCall={
                                setDuplicateExperienceCall
                              }
                            />
                          </div>
                          <div className="max-height-200 overflow-y-auto mb-4">
                            <ServiceRecord
                              setShowAddServiceDialog={setShowAddServiceDialog}
                              setShowViewSelectedService={
                                setShowViewSelectedService
                              }
                              duplicateServiceCall={duplicateServiceCall}
                              setDuplicateServiceCall={setDuplicateServiceCall}
                              showEditServiceDialog={showEditServiceDialog}
                              setShowEditServceDialog={setShowEditServceDialog}
                            />
                          </div>
                          <div className="max-height-200 overflow-y-auto mb-4">
                            <ProviderRecord
                              setShowAddProviderDialog={
                                setShowAddProviderDialog
                              }
                              setShowViewSelectedProvider={
                                setShowViewSelectedProvider
                              }
                              duplicateProviderCall={duplicateProviderCall}
                              setDuplicateProviderCall={
                                setDuplicateProviderCall
                              }
                              showEditProviderDialog={showEditProviderDialog}
                              setShowEditProviderDialog={
                                setShowEditProviderDialog
                              }
                            />
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-4 mb-4">
                              <label>Total Experiences</label>
                              <p>{allExperience?.length}</p>
                            </div>
                            <div className="col-lg-4 mb-4">
                              <label>Total Services</label>
                              <p>{allService?.length}</p>
                            </div>
                            <div className="col-lg-4 mb-4">
                              <label>Total Providers</label>
                              <p>{allProvider?.length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Pagination
        count={Math.ceil(allVendors?.length / 10)}
        page={vendorPage}
        onChange={handleChangeVendorPage}
      />
    </div>
  );
};

export default Vendor;
