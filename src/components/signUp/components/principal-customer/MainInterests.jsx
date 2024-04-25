import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const MainInterests = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  extraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h5>Main Interests:</h5>
        <div>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) =>
                handleAdd(
                  "principalCustomer",
                  "mainInterests",
                  "interest",
                  event
                )
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

            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() =>
                  handleAdd("principalCustomer", "mainInterests", "interest")
                }
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
            <p className="mx-2 mt-3 text-sm">No Available Interests Found!</p>
          ) : (
            data?.principalCustomer?.mainInterests?.map((interest, index) => {
              return (
                <Chip
                  label={interest?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "mainInterests",
                      interest?.id
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

export default MainInterests;
