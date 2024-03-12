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
import AddVendorDialog from "./components/dialogs/vendor/AddVendorDialog";
import RichTextEditor from "./components/common/RichText";
import TextField from "@mui/material/TextField";
import AddExperienceDialog from "./components/dialogs/experience/AddExperienceDialog";
import AddServiceDialog from "./components/dialogs/service/AddServiceDialog";
import AddProviderDialog from "./components/dialogs/provider/AddProviderDialog";

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
  const [showAddProviderDialog, setShowAddProviderDialog] =
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
      {loading ? (
        <CircularProgress />
      ) : allVendors?.length === 0 || allVendors[0]?.error === "Not Found" ? (
        "Not Vendor Found"
      ) : (
        <div className="accordion" id="accordionFlushExample">
          {allVendors
            ?.slice((vendorPage - 1) * 20, vendorPage * 20)
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
                        <VendorRecord
                          key={index}
                          vendor={vendor}
                          setCurrentVendorId={setCurrentVendorId}
                        />
                        <div className="btn btn-labeled btn-primary  col-lg-12 h-40 shadow h-40 text-between mb-4">
                          Expertise
                        </div>
                        <div className="px-4 py-2 ml-4">
                          <ExperienceRecord
                            setShowAddExperienceDialog={
                              setShowAddExperienceDialog
                            }
                          />
                          <ServiceRecord
                            setShowAddServiceDialog={setShowAddServiceDialog}
                          />
                          <ProviderRecord
                            setShowAddProviderDialog={setShowAddProviderDialog}
                          />
                          <div className="row">
                            <div className="col-lg-12">
                              <RichTextEditor
                                initialValue={""}
                                readonly={false}
                                placeholder="General Terms And Conditions "
                              />
                            </div>
                          </div>
                          <div className="row mt-4">
                            <div className="col-lg-4">
                              <TextField
                                id="outlined-number"
                                label="Total Experiences"
                                className="w-100"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                defaultValue={allExperience?.length}
                                disabled
                              />
                            </div>
                            <div className="col-lg-4">
                              <TextField
                                id="outlined-number"
                                label="Total Services"
                                className="w-100"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                defaultValue={allService?.length}
                                disabled
                              />
                            </div>
                            <div className="col-lg-4">
                              <TextField
                                id="outlined-number"
                                label="Total Providers"
                                className="w-100"
                                type="number"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                defaultValue={allProvider?.length}
                                disabled
                              />
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
        count={Math.ceil(allVendors?.length / 20)}
        page={vendorPage}
        onChange={handleChangeVendorPage}
      />
    </div>
  );
};

export default Vendor;
