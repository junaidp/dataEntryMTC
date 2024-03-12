import React from "react";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../common/RichText";
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
}) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Add Experience</h2>
        <div>
          <div className="col-lg-8 mb-4">
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
            <div className="col-lg-6 mb-4">
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
            <div className="col-lg-6 mb-4">
              <TextField
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                type="number"
                className="form-control"
                {...formik.getFieldProps("price")}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="duration"
                name="duration"
                label="duration"
                variant="outlined"
                type="number"
                className="form-control"
                {...formik.getFieldProps("duration")}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <TextField
                id="availableTime"
                name="availableTime"
                label="availableTime"
                variant="outlined"
                type="number"
                className="form-control"
                {...formik.getFieldProps("availableTime")}
                error={
                  formik.touched.availableTime &&
                  Boolean(formik.errors.availableTime)
                }
                helperText={
                  formik.touched.availableTime && formik.errors.availableTime
                }
              />
            </div>
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
        <hr />
        <div className="mb-4">
          <h5>Keywords:</h5>
          <div className="row p-0">
            <div className="col-lg-6 mb-4">
              <label className="w-100">Add Keyword:</label>
              <TextField
                className="form-control"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
            <div className={`col-lg-6 text-end float-end align-self-end mb-4`}>
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
        <div>
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
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
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
                  onDelete={() => handleDeleteLinkWithOtherExperience(key?.id)}
                />
              );
            })}
          </Card>
        </div>
        <hr />
        <div>
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
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
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
