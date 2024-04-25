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
        <h5>Travel Documents:</h5>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd("principalCustomer", "travelDocuments", "doc", event)
            }
          >
            <label className="w-100">Travel Document:</label>
            <TextField
              className="form-control"
              name="doc"
              id="doc"
              value={extraData?.principalCustomer?.doc}
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
                handleAdd("principalCustomer", "travelDocuments", "doc")
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Document
            </button>
          </div>
        </div>
        <label className="mb-2">List Of Available Travel Documents:</label>
        <Card className="py-2">
          {data?.principalCustomer?.travelDocuments?.length === 0 ? (
            <p className="mx-2 mt-3 text-sm">
              No Available Travel Documents Found!
            </p>
          ) : (
            data?.principalCustomer?.travelDocuments?.map((doc, index) => {
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
                      doc?.id
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

export default TravelDocuments;
