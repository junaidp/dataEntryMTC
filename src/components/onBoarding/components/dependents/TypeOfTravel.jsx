import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";

const TypeOfTravel = ({ setData, data, childrenData, index, childIndex }) => {
  const { signInData } = useSelector((state) => state?.onBoard);

  const [array, setArray] = React.useState([
    {
      name: "Adventure",
      selected: true,
      id: 1,
    },
    {
      name: "Safaris",
      selected: true,
      id: 2,
    },
    {
      name: "Remote Locations",
      selected: true,
      id: 3,
    },
    {
      name: "Eco-tourism",
      selected: true,
      id: 4,
    },
    {
      name: "Cultural",
      selected: true,
      id: 5,
    },
    {
      name: "Heritage",
      selected: true,
      id: 6,
    },
    {
      name: "Festival & Events",
      selected: true,
      id: 7,
    },
    {
      name: "Educational",
      selected: true,
      id: 8,
    },
    {
      name: "Staycations",
      selected: true,
      id: 9,
    },
    {
      name: "Wellness",
      selected: true,
      id: 10,
    },
    {
      name: "Gastronomy",
      selected: true,
      id: 11,
    },
    {
      name: "Wine tasting",
      selected: true,
      id: 12,
    },

    {
      name: "Yachting",
      selected: true,
      id: 13,
    },
    {
      name: "Ski, Sports",
      selected: true,
      id: 14,
    },
    {
      name: "Games",
      selected: true,
      id: 15,
    },
    {
      name: "Multi-generation",
      selected: true,
      id: 16,
    },
    {
      name: "Kid trips",
      selected: true,
      id: 17,
    },
    {
      name: "Business",
      selected: false,
      id: 18,
    },

    {
      name: "Workations",
      selected: false,
      id: 19,
    },
    {
      name: "Sabbaticals",
      selected: false,
      id: 20,
    },
    {
      name: "Group trips",
      selected: false,
      id: 21,
    },

    {
      name: "Road trips",
      selected: false,
      id: 22,
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
                      typeOfTravel: array
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
      if (
        selectedArray?.dependents?.length === 0 ||
        !selectedArray?.dependents
      ) {
        return;
      }
      if (selectedArray?.dependents?.length !== 0) {
        selectedArray = selectedArray?.dependents[childIndex];
        if (
          selectedArray?.typeOfTravel &&
          selectedArray?.typeOfTravel?.length !== 0
        ) {
          setArray((pre) =>
            pre?.map((arrayItem) =>
              selectedArray?.typeOfTravel?.includes(arrayItem?.name)
                ? { ...arrayItem, selected: true }
                : arrayItem
            )
          );
        }
      }
    }
  }, [signInData]);
  return (
    <div className="row mt-4 mx-1">
      <div>
        <h6 style={{ marginLeft: "-12px" }}>Type Of Travel:</h6>
        <Stack
          direction="row"
          className="row gap-2 mb-4 w-100 "
          style={{ marginLeft: "-18px" }}
        >
          {array?.map((item, index) => {
            return (
              <Chip
                label={item?.name}
                key={index}
                className="col-lg-2"
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

export default TypeOfTravel;
