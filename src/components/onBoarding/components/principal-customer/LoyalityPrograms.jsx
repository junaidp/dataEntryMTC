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
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                "principalCustomer",
                "loyaltyPrograms",
                "program",
                event,
                data?.id
              )
            }
          >
            <TextField
              className="form-control"
              name="program"
              id="program"
              label="Loyalty Program"
              variant="outlined"
              value={extraData?.principalCustomer?.program}
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
                  "loyaltyPrograms",
                  "program",
                  event,
                  data?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Program
            </button>
          </div>
        </div>
        {data?.principalCustomer?.loyaltyPrograms?.length !== 0 && (
          <Card className="py-2">
            {data?.principalCustomer?.loyaltyPrograms?.map((program, index) => {
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
                      program?.id,
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

export default LoyalityPrograms;
