import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import StaticTextFields from "./StaticTextFields";
import MainInterests from "./MainInterests";
import SocialLinks from "./SocialLinks";
import LoyalityPrograms from "./LoyalityPrograms";
import TravelDocuments from "./TravelDocuments";
import Passions from "./Passion";
import LifeStyle from "./LifeStyle";
import TravelBucketList from "./TravelBucketList";
import SpecialRequirements from "./SpecialRequirements";
import TypeOfTravel from "./TypeOfTravel";
import TravelSpan from "./TravelSpan";

const Children = ({
  data,
  childrenExtraData,
  setChildrenData,
  setChildrenExtraData,
}) => {
  function handleChangeText(id, event) {
    if (id) {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                [event?.target?.name]: event?.target?.value,
              }
            : item
        )
      );
    }
  }

  function handleChangeExtraDataText(family, event) {
    setChildrenExtraData((pre) => {
      return {
        ...pre,
        [family]: event?.target?.value,
      };
    });
  }

  function handleAdd(id, subFamily, extraFieldFamily, event) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData[extraFieldFamily] === "") {
      toast.error(`Provide ${extraFieldFamily}`);
    } else {
      setChildrenData((pre) =>
        pre?.map((item) =>
          item?.id === id
            ? {
                ...item,
                [subFamily]: [
                  ...item[subFamily],
                  {
                    id: uuidv4(),
                    string: childrenExtraData[extraFieldFamily],
                  },
                ],
              }
            : item
        )
      );

      setChildrenExtraData((pre) => {
        return {
          ...pre,
          [extraFieldFamily]: "",
        };
      });
    }
  }

  function handleDelete(mainId, subFamily, id) {
    setChildrenData((pre) =>
      pre?.map((item) =>
        item?.id === mainId
          ? {
              ...item,
              [subFamily]: item[subFamily]?.filter((chip) => chip?.id !== id),
            }
          : item
      )
    );
  }

  return (
    <div>
      <StaticTextFields data={data} handleChangeText={handleChangeText} />
      <Passions
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <MainInterests
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <LifeStyle
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <SocialLinks
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />

      <LoyalityPrograms
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <TravelDocuments
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <TravelBucketList
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <SpecialRequirements
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
      />
      <TypeOfTravel setChildrenData={setChildrenData} data={data} />
      <TravelSpan setChildrenData={setChildrenData} data={data} />
    </div>
  );
};

export default Children;
