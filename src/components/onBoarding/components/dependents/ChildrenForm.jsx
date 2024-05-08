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
  setData,
  setChildrenExtraData,
  childrenData,
}) => {
  function handleChangeText(id, event, mainId) {
    if (id) {
      setData((pre) =>
        pre?.map((all) => all?.id === mainId)
          ? {
              ...all,
              children: all?.children?.map((singleChildrenItem) =>
                singleChildrenItem?.id === id
                  ? {
                      ...singleChildrenItem,
                      [event?.target?.name]: event?.target?.value,
                    }
                  : singleChildrenItem
              ),
            }
          : all
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

  function handleAdd(id, subFamily, extraFieldFamily, event, mainId) {
    if (event) {
      event.preventDefault();
    }
    if (childrenExtraData[extraFieldFamily] === "") {
      toast.error(`Provide ${extraFieldFamily}`);
    } else {
      setData((pre) =>
        pre?.map((item) =>
          item?.id === mainId
            ? {
                ...item,
                children: item?.children?.map((singleChildrenItem) =>
                  singleChildrenItem?.id === id
                    ? {
                        ...singleChildrenItem,
                        [subFamily]: [
                          ...singleChildrenItem[subFamily],
                          {
                            id: uuidv4(),
                            string: childrenExtraData[extraFieldFamily],
                          },
                        ],
                      }
                    : singleChildrenItem
                ),
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

  function handleDelete(subChildrenId, subFamily, id, mainId) {
    setData((pre) =>
      pre?.map((all) =>
        all?.id === mainId
          ? {
              ...all,
              children: all?.children?.map((singleChildrenItem) =>
                singleChildrenItem?.id === subChildrenId
                  ? {
                      ...singleChildrenItem,
                      [subFamily]: singleChildrenItem[subFamily]?.filter(
                        (chip) => chip?.id !== id
                      ),
                    }
                  : singleChildrenItem
              ),
            }
          : all
      )
    );
  }

  return (
    <div>
      <StaticTextFields
        data={data}
        handleChangeText={handleChangeText}
        childrenData={childrenData}
      />
      <Passions
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <MainInterests
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <LifeStyle
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <SocialLinks
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />

      <LoyalityPrograms
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <TravelDocuments
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <TravelBucketList
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <SpecialRequirements
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        childrenExtraData={childrenExtraData}
        data={data}
        childrenData={childrenData}
      />
      <TypeOfTravel setData={setData} data={data} childrenData={childrenData} />
      <TravelSpan setData={setData} data={data} childrenData={childrenData} />
    </div>
  );
};

export default Children;
