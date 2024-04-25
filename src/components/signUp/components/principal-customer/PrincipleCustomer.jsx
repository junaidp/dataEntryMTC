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

const PrincipleCustomer = ({
  data,
  handleChangeText,
  extraData,
  handleChangeExtraDataText,
  handleAdd,
  handleDelete,
}) => {
  return (
    <div>
      <h1 className="heading mb-4">Principal Customer</h1>
      <StaticTextFields data={data} handleChangeText={handleChangeText} />
      <MainInterests
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
      <Passions
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
    </div>
  );
};

export default PrincipleCustomer;
