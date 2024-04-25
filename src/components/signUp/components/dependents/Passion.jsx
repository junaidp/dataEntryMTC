import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const Passions = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  childrenExtraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h5>Passions:</h5>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(data?.id, "passions", "passion", event)
            }
          >
            <label className="w-100">Passion:</label>
            <TextField
              className="form-control w-100s"
              name="passion"
              id="passion"
              value={childrenExtraData?.passion}
              onChange={(event) => handleChangeExtraDataText("passion", event)}
            />
          </form>

          <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
            <button
              className="btn btn-labeled btn-primary w-100 shadow"
              type="submit"
              onClick={() => handleAdd(data?.id, "passions", "passion")}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Passion
            </button>
          </div>
        </div>
        <label className="mb-2">List Of Available Passions:</label>
        <Card className="py-2">
          {data?.passions?.length === 0 ? (
            <p className="mx-2 mt-3 text-sm">No Available Passion Found!</p>
          ) : (
            data?.passions?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() => handleDelete(data?.id, "passions", link?.id)}
                />
              );
            })
          )}
        </Card>
      </div>
    </div>
  );
};

export default Passions;
