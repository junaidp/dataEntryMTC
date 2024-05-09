import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const TravelDocuments = ({
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
                "travelDocuments",
                "doc",
                event,
                data?.id
              )
            }
          >
            <TextField
              className="form-control"
              name="doc"
              id="doc"
              label="Travel Document"
              variant="outlined"
              value={extraData?.principalCustomer?.doc}
              onChange={(event) =>
                handleChangeExtraDataText("principalCustomer", event, data?.id)
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
                  "principalCustomer",
                  "travelDocuments",
                  "doc",
                  event,
                  data?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Document
            </button>
          </div>
        </div>
        {data?.principalCustomer?.travelDocuments?.length !== 0 && (
          <Card className="py-2">
            {data?.principalCustomer?.travelDocuments?.map((doc, index) => {
              return (
                <Chip
                  label={doc?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "travelDocuments",
                      doc?.id,
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

export default TravelDocuments;
