import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const LifeStyle = ({
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
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                data?.id,
                "lifestyle",
                "lifestyle",
                event,
                childrenData?.id
              )
            }
          >
            <TextField
              className="form-control w-100s"
              name="lifestyle"
              id="lifestyle"
              label="LifeStyle"
              variant="outlined"
              value={childrenExtraData?.lifestyle}
              onChange={(event) =>
                handleChangeExtraDataText("lifestyle", event, childrenData?.id)
              }
            />
          </form>

          <div
            className={`col-lg-2 text-end float-end align-self-end mb-4 mt-4`}
          >
            <button
              className="btn btn-labeled btn-primary w-100 shadow "
              type="submit"
              onClick={(event) =>
                handleAdd(
                  data?.id,
                  "lifestyle",
                  "lifestyle",
                  event,
                  childrenData?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Lifestyle
            </button>
          </div>
        </div>
        {data?.lifestyle?.length !== 0 && (
          <Card className="py-2">
            {data?.lifestyle?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      data?.id,
                      "lifestyle",
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

export default LifeStyle;
