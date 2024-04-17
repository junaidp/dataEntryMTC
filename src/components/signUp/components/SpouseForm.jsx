import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const Spouse = ({
  data,
  handleChangeText,
  extraData,
  handleChangeExtraDataText,
  handleAddInterest,
  handleDeleteInterest,
  handleAddLink,
  handleDeleteLink,
  handleAddProgram,
  handleDeleteProgram,
  handleAddDoc,
  handleDeleteDoc,
}) => {
  return (
    <div>
      <h1 className="heading mb-4">Spouse</h1>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.firstName}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.lastName}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 mb-2">
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            variant="outlined"
            className="form-control"
            type="date"
            value={data?.spouse?.date}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.cityOfResidence}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 mb-2">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.email}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.phoneNumber}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12 mb-2">
          <TextField
            id="nationality"
            name="nationality"
            label="Nationality"
            variant="outlined"
            className="form-control"
            value={data?.spouse?.nationality}
            onChange={(event) => handleChangeText("spouse", event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div>
          <h5>Main Interests:</h5>
          <div>
            <div className="row p-0">
              <form
                className="col-lg-10 mb-2"
                onSubmit={(event) => handleAddInterest("spouse", event)}
              >
                <label className="w-100">Add Main Interest:</label>
                <TextField
                  className="form-control"
                  name="interest"
                  id="interest"
                  value={extraData?.spouse?.interest}
                  onChange={(event) =>
                    handleChangeExtraDataText("spouse", event)
                  }
                />
              </form>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                  onClick={() => handleAddInterest("spouse")}
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Interest
                </button>
              </div>
            </div>
          </div>
          <label className="mb-2">List Of Available Interests:</label>
          <Card className="py-2">
            {data?.spouse?.mainInterests?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Interests Found!</p>
            ) : (
              data?.spouse?.mainInterests?.map((interest, index) => {
                return (
                  <Chip
                    label={interest?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() =>
                      handleDeleteInterest("spouse", interest?.id)
                    }
                  />
                );
              })
            )}
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div>
          <h5>Social Media Links:</h5>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) => handleAddLink("spouse", event)}
            >
              <label className="w-100">Media Link:</label>
              <TextField
                className="form-control w-100s"
                name="link"
                id="link"
                value={extraData?.spouse?.link}
                onChange={(event) => handleChangeExtraDataText("spouse", event)}
              />
            </form>

            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddLink("spouse")}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus"></i>
                </span>
                Add Media Link
              </button>
            </div>
          </div>
          <label className="mb-2">List Of Available Media Links:</label>
          <Card className="py-2">
            {data?.spouse?.socialMediaLinks?.length === 0 ? (
              <p className="mx-2 mt-3">
                No Available Social Media Links Found!
              </p>
            ) : (
              data?.spouse?.socialMediaLinks?.map((link, index) => {
                return (
                  <Chip
                    label={link?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteLink("spouse", link?.id)}
                  />
                );
              })
            )}
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div>
          <h5>Loyalty Programs:</h5>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) => handleAddProgram("spouse", event)}
            >
              <label className="w-100">Loyalty Program:</label>
              <TextField
                className="form-control"
                name="program"
                id="program"
                value={extraData?.spouse?.program}
                onChange={(event) => handleChangeExtraDataText("spouse", event)}
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddProgram("spouse")}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus"></i>
                </span>
                Add Program
              </button>
            </div>
          </div>
          <label className="mb-2">List Of Available Loyalty Programs:</label>
          <Card className="py-2">
            {data?.spouse?.loyaltyPrograms?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Loyalty Programs Found!</p>
            ) : (
              data?.spouse?.loyaltyPrograms?.map((program, index) => {
                return (
                  <Chip
                    label={program?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteProgram("spouse", program?.id)}
                  />
                );
              })
            )}
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div>
          <h5>Travel Documents:</h5>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) => handleAddDoc("spouse", event)}
            >
              <label className="w-100">Travel Document:</label>
              <TextField
                className="form-control"
                name="doc"
                id="doc"
                value={extraData?.spouse?.doc}
                onChange={(event) => handleChangeExtraDataText("spouse", event)}
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddDoc("spouse")}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus"></i>
                </span>
                Add Document
              </button>
            </div>
          </div>
          <label className="mb-2">List Of Available Travel Documents:</label>
          <Card className="py-2">
            {data?.spouse?.travelDocuments?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Travel Documents Found!</p>
            ) : (
              data?.spouse?.travelDocuments?.map((doc, index) => {
                return (
                  <Chip
                    label={doc?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteDoc("spouse", doc?.id)}
                  />
                );
              })
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Spouse;
