import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const TravelBucketList = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  extraData,
  data,
}) => {
  return (
    <div className="row mt-4">
      <div>
        <h6>Travel Bucket List:</h6>
        <div className="row p-0">
          <form
            className="col-lg-10 mb-2"
            onSubmit={(event) =>
              handleAdd(
                "principalCustomer",
                "travelBucketList",
                "bucketlist",
                event,
                data?.id
              )
            }
          >
            <TextField
              className="form-control w-100s"
              name="bucketlist"
              id="bucketlist"
              value={extraData?.principalCustomer?.bucketlist}
              onChange={(event) =>
                handleChangeExtraDataText("principalCustomer", event, data?.id)
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
                  "travelBucketList",
                  "bucketlist",
                  data?.id
                )
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Bucket List
            </button>
          </div>
        </div>
        {data?.principalCustomer?.travelBucketList?.length !== 0 && (
          <Card className="py-2">
            {data?.principalCustomer?.travelBucketList?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(
                      "principalCustomer",
                      "travelBucketList",
                      link?.id,
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

export default TravelBucketList;
