import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const Children = ({
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
      <h1 className="heading mb-4">Children</h1>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            className="form-control"
            value={data?.children?.firstName}
            onChange={(event) => handleChangeText("children", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            className="form-control"
            value={data?.children?.lastName}
            onChange={(event) => handleChangeText("children", event)}
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
            value={data?.children?.date}
            onChange={(event) => handleChangeText("children", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.children?.cityOfResidence}
            onChange={(event) => handleChangeText("children", event)}
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
            value={data?.children?.email}
            onChange={(event) => handleChangeText("children", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className="form-control"
            value={data?.children?.phoneNumber}
            onChange={(event) => handleChangeText("children", event)}
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
            value={data?.children?.nationality}
            onChange={(event) => handleChangeText("children", event)}
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
                onSubmit={(event) => handleAddInterest("children", event)}
              >
                <label className="w-100">Add Main Interest:</label>
                <TextField
                  className="form-control"
                  name="interest"
                  id="interest"
                  value={extraData?.children?.interest}
                  onChange={(event) =>
                    handleChangeExtraDataText("children", event)
                  }
                />
              </form>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                  onClick={() => handleAddInterest("children")}
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
            {data?.children?.mainInterests?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Interests Found!</p>
            ) : (
              data?.children?.mainInterests?.map((interest, index) => {
                return (
                  <Chip
                    label={interest?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() =>
                      handleDeleteInterest("children", interest?.id)
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
              onSubmit={(event) => handleAddLink("children", event)}
            >
              <label className="w-100">Media Link:</label>
              <TextField
                className="form-control w-100s"
                name="link"
                id="link"
                value={extraData?.children?.link}
                onChange={(event) =>
                  handleChangeExtraDataText("children", event)
                }
              />
            </form>

            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddLink("children")}
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
            {data?.children?.socialMediaLinks?.length === 0 ? (
              <p className="mx-2 mt-3">
                No Available Social Media Links Found!
              </p>
            ) : (
              data?.children?.socialMediaLinks?.map((link, index) => {
                return (
                  <Chip
                    label={link?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteLink("children", link?.id)}
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
              onSubmit={(event) => handleAddProgram("children", event)}
            >
              <label className="w-100">Loyalty Program:</label>
              <TextField
                className="form-control"
                name="program"
                id="program"
                value={extraData?.children?.program}
                onChange={(event) =>
                  handleChangeExtraDataText("children", event)
                }
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddProgram("children")}
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
            {data?.children?.loyaltyPrograms?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Loyalty Programs Found!</p>
            ) : (
              data?.children?.loyaltyPrograms?.map((program, index) => {
                return (
                  <Chip
                    label={program?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() =>
                      handleDeleteProgram("children", program?.id)
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
          <h5>Travel Documents:</h5>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) => handleAddDoc("children", event)}
            >
              <label className="w-100">Travel Document:</label>
              <TextField
                className="form-control"
                name="doc"
                id="doc"
                value={extraData?.children?.doc}
                onChange={(event) =>
                  handleChangeExtraDataText("children", event)
                }
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddDoc("children")}
              >
                <span className="btn-label me-2">
                  <i className="fa fa-plus"></i>
                </span>
                Add Document
              </button>
            </div>
          </div>
          <label className="mb-2">List Of Available Travel Documents:</label>
          <Card className="py-2 mb-4">
            {data?.children?.travelDocuments?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Travel Documents Found!</p>
            ) : (
              data?.children?.travelDocuments?.map((doc, index) => {
                return (
                  <Chip
                    label={doc?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteDoc("children", doc?.id)}
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

export default Children;
