import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card } from "@mui/material";

const TravelSpan = ({ setChildrenData, data }) => {
  const [array, setArray] = React.useState([
    {
      name: "Short gateways",
      selected: false,
      id: 1,
    },
    {
      name: "local exploration",
      selected: false,
      id: 2,
    },
    {
      name: "extended journeys",
      selected: false,
      id: 3,
    },
    {
      name: "lengthy expeditions",
      selected: false,
      id: 4,
    },
  ]);

  function handleClickChip(id) {
    setArray((pre) => {
      return pre?.map((singleItem) =>
        singleItem?.id === id
          ? { ...singleItem, selected: !singleItem?.selected }
          : singleItem
      );
    });
  }

  React.useEffect(() => {
    setChildrenData((pre) =>
      pre?.map((child) =>
        child?.id === data?.id
          ? {
              ...child,
              travelSpan: array
                ?.filter((all) => all?.selected === true)
                ?.map((singleItem) => singleItem?.name),
            }
          : child
      )
    );
  }, [array]);
  return (
    <div className="row mt-4 p-0 mx-1">
      <div>
        <h6 style={{ marginLeft: "-12px" }}>Travel Span:</h6>
        <Stack
          direction="row"
          className="row gap-2 mb-4 w-100 p-0"
          style={{ marginLeft: "-18px" }}
        >
          {array?.map((item, index) => {
            return (
              <Chip
                label={item?.name}
                key={index}
                className="col-lg-2 m-0"
                variant={item?.selected ? "outlined" : ""}
                onClick={() => handleClickChip(item?.id)}
                icon={item?.selected ? <RemoveIcon /> : <AddIcon />}
                style={{ minWidth: "150px" }}
              />
            );
          })}
        </Stack>
      </div>
      {array?.filter((all) => all?.selected === true)?.length !== 0 && (
        <Card className="py-2">
          {array
            ?.filter((all) => all?.selected === true)
            ?.map((item, index) => {
              return (
                <Chip
                  label={item?.name}
                  key={index}
                  variant="outlined"
                  className="mx-2 mb-2"
                />
              );
            })}
        </Card>
      )}
    </div>
  );
};

export default TravelSpan;
