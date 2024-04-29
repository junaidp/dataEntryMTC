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
  data,
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
      <StaticTextFields data={data} handleChangeText={handleChangeText} />
      <Passions
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <MainInterests
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <LifeStyle
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <SocialLinks
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />

      <LoyalityPrograms
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <TravelDocuments
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <TravelBucketList
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <SpecialRequirements
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={data}
      />
      <TypeOfTravel setData={setData} />
      <TravelSpan setData={setData} />
    </div>
  );
};

export default PrincipleCustomer;
