import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const SpecialRequirements = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  extraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h5>Special Requirements:</h5>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                "principalCustomer",
                "specialRequirements",
                "specialrequirement",
                event
              )
            }
          >
            <label className="w-100">Special Requirements:</label>
            <TextField
              className="form-control w-100s"
              name="specialrequirement"
              id="specialrequirement"
              value={extraData?.principalCustomer?.specialrequirement}
              onChange={(event) =>
                handleChangeExtraDataText("principalCustomer", event)
              }
            />
          </form>

          <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
            <button
              className="btn btn-labeled btn-primary w-100 shadow"
              type="submit"
              onClick={() =>
                handleAdd(
                  "principalCustomer",
                  "specialRequirements",
                  "specialrequirement"
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
        <label className="mb-2">List Of Available Special Requirements:</label>
        <Card className="py-2">
          {data?.principalCustomer?.specialRequirements?.length === 0 ? (
            <p className="mx-2 mt-3 text-sm">
              No Available Special Requirements Found!
            </p>
          ) : (
            data?.principalCustomer?.specialRequirements?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "specialRequirements",
                      link?.id
                    )
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

export default SpecialRequirements;
