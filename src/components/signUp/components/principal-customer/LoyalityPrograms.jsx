import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const LoyalityPrograms = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  extraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h5>Loyalty Programs:</h5>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                "principalCustomer",
                "loyaltyPrograms",
                "program",
                event
              )
            }
          >
            <label className="w-100">Loyalty Program:</label>
            <TextField
              className="form-control"
              name="program"
              id="program"
              value={extraData?.principalCustomer?.program}
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
                handleAdd("principalCustomer", "loyaltyPrograms", "program")
              }
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
          {data?.principalCustomer?.loyaltyPrograms?.length === 0 ? (
            <p className="mx-2 mt-3 text-sm">
              No Available Loyalty Programs Found!
            </p>
          ) : (
            data?.principalCustomer?.loyaltyPrograms?.map((program, index) => {
              return (
                <Chip
                  label={program?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "loyaltyPrograms",
                      program?.id
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

export default LoyalityPrograms;
