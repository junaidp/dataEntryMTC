import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const PrincipleCustomer = ({
  data,
  handleChangeText,
  extraData,
  handleChangeExtraDataText,
  handleAddInterest,
  handleDeleteInterest
}) => {
  return (
    <div>
      <h1 className="heading mb-4">Principal Customer</h1>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.firstName}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.lastName}
            onChange={(event) => handleChangeText("principalCustomer", event)}
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
            value={data?.principalCustomer?.date}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.cityOfResidence}
            onChange={(event) => handleChangeText("principalCustomer", event)}
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
            value={data?.principalCustomer?.email}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.phoneNumber}
            onChange={(event) => handleChangeText("principalCustomer", event)}
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
            value={data?.principalCustomer?.nationality}
            onChange={(event) => handleChangeText("principalCustomer", event)}
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
                onSubmit={(event) =>
                  handleAddInterest("principalCustomer", event)
                }
              >
                <label className="w-100">Add Main Interest:</label>
                <TextField
                  className="form-control"
                  name="interest"
                  id="interest"
                  value={extraData?.principalCustomer?.interest}
                  onChange={(event) =>
                    handleChangeExtraDataText("principalCustomer", event)
                  }
                />
              </form>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                  onClick={() => handleAddInterest("principalCustomer")}
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
            {data?.principalCustomer?.mainInterests?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Interests Found!</p>
            ) : (
              data?.principalCustomer?.mainInterests?.map((interest, index) => {
                return (
                  <Chip
                    label={interest?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() =>
                      handleDeleteInterest("principalCustomer", interest?.id)
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
          <div>
            <form className="row p-0">
              <div className="col-lg-10 mb-2">
                <label className="w-100">Media Link:</label>
                <TextField
                  className="form-control"
                  name="link"
                  id="link"
                  value={extraData?.PrincipleCustomer?.link}
                  onChange={(event) =>
                    handleChangeExtraDataText("principalCustomer", event)
                  }
                />
              </div>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Media Link
                </button>
              </div>
            </form>
          </div>
          <label className="mb-2">List Of Available Media Links:</label>
          <Card className="py-2">
            {data?.principalCustomer?.socialMediaLinks?.length === 0 ? (
              <p className="mx-2 mt-3">
                No Available Social Media Links Found!
              </p>
            ) : (
              data?.principalCustomer?.socialMediaLinks?.map((links, index) => {
                return (
                  <Chip
                    label={links}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => console.log("hshsh")}
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
          <div>
            <form className="row p-0">
              <div className="col-lg-10 mb-2">
                <label className="w-100">Loyalty Program:</label>
                <TextField
                  className="form-control"
                  name="program"
                  id="program"
                  value={extraData?.PrincipleCustomer?.program}
                  onChange={(event) =>
                    handleChangeExtraDataText("principalCustomer", event)
                  }
                />
              </div>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Program
                </button>
              </div>
            </form>
          </div>
          <label className="mb-2">List Of Available Loyalty Programs:</label>
          <Card className="py-2">
            {data?.principalCustomer?.loyaltyPrograms?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Loyalty Programs Found!</p>
            ) : (
              data?.principalCustomer?.loyaltyPrograms?.map(
                (programs, index) => {
                  return (
                    <Chip
                      label={programs}
                      key={index}
                      variant="outlined"
                      className="mx-2 mb-2"
                      onDelete={() => console.log("hshsh")}
                    />
                  );
                }
              )
            )}
          </Card>
        </div>
      </div>
      <div className="row mt-4">
        <div>
          <h5>Travel Documents:</h5>
          <div>
            <form className="row p-0">
              <div className="col-lg-10 mb-2">
                <label className="w-100">Travel Document:</label>
                <TextField
                  className="form-control"
                  name="doc"
                  id="doc"
                  value={extraData?.PrincipleCustomer?.doc}
                  onChange={(event) =>
                    handleChangeExtraDataText("principalCustomer", event)
                  }
                />
              </div>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                >
                  <span className="btn-label me-2">
                    <i className="fa fa-plus"></i>
                  </span>
                  Add Document
                </button>
              </div>
            </form>
          </div>
          <label className="mb-2">List Of Available Travel Documents:</label>
          <Card className="py-2">
            {data?.principalCustomer?.travelDocuments?.length === 0 ? (
              <p className="mx-2 mt-3">No Available Travel Documents Found!</p>
            ) : (
              data?.principalCustomer?.travelDocuments?.map((docs, index) => {
                return (
                  <Chip
                    label={docs}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => console.log("hshsh")}
                  />
                );
              })
            )}
          </Card>{" "}
        </div>
      </div>
    </div>
  );
};

export default PrincipleCustomer;
