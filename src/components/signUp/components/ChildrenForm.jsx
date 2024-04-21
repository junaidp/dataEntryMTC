import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Children = ({
  data,
  childrenExtraData,
  setChildrenData,
  setChildrenExtraData,
}) => {
  function handleChangeText(id, event) {
    if (id) {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                [event?.target?.name]: event?.target?.value,
              }
            : item
        )
      );
    }
  }

  function handleChangeExtraDataText(family, event) {
    setChildrenExtraData((pre) => {
      return {
        ...pre,
        [family]: event?.target?.value,
      };
    });
  }

  // For the Interest
  function handleAddInterest(id, event) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData?.interest === "") {
      toast.error("Provide Interest", {
        toastId: "interest",
      });
    } else {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                mainInterests: [
                  ...item?.mainInterests,
                  {
                    id: uuidv4(),
                    string: childrenExtraData?.interest,
                  },
                ],
              }
            : item
        )
      );

      setChildrenExtraData((pre) => {
        return {
          ...pre,
          interest: "",
        };
      });
    }
  }

  function handleDeleteInterest(mainId, id) {
    setChildrenData((pre) =>
      pre?.map((item) =>
        item?.id === mainId
          ? {
              ...item,
              mainInterests: item?.mainInterests?.filter(
                (chip) => chip?.id !== id
              ),
            }
          : item
      )
    );
  }
  // For the Link
  function handleAddLink(id, event) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData?.link === "") {
      toast.error("Provide Link", {
        toastId: "link",
      });
    } else {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                socialMediaLinks: [
                  ...item?.socialMediaLinks,
                  {
                    id: uuidv4(),
                    string: childrenExtraData?.link,
                  },
                ],
              }
            : item
        )
      );

      setChildrenExtraData((pre) => {
        return {
          ...pre,
          link: "",
        };
      });
    }
  }

  function handleDeleteLink(mainId, id) {
    setChildrenData((pre) =>
      pre?.map((item) =>
        item?.id === mainId
          ? {
              ...item,
              socialMediaLinks: item?.socialMediaLinks?.filter(
                (chip) => chip?.id !== id
              ),
            }
          : item
      )
    );
  }
  // For the Program
  function handleAddProgram(id, event) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData?.program === "") {
      toast.error("Provide Program", {
        toastId: "program",
      });
    } else {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                loyaltyPrograms: [
                  ...item?.loyaltyPrograms,
                  {
                    id: uuidv4(),
                    string: childrenExtraData?.program,
                  },
                ],
              }
            : item
        )
      );

      setChildrenExtraData((pre) => {
        return {
          ...pre,
          program: "",
        };
      });
    }
  }

  function handleDeleteProgram(mainId, id) {
    setChildrenData((pre) =>
      pre?.map((item) =>
        item?.id === mainId
          ? {
              ...item,
              loyaltyPrograms: item?.loyaltyPrograms?.filter(
                (chip) => chip?.id !== id
              ),
            }
          : item
      )
    );
  }
  // For the Doc
  function handleAddDoc(id, event) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData?.doc === "") {
      toast.error("Provide Document", {
        toastId: "doc",
      });
    } else {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                travelDocuments: [
                  ...item?.travelDocuments,
                  {
                    id: uuidv4(),
                    string: childrenExtraData?.doc,
                  },
                ],
              }
            : item
        )
      );

      setChildrenExtraData((pre) => {
        return {
          ...pre,
          doc: "",
        };
      });
    }
  }

  function handleDeleteDoc(mainId, id) {
    setChildrenData((pre) =>
      pre?.map((item) =>
        item?.id === mainId
          ? {
              ...item,
              travelDocuments: item?.travelDocuments?.filter(
                (chip) => chip?.id !== id
              ),
            }
          : item
      )
    );
  }

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            className="form-control"
            value={data?.firstName}
            onChange={(event) => handleChangeText(data?.id, event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            className="form-control"
            value={data?.lastName}
            onChange={(event) => handleChangeText(data?.id, event)}
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
            value={data?.email}
            onChange={(event) => handleChangeText(data?.id, event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            className="form-control"
            value={data?.phoneNumber}
            onChange={(event) => handleChangeText(data?.id, event)}
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
            value={data?.nationality}
            onChange={(event) => handleChangeText(data?.id, event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.cityOfResidence}
            onChange={(event) => handleChangeText(data?.id, event)}
          />
        </div>

        <div className="col-lg-6 mb-2">
          <TextField
            id="age"
            name="age"
            label="Age"
            variant="outlined"
            className="form-control"
            type="number"
            value={data?.age}
            onChange={(event) => handleChangeText(data?.id, event)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12 mb-2">
          <label className="col-lg-12 mb-2 ">Date Of Birth</label>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            variant="outlined"
            className="form-control"
            type="date"
            value={data?.dateOfBirth}
            onChange={(event) => handleChangeText(data?.id, event)}
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
                onSubmit={(event) => handleAddInterest(data?.id, event)}
              >
                <label className="w-100">Add Main Interest:</label>
                <TextField
                  className="form-control"
                  name="interest"
                  id="interest"
                  value={childrenExtraData?.interest}
                  onChange={(event) =>
                    handleChangeExtraDataText("interest", event)
                  }
                />
              </form>

              <div
                className={`col-lg-2 text-end float-end align-self-end mb-4`}
              >
                <button
                  className="btn btn-labeled btn-primary w-100 shadow"
                  type="submit"
                  onClick={() => handleAddInterest(data?.id)}
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
            {data?.mainInterests?.length === 0 ? (
              <p className="mx-2 mt-3 text-sm">No Available Interests Found!</p>
            ) : (
              data?.mainInterests?.map((interest, index) => {
                return (
                  <Chip
                    label={interest?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() =>
                      handleDeleteInterest(data?.id, interest?.id)
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
              onSubmit={(event) => handleAddLink(data?.id, event)}
            >
              <label className="w-100">Media Link:</label>
              <TextField
                className="form-control w-100s"
                name="link"
                id="link"
                value={childrenExtraData?.link}
                onChange={(event) => handleChangeExtraDataText("link", event)}
              />
            </form>

            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddLink(data?.id)}
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
            {data?.socialMediaLinks?.length === 0 ? (
              <p className="mx-2 mt-3 text-sm">
                No Available Social Media Links Found!
              </p>
            ) : (
              data?.socialMediaLinks?.map((link, index) => {
                return (
                  <Chip
                    label={link?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteLink(data?.id, link?.id)}
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
              onSubmit={(event) => handleAddProgram(data?.id, event)}
            >
              <label className="w-100">Loyalty Program:</label>
              <TextField
                className="form-control"
                name="program"
                id="program"
                value={childrenExtraData?.program}
                onChange={(event) =>
                  handleChangeExtraDataText("program", event)
                }
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddProgram(data?.id)}
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
            {data?.loyaltyPrograms?.length === 0 ? (
              <p className="mx-2 mt-3 text-sm">
                No Available Loyalty Programs Found!
              </p>
            ) : (
              data?.loyaltyPrograms?.map((program, index) => {
                return (
                  <Chip
                    label={program?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteProgram(data?.id, program?.id)}
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
              onSubmit={(event) => handleAddDoc(data?.id, event)}
            >
              <label className="w-100">Travel Document:</label>
              <TextField
                className="form-control"
                name="doc"
                id="doc"
                value={childrenExtraData?.doc}
                onChange={(event) => handleChangeExtraDataText("doc", event)}
              />
            </form>
            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAddDoc(data?.id)}
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
            {data?.travelDocuments?.length === 0 ? (
              <p className="mx-2 mt-3 text-sm">
                No Available Travel Documents Found!
              </p>
            ) : (
              data?.travelDocuments?.map((doc, index) => {
                return (
                  <Chip
                    label={doc?.string}
                    key={index}
                    variant="outlined"
                    className="mx-2 mb-2"
                    onDelete={() => handleDeleteDoc(data?.id, doc?.id)}
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
