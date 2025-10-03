import StaticTextFields from "./StaticTextFields";
import MainInterests from "./MainInterests";
import Passions from "./Passion";
import LifeStyle from "./LifeStyle";
import TravelBucketList from "./TravelBucketList";
import TypeOfTravel from "./TypeOfTravel";

const PrincipleCustomer = ({
  singleDataItem,
  handleChangeText,
  extraData,
  handleChangeExtraDataText,
  handleAdd,
  handleDelete,
  setData,
  index
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
      <TravelBucketList
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        handleChangeExtraDataText={handleChangeExtraDataText}
        extraData={extraData}
        data={singleDataItem}
      />
      <TypeOfTravel setData={setData} data={singleDataItem} index={index} />
    </div>
  );
};

export default PrincipleCustomer;
