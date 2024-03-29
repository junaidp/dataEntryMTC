import React from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { changeSelectedService } from "../../../../global-redux/reducers/services/slice";
import { setupDeleteService } from "../../../../global-redux/reducers/services/slice";

const serviceRecord = ({
  setShowAddServiceDialog,
  setShowViewSelectedService,
}) => {
  const dispatch = useDispatch();
  const { allService, loading } = useSelector((state) => state.services);
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
