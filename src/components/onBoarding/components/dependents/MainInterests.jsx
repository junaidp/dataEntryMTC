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
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h6>Interests:</h6>
        <div>
          <div className="row p-0">
            <form
              className="col-lg-10 mb-2"
              onSubmit={(event) =>
                handleAdd(data?.id, "mainInterests", "interest", event)
              }
            >
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

            <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
              <button
                className="btn btn-labeled btn-primary w-100 shadow"
                type="submit"
                onClick={() => handleAdd(data?.id, "mainInterests", "interest")}
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
                    handleDelete(data?.id, "mainInterests", interest?.id)
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