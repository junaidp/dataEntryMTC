import React from "react";
import Pagination from "@mui/material/Pagination";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setupGetAllServiceWithOutParama,
  resetServiceAddSuccess,
} from "../../global-redux/reducers/services/slice";
import AddServiceDialog from "./components/AddServiceDialog";
import { setupGetAllVendors } from "../../global-redux/reducers/vendor/slice";
import DeleteVendorDialog from "./components/DeleteServiceDialog";
import { useSelector } from "react-redux";
import Form from "./components/Form";
import EditServiceDialog from "./components/EditServiceDialog";
import { setupGetAllProviderWithOutParams } from "../../global-redux/reducers/providers/slice";

const Services = ({ showAddServiceDialog, setShowAddServiceDialog }) => {
  const dispatch = useDispatch();
  const { allService, serviceAddSuccess, loading } = useSelector(
    (state) => state.services
  );
  const [currentServiceId, setCurrentServiceId] = React.useState("");
  const [showDeleteServiceDialog, setShowDeleteServiceDialog] =
    React.useState(false);
  const [selectedService, setSelectedService] = React.useState({});
  const [showEditServiceDialog, setShowEditServiceDialog] =
    React.useState(false);
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (serviceAddSuccess) {
      setCurrentServiceId("");
      dispatch(setupGetAllServiceWithOutParama());
      dispatch(setupGetAllProviderWithOutParams());
      dispatch(setupGetAllVendors());
      dispatch(resetServiceAddSuccess());
    }
  }, [serviceAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllServiceWithOutParama());
    dispatch(setupGetAllVendors());
    dispatch(setupGetAllProviderWithOutParams());
  }, []);

  return (
    <div>
      {showAddServiceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddServiceDialog
              setShowAddServiceDialog={setShowAddServiceDialog}
            />
          </div>
        </div>
      )}
      {showDeleteServiceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteVendorDialog
              setShowDeleteServiceDialog={setShowDeleteServiceDialog}
              currentServiceId={currentServiceId}
            />
          </div>
        </div>
      )}
      {showEditServiceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditServiceDialog
              setShowEditServiceDialog={setShowEditServiceDialog}
              selectedService={selectedService}
            />
          </div>
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : allService?.length === 0 || allService[0]?.error === "Not Found" ? (
        "Services Not Found"
      ) : (
        <div className="accordion" id="accordionFlushExample">
          {allService
            ?.slice((page - 1) * 10, page * 10)
            ?.map((service, index) => {
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
                      onClick={() => setCurrentServiceId(service?.id)}
                    >
                      <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                      {service?.title ? service?.title : "No Title Provided"}
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
                            onClick={() => {
                              setSelectedService(service);
                              setShowEditServiceDialog(true);
                            }}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Edit
                          </div>
                          <div
                            className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                            onClick={() => setShowDeleteServiceDialog(true)}
                          >
                            <span className="btn-label me-2">
                              <i className="fa fa-check-circle f-18"></i>
                            </span>
                            Delete
                          </div>
                        </div>
                        <Form service={service} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
      <Pagination
        count={Math.ceil(allService?.length / 10)}
        page={page}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default Services;
