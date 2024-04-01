import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  changeSelectedService,
  setupDeleteService,
  setupAddService,
} from "../../../../global-redux/reducers/services/slice";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

const serviceRecord = ({
  setShowAddServiceDialog,
  setShowViewSelectedService,
}) => {
  const dispatch = useDispatch();
  const [duplicateServiceCall, setDuplicateServiceCall] = React.useState(false);
  const { allService, loading, serviceAddSuccess } = useSelector(
    (state) => state.services
  );
  function handleDuplicateService(item) {
    if (item) {
      if (!loading) {
        dispatch(
          setupAddService([
            {
              title: item?.title,
              vendorId: item?.vendorId,
              providers: item?.providers || [],
              description: item?.description,
              address: item?.address,
              price: item?.price || [],
              duration: item?.duration || [],
              availableTime: item?.availableTime || [],
              links: item?.links || [],
              linkWithOtherService: item?.linkWithOtherService || [],
              linkWithOtherExperience: item?.linkWithOtherExperience || [],
              termsAndConditions: item?.termsAndConditions,
              storyLineKeywords: item?.storyLineKeywords || [],
            },
          ])
        );
        setDuplicateServiceCall(true);
      }
    }
  }

  React.useEffect(() => {
    if (serviceAddSuccess === true && duplicateServiceCall === true) {
      toast.success("Service Duplicated Successfully");
      setDuplicateServiceCall(false);
    }
  }, [serviceAddSuccess]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <div>
            <div className="row">
              <div
                className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4"
                onClick={() => setShowAddServiceDialog(true)}
              >
                <span className="btn-label me-4">
                  <i className="fa fa-plus"></i>
                </span>
                New Service
              </div>
              <div className="col-lg-10">
                <table className="table table-bordered  table-hover rounded mb-0">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>Service List</th>
                      {allService && allService?.length !== 0 && (
                        <th>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {allService?.length === 0 ? (
                      <tr>
                        <td className="per80">
                          <Button className="cursor-pointer">
                            No Service Found. Please Add One
                          </Button>
                        </td>
                      </tr>
                    ) : (
                      allService?.map((service, index) => {
                        return (
                          <tr key={index}>
                            <td className="per80">
                              <Button
                                className="cursor-pointer"
                                onClick={() => {
                                  dispatch(changeSelectedService(service));
                                  setShowViewSelectedService(true);
                                }}
                              >
                                {service?.title}
                              </Button>
                            </td>
                            <td>
                              <i
                                className="fa-eye fa f-18 cursor-pointer"
                                onClick={() => {
                                  dispatch(changeSelectedService(service));
                                  setShowViewSelectedService(true);
                                }}
                              ></i>
                              <i
                                className="fa fa-trash text-danger f-18 px-3 cursor-pointer"
                                onClick={() =>
                                  dispatch(
                                    setupDeleteService(
                                      `?serviceId=${service?.id}`
                                    )
                                  )
                                }
                              ></i>
                              <Tooltip title="Duplicate" placement="top">
                                <i
                                  className="bi bi-copy f-18 cursor-pointer"
                                  onClick={() =>
                                    handleDuplicateService(service)
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

export default serviceRecord;
