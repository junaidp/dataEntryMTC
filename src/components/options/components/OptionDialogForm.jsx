import React from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RichTextEditor from "../../../components/common/RichText";

const ServiceDialogForm = ({
  formik,
  handleClose,
  loading,
  link,
  setLink,
  links,
  handleAddLink,
  handleDeleteLink,
  price,
  setPrice,
  handleAddPrice,
  handleDeletePrice,
  prices,
  duration,
  setDuration,
  handleAddDuration,
  handleDeleteDuration,
  durations,
  availableTime,
  setAvailableTime,
  avialableTimes,
  handleAddAvailableTime,
  handleDeleteAvailableTime,
  priceRef,
  durationRef,
  availableTimeRef,
  linkRef,
  allExperience,
  allProvider,
  handleChangeDescription,
  handleChangeTermsAndConditions,
  handleAddKeyword,
  handleDeleteKeyword,
  keywordRef,
  keyword,
  keywords,
  setKeyword,
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Add Option</h2>
        <div>
          <div className="row">
            <div className="col-lg-12 mb-4">
              <TextField
                id="title"
                name="title"
                label="Option title"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("title")}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <label>Description:</label>
              <RichTextEditor
                initialValue={formik.values.description}
                handleChangeDescription={handleChangeDescription}
                readonly={false}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-4">
              <TextField
                id="xpAddress"
                name="xpAddress"
                label="Address"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("xpAddress")}
                error={
                  formik.touched.xpAddress && Boolean(formik.errors.xpAddress)
                }
                helperText={formik.touched.xpAddress && formik.errors.xpAddress}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Experience
                </InputLabel>
                <Select
                  id="experienceId"
                  name="experienceId"
                  className="form-control w-100 "
                  label="Select Experince"
                  defaultValue=""
                  {...formik.getFieldProps("experienceId")}
                >
                  <MenuItem value="">Select Experience</MenuItem>
                  {allExperience?.map((item, index) => {
                    return (
                      <MenuItem value={item?.id} key={index}>
                        {item?.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
             
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 mb-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Provider
                </InputLabel>
                <Select
                  id="providerId"
                  name="providerId"
                  className="form-control w-100 "
                  label="Select Provider"
                  {...formik.getFieldProps("providerId")}
                >
                  <MenuItem value="">Select Provider</MenuItem>
                  {allProvider?.map((item, index) => {
                    return (
                      <MenuItem value={item?.id} key={index}>
                        {item?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="row">
            <div>
              <h5>Price:</h5>
              <div>
                <form onSubmit={handleAddPrice} className="row p-0">
                  <div className="col-lg-10 mb-4">
                    <label className="w-100">Add Price:</label>
                    <TextField
                      className="form-control"
                      value={price}
                      onChange={(event) => setPrice(event.target.value)}
                      inputRef={priceRef}
                    />
                  </div>

                  <div
                    className={`col-lg-2 text-end float-end align-self-end mb-4`}
                  >
                    <button
                      className="btn btn-labeled btn-primary w-100 shadow"
                      onClick={handleAddPrice}
                      type="submit"
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add Price
                    </button>
                  </div>
                </form>
              </div>
              <label className="mb-2">List Of Prices:</label>
              <Card className="py-4">
                {prices?.length === 0 ? (
                  <lable className="mx-2">No Price Provided</lable>
                ) : (
                  prices.map((key, index) => {
                    return (
                      <Chip
                        label={key?.price}
                        key={index}
                        variant="outlined"
                        className="mx-2 mb-2"
                        onDelete={() => handleDeletePrice(key?.id)}
                      />
                    );
                  })
                )}
              </Card>
            </div>
          </div>
          <div className="row mt-4">
            <div>
              <h5>Duration:</h5>
              <div>
                <form onSubmit={handleAddDuration} className="row p-0">
                  <div className="col-lg-10 mb-4">
                    <label className="w-100">Add Duration:</label>
                    <TextField
                      className="form-control"
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                      inputRef={durationRef}
                    />
                  </div>

                  <div
                    className={`col-lg-2 text-end float-end align-self-end mb-4`}
                  >
                    <button
                      className="btn btn-labeled btn-primary w-100 shadow"
                      onClick={handleAddDuration}
                      type="submit"
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add Duration
                    </button>
                  </div>
                </form>
              </div>
              <label className="mb-2">List Of Durations:</label>
              <Card className="py-4">
                {durations?.length === 0 ? (
                  <lable className="mx-2">No Time Provided</lable>
                ) : (
                  durations.map((key, index) => {
                    return (
                      <Chip
                        label={key?.duration}
                        key={index}
                        variant="outlined"
                        className="mx-2 mb-2"
                        onDelete={() => handleDeleteDuration(key?.id)}
                      />
                    );
                  })
                )}
              </Card>
            </div>
          </div>
          <div className="row mt-4">
            <div>
              <h5>Available Time:</h5>
              <div>
                <form onSubmit={handleAddAvailableTime} className="row p-0">
                  <div className="col-lg-10 mb-4">
                    <label className="w-100">Add Available Time:</label>
                    <TextField
                      className="form-control"
                      value={availableTime}
                      onChange={(event) => setAvailableTime(event.target.value)}
                      inputRef={availableTimeRef}
                    />
                  </div>
                  <div
                    className={`col-lg-2 text-end float-end align-self-end mb-4`}
                  >
                    <button
                      className="btn btn-labeled btn-primary w-100 shadow"
                      onClick={handleAddAvailableTime}
                      type="submit"
                    >
                      <span className="btn-label me-2">
                        <i className="fa fa-plus"></i>
                      </span>
                      Add Time
                    </button>
                  </div>
                </form>
              </div>
              <label className="mb-2">List Of Available Times:</label>
              <Card className="py-4">
                {avialableTimes?.length === 0 ? (
                  <lable className="mx-2">No Time Provided</lable>
                ) : (
                  avialableTimes.map((key, index) => {
                    return (
                      <Chip
                        label={key?.time}
                        key={index}
                        variant="outlined"
                        className="mx-2 mb-2"
                        onDelete={() => handleDeleteAvailableTime(key?.id)}
                      />
                    );
                  })
                )}
              </Card>
            </div>
          </div>

          <div className="mt-4">
            <h5>Links:</h5>
            <div>
              <form onSubmit={handleAddLink} className="row p-0">
                <div className="col-lg-10 mb-4">
                  <label className="w-100">Add Link:</label>
                  <TextField
                    className="form-control"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    inputRef={linkRef}
                  />
                </div>
                <div
                  className={`col-lg-2 text-end float-end align-self-end mb-4`}
                >
                  <button
                    className="btn btn-labeled btn-primary w-100 shadow"
                    onClick={handleAddLink}
                    type="submit"
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Link
                  </button>
                </div>
              </form>
            </div>
            <label className="mb-2">List Of Links:</label>
            <Card className="py-4">
              {links?.length === 0 ? (
                <lable className="mx-2">No Link Provided</lable>
              ) : (
                links.map((key, index) => {
                  return (
                    <Chip
                      label={key?.link}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                      onDelete={() => handleDeleteLink(key?.id)}
                    />
                  );
                })
              )}
            </Card>
          </div>
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-12">
            <label>Terms & Condition:</label>
            <RichTextEditor
              initialValue={formik.values.termsAndConditions}
              handleChangeDescription={handleChangeTermsAndConditions}
              readonly={false}
            />
            {formik.touched.termsAndConditions &&
              formik.errors.termsAndConditions && (
                <div className="error">{formik.errors.termsAndConditions}</div>
              )}
          </div>
        </div>
        <div className="mb-4 mt-4">
          <h5>Keywords:</h5>
          <div>
            <form className="row p-0" onSubmit={handleAddKeyword}>
              <div className="col-lg-10 mb-4">
                <label className="w-100">Add Keyword:</label>
                <TextField
                  className="form-control"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  inputRef={keywordRef}
                />
              </div>
              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                  onClick={handleAddKeyword}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Keyword
                </button>
              </div>
            </form>
          </div>
          <label className="mb-2">List Of Keywords:</label>
          <Card className="py-4">
            {keywords?.length === 0 ? (
              <lable className="mx-2">No Keyword Provided</lable>
            ) : (
              keywords.map((key, index) => {
                return (
                  <Chip
                    label={key?.name}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteKeyword(key?.id)}
                  />
                );
              })
            )}
          </Card>
        </div>
        <div className="flex mb-2 flex-end mt-4">
          <div>
            <button
              type="submit"
              className={`btn btn-primary float-start ${
                loading && "disabled"
              } `}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ServiceDialogForm;
