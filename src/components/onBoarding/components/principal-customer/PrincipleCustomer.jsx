import React from "react";
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

const PrincipleCustomer = ({
  singleDataItem,
  handleChangeText,
  extraData,
  handleChangeExtraDataText,
  handleAdd,
  handleDelete,
  setData,
}) => {
  return (
    <div>
      <h1 className="heading mb-4">Principal Customer</h1>
      <StaticTextFields
        data={singleDataItem}
        handleChangeText={handleChangeText}
      />
      <Passions
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <MainInterests
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <LifeStyle
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <SocialLinks
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />

      <LoyalityPrograms
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <TravelDocuments
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <TravelBucketList
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <SpecialRequirements
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <TypeOfTravel setData={setData} data={singleDataItem} />
      <TravelSpan setData={setData} data={singleDataItem} />
    </div>
  );
};

export default PrincipleCustomer;
