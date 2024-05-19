import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

const TravelSpan = ({ setData, data, childrenData, index, childIndex }) => {
  const { signInData } = useSelector((state) => state?.onBoard);

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
    setData((pre) =>
      pre?.map((all) =>
        all?.id === childrenData?.id
          ? {
              ...all,
              children: all?.children?.map((singleChildrenItem) =>
                singleChildrenItem?.id === data?.id
                  ? {
                      ...singleChildrenItem,
                      travelSpan: array
                        ?.filter((all) => all?.selected === true)
                        ?.map((singleItem) => singleItem?.name),
                    }
                  : singleChildrenItem
              ),
            }
          : all
      )
    );
  }, [array]);
  React.useEffect(() => {
    if (
      signInData &&
      signInData?.customers &&
      signInData?.customers?.length !== 0
    ) {
      let selectedArray = signInData?.customers[index];
      if (selectedArray?.dependents?.length === 0 || !selectedArray?.dependents) {
        return;
      }
      if (selectedArray?.dependents?.length !== 0) {
        selectedArray = selectedArray?.dependents[childIndex];
        if (
          selectedArray?.travelSpan &&
          selectedArray?.travelSpan?.length !== 0
        ) {
          setArray((pre) =>
            pre?.map((arrayItem) =>
              selectedArray?.travelSpan?.includes(arrayItem?.name)
                ? { ...arrayItem, selected: true }
                : arrayItem
            )
          );
        }
      }
    }
  }, [signInData]);

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
