import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const SocialLinks = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  extraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                "principalCustomer",
                "socialMediaLinks",
                "link",
                event,
                data?.id
              )
            }
          >
            <TextField
              className="form-control w-100s"
              name="link"
              id="link"
              label="Social Media Link"
              variant="outlined"
              value={extraData?.principalCustomer?.link}
              onChange={(event) =>
                handleChangeExtraDataText("principalCustomer", event, data?.id)
              }
            />
          </form>

          <div className={`col-lg-2 text-end float-end align-self-end mb-4 mt-4`}>
            <button
              className="btn btn-labeled btn-primary w-100 shadow"
              type="submit"
              onClick={(event) =>
                handleAdd(
                  "principalCustomer",
                  "socialMediaLinks",
                  "link",
                  event,
                  data?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Media Link
            </button>
          </div>
        </div>
        {data?.principalCustomer?.socialMediaLinks?.length !== 0 && (
          <Card className="py-2">
            {data?.principalCustomer?.socialMediaLinks?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "socialMediaLinks",
                      link?.id,
                      data?.id
                    )
                  }
                />
              );
            })}
          </Card>
        )}
      </div>
    </div>
  );
};

export default SocialLinks;
