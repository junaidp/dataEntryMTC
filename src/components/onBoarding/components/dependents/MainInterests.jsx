import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const MainInterests = ({
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
        <div>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) =>
                handleAdd(
                  data?.id,
                  "mainInterests",
                  "interest",
                  event,
                  childrenData?.id
                )
              }
            >
              <TextField
                className="form-control"
                name="interest"
                id="interest"
                label="Interest"
                variant="outlined"
                value={childrenExtraData?.interest}
                onChange={(event) =>
                  handleChangeExtraDataText("interest", event, childrenData?.id)
                }
              />
            </form>

            <div
              className={`col-lg-2 text-end float-end align-self-end mb-4 mt-4`}
            >
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={(event) =>
                  handleAdd(
                    data?.id,
                    "mainInterests",
                    "interest",
                    event,
                    childrenData?.id
                  )
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
        {data?.mainInterests?.length !== 0 && (
          <Card className="py-2">
            {data?.mainInterests?.map((interest, index) => {
              return (
                <Chip
                  label={interest?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      data?.id,
                      "mainInterests",
                      interest?.id,
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

export default MainInterests;
