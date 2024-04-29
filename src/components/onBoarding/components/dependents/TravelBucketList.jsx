import React from "react";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";

const TravelBucketList = ({
  handleAdd,
  handleDelete,
  handleChangeExtraDataText,
  childrenExtraData,
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
              handleAdd(data?.id, "travelBucketList", "bucketlist", event)
            }
          >
            <TextField
              className="form-control w-100s"
              name="bucketlist"
              id="bucketlist"
              value={childrenExtraData?.bucketlist}
              onChange={(event) =>
                handleChangeExtraDataText("bucketlist", event)
              }
            />
          </form>

          <div className={`col-lg-2 text-end float-end align-self-end mb-4`}>
            <button
              className="btn btn-labeled btn-primary w-100 shadow"
              type="submit"
              onClick={() =>
                handleAdd(data?.id, "travelBucketList", "bucketlist")
              }
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Add Bucket List
            </button>
          </div>
        </div>
        {data?.travelBucketList?.length !== 0 && (
          <Card className="py-2">
            {data?.travelBucketList?.map((link, index) => {
              return (
                <Chip
                  label={link?.string}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                  onDelete={() =>
                    handleDelete(data?.id, "travelBucketList", link?.id)
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
