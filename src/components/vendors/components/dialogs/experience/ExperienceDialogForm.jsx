import React from "react";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../../../common/RichText";
import Chip from "@mui/material/Chip";
import { Card } from "@mui/material";

const ExperienceDialogForm = ({
  formik,
  keyword,
  setKeyword,
  handleAddKeyword,
  handleDeleteKeyword,
  experienceName,
  setExperienceName,
  why,
  setWhy,
  handleAddLinkWithOtherExperience,
  handleClose,
  loading,
  handleChangeDescription,
  handleChangeTermsAndConditions,
  keywords,
  linksWithOtherExperinces,
  handleDeleteLinkWithOtherExperience,
  link,
  setLink,
  linkExplanation,
  setLinkExplanation,
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
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Add Experience</h2>
        <div>
          <div className="col-lg-12 mb-4">
            <TextField
              id="title"
              name="title"
              label="Experience title"
              variant="outlined"
              className="form-control"
              {...formik.getFieldProps("title")}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </div>

          <div className="row">
            <div className="col-lg-12 mb-4">
              <TextField
                id="address"
                name="address"
                label="Experience address"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </div>
          </div>

          <div className="row mt-4">
            <hr />
            <div>
              <h5>Price:</h5>
              <div className="row p-0">
                <div className="col-lg-10 mb-4">
                  <label className="w-100">Add Price:</label>
                  <TextField
                    className="form-control"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                </div>

                <div
                  className={`col-lg-2 text-end float-end align-self-end mb-4`}
                >
                  <div
                    className="btn btn-labeled btn-primary px-3 shadow"
                    onClick={handleAddPrice}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Price
                  </div>
                </div>
              </div>
              <label className="mb-2">List Of Prices:</label>
              <Card className="py-4">
                {prices.map((key, index) => {
                  return (
                    <Chip
                      label={key?.price}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                      onDelete={() => handleDeletePrice(key?.id)}
                    />
                  );
                })}
              </Card>
            </div>
          </div>
          <div className="row mt-4">
            <hr />
            <div>
              <h5>Duration:</h5>
              <div className="row p-0">
                <div className="col-lg-10 mb-4">
                  <label className="w-100">Add Duration:</label>
                  <TextField
                    className="form-control"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                  />
                </div>

                <div
                  className={`col-lg-2 text-end float-end align-self-end mb-4`}
                >
                  <div
                    className="btn btn-labeled btn-primary px-3 shadow"
                    onClick={handleAddDuration}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Duration
                  </div>
                </div>
              </div>
              <label className="mb-2">List Of Durations:</label>
              <Card className="py-4">
                {durations.map((key, index) => {
                  return (
                    <Chip
                      label={key?.duration}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                      onDelete={() => handleDeleteDuration(key?.id)}
                    />
                  );
                })}
              </Card>
            </div>
          </div>
          <div className="row mt-4">
            <hr />
            <div>
              <h5>Available Time:</h5>
              <div className="row p-0">
                <div className="col-lg-10 mb-4">
                  <label className="w-100">Add Available Time:</label>
                  <TextField
                    className="form-control"
                    value={availableTime}
                    onChange={(event) => setAvailableTime(event.target.value)}
                  />
                </div>

                <div
                  className={`col-lg-2 text-end float-end align-self-end mb-4`}
                >
                  <div
                    className="btn btn-labeled btn-primary px-3 shadow"
                    onClick={handleAddAvailableTime}
                  >
                    <span className="btn-label me-2">
                      <i className="fa fa-plus"></i>
                    </span>
                    Add Available Time
                  </div>
                </div>
              </div>
              <label className="mb-2">List Of Available Times:</label>
              <Card className="py-4">
                {avialableTimes.map((key, index) => {
                  return (
                    <Chip
                      label={key?.time}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                      onDelete={() => handleDeleteAvailableTime(key?.id)}
                    />
                  );
                })}
              </Card>
            </div>
          </div>
          <hr />
          <div className="mb-4">
            <h5>Keywords:</h5>
            <div className="row p-0">
              <div className="col-lg-10 mb-4">
                <label className="w-100">Add Keyword:</label>
                <TextField
                  className="form-control"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
              </div>
              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <div
                  className="btn btn-labeled btn-primary px-3 shadow"
                  onClick={handleAddKeyword}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Keyword
                </div>
              </div>
            </div>
            <label className="mb-2">List Of Keywords:</label>
            <Card className="py-4">
              {keywords.map((key, index) => {
                return (
                  <Chip
                    label={key?.name}
                    key={index}
                    variant="outlined"
                    className="mx-2"
                    onDelete={() => handleDeleteKeyword(key?.id)}
                  />
                );
              })}
            </Card>
          </div>
          <hr />
          <div className="mb-4">
            <h5>Link With Other Experiences:</h5>
            <div className="row p-0">
              <div className="col-lg-5 mb-4">
                <label className="w-100">Add Experience Name:</label>
                <TextField
                  className="form-control"
                  value={experienceName}
                  onChange={(event) => setExperienceName(event.target.value)}
                />
              </div>
              <div className="col-lg-5 mb-4">
                <label className="w-100">Add Reason:</label>
                <TextField
                  className="form-control"
                  value={why}
                  onChange={(event) => setWhy(event.target.value)}
                />
              </div>
              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <div
                  className="btn btn-labeled btn-primary px-3 shadow"
                  onClick={handleAddLinkWithOtherExperience}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Link With Other Experience
                </div>
              </div>
            </div>
            <label className="mb-2">List Of Link With Other Experiences:</label>
            <Card className="py-4">
              {linksWithOtherExperinces.map((key, index) => {
                return (
                  <Chip
                    label={key?.experienceName}
                    key={index}
                    variant="outlined"
                    className="mx-2"
                    onDelete={() =>
                      handleDeleteLinkWithOtherExperience(key?.id)
                    }
                  />
                );
              })}
            </Card>
          </div>
          <hr />
          <div className="mb-4">
            <h5>Links:</h5>
            <div className="row p-0">
              <div className="col-lg-5 mb-4">
                <label className="w-100">Add Link:</label>
                <TextField
                  className="form-control"
                  value={link}
                  onChange={(event) => setLink(event.target.value)}
                />
              </div>
              <div className="col-lg-5 mb-4">
                <label className="w-100">Add Link Explanation:</label>
                <TextField
                  className="form-control"
                  value={linkExplanation}
                  onChange={(event) => setLinkExplanation(event.target.value)}
                />
              </div>
              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <div
                  className="btn btn-labeled btn-primary px-3 shadow"
                  onClick={handleAddLink}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Link
                </div>
              </div>
            </div>
            <label className="mb-2">List Of Links:</label>
            <Card className="py-4">
              {links.map((key, index) => {
                return (
                  <Chip
                    label={key?.link}
                    key={index}
                    variant="outlined"
                    className="mx-2"
                    onDelete={() => handleDeleteLink(key?.id)}
                  />
                );
              })}
            </Card>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <RichTextEditor
                placeholder="Description"
                initialValue={formik.values.description}
                handleChangeDescription={handleChangeDescription}
                readonly={false}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <RichTextEditor
                placeholder="Terms And Conditions"
                initialValue={formik.values.termsAndConditions}
                handleChangeTermsAndConditions={handleChangeTermsAndConditions}
                readonly={false}
              />
              {formik.touched.termsAndConditions &&
                formik.errors.termsAndConditions && (
                  <div className="error">
                    {formik.errors.termsAndConditions}
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-lg-6 text-end">
            <button
              type="submit"
              className={`btn btn-primary float-start ${
                loading && "disabled"
              } `}
            >
              {loading ? "Loading..." : "Add"}
            </button>
          </div>
          <div className="col-lg-6 text-end">
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

export default ExperienceDialogForm;
