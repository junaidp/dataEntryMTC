import React from "react";
import {
  setupGetAllOptions,
  resetOptionAddSuccess,
  resetOptions,
} from "../../global-redux/reducers/options/slice";
import { useDispatch, useSelector } from "react-redux";
import { setupGetAllExperienceWithOutParams } from "../../global-redux/reducers/experiences/slice";
import { CircularProgress, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Form from "./components/Form.jsx";
import Pagination from "@mui/material/Pagination";
import AddOptionDialog from "./components/AddOptionDialog.jsx";
import DeleteOptionDialog from "./components/DeleteOptionDialog.jsx";
import EditOptionDialog from "./components/edit-option/EditOptionDialog.jsx";

const Options = ({ setShowAddOptionDialog, showAddOptionDialog }) => {
  const dispatch = useDispatch();
  const { allExperience, loading: experienceLoading } = useSelector(
    (state) => state?.experiences
  );
  const [showEditOptionDialog, setShowEditOptionDialog] = React.useState(false);
  const [showDeleteOptionDialog, setShowDeleteOptionDialog] =
    React.useState(false);
  const [currentOptionId, setCurrentOptionId] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState({});
  const { loading, allOptions, optionAddSuccess } = useSelector(
    (state) => state?.options
  );
  const [experienceId, setExperienceId] = React.useState("");
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };

  React.useEffect(() => {
    if (experienceId && experienceId !== "") {
      dispatch(setupGetAllOptions(`?experienceId=${experienceId}`));
    }
  }, [experienceId]);
  React.useEffect(() => {
    if (optionAddSuccess) {
      setSelectedOption({});
      setCurrentOptionId("");
      dispatch(resetOptionAddSuccess());
    }
    if (experienceId && experienceId !== "") {
      dispatch(setupGetAllOptions(`?experienceId=${experienceId}`));
    }
  }, [optionAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    return () => {
      dispatch(resetOptions());
    };
  }, []);

  return (
    <div>
      {showAddOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddOptionDialog setShowAddOptionDialog={setShowAddOptionDialog} />
          </div>
        </div>
      )}
      {showEditOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <EditOptionDialog
              setShowEditOptionDialog={setShowEditOptionDialog}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      )}
      {showDeleteOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <DeleteOptionDialog
              setShowDeleteOptionDialog={setShowDeleteOptionDialog}
              currentOptionId={currentOptionId}
            />
          </div>
        </div>
      )}
      {experienceLoading ? (
        <CircularProgress />
      ) : (
        allExperience?.length !== 0 && (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Experience
            </InputLabel>
            <Select
              id="regionsCovered"
              name="regionsCovered"
              className="form-control w-100 "
              label="Regions Covered"
              value={experienceId}
              onChange={(event) => setExperienceId(event?.target?.value)}
            >
              <MenuItem value="">Select Experience</MenuItem>
              {allExperience?.map((experience, index) => {
                return (
                  <MenuItem value={experience?.id} key={index}>
                    {experience?.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )
      )}
      {loading ? (
        <div className="mt-4">
          <CircularProgress />
        </div>
      ) : allOptions?.length === 0 || allOptions[0]?.error === "Not Found" ? (
        <p className="mt-4">
          Options Not Found. Please Select Experience Or Change Experience
        </p>
      ) : (
        <div className="mt-4">
          <div className="accordion" id="accordionFlushExample">
            {allOptions
              ?.slice((page - 1) * 10, page * 10)
              ?.map((option, index) => {
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
                        onClick={() => setCurrentOptionId(option?.id)}
                      >
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        {option?.title ? option?.title : "No Title Provided"}
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
                                setSelectedOption(option);
                                setShowEditOptionDialog(true);
                              }}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Edit
                            </div>
                            <div
                              className={`btn btn-labeled btn-danger mx-4 px-3 shadow  my-4 `}
                              onClick={() => setShowDeleteOptionDialog(true)}
                            >
                              <span className="btn-label me-2">
                                <i className="fa fa-check-circle f-18"></i>
                              </span>
                              Delete
                            </div>
                          </div>
                          <Form option={option} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <Pagination
            count={Math.ceil(allOptions?.length / 10)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      )}
    </div>
  );
};

export default Options;
