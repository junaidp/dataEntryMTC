import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const SpecialRequirements = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  childrenExtraData,
  data,
  childrenData,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h6>Special Requirements:</h6>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                data?.id,
                "specialRequirements",
                "specialrequirement",
                event,
                childrenData?.id
              )
            }
          >
            <TextField
              className="form-control w-100s"
              name="specialrequirement"
              id="specialrequirement"
              value={childrenExtraData?.specialrequirement}
              onChange={(event) =>
                handleChangeExtraDataText(
                  "specialrequirement",
                  event,
                  childrenData?.id
                )
              }
            />
          </form>

          <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
            <button
              className="btn btn-labeled btn-primary w-100 shadow"
              type="submit"
              onClick={() =>
                handleAdd(
                  data?.id,
                  "specialRequirements",
                  "specialrequirement",
                  childrenData?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Requirement
            </button>
          </div>
        </div>
        {data?.specialRequirements?.length !== 0 && (
          <Card className="py-2">
            {data?.specialRequirements?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      data?.id,
                      "specialRequirements",
                      link?.id,
                      childrenData?.id
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

export default SpecialRequirements;
