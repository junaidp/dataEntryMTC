import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const SocialLinks = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  childrenExtraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h5>Social Media Links:</h5>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(data?.id, "socialMediaLinks", "link", event)
            }
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
              onClick={() => handleAdd(data?.id, "socialMediaLinks", "link")}
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
                  onDelete={() =>
                    handleDelete(data?.id, "socialMediaLinks", link?.id)
                  }
                />
              );
            })
          )}
        </Card>
      </div>
    </div>
  );
};

export default SocialLinks;
