import React from "react";
import PrincipleCustomer from "./principal-customer/PrincipleCustomer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  resetOnBoardingAddSuccess,
  setupOnBoarding,
} from "../../../global-redux/reducers/onBoard/slice";
import { useSelector, useDispatch } from "react-redux";
// import Responses from "./Responses";
import ChildrenWrap from "./dependents/ChildrenWrap";

const MainForm = () => {
  const dispatch = useDispatch();
  const { loading, response, onBoardingAddSuccess } = useSelector(
    (state) => state?.onBoard
  );
  const [data, setData] = React.useState({
    principalCustomer: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      cityOfResidence: "",
      email: "",
      gender: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
      passions: [],
      lifestyle: [],
      travelBucketList: [],
      specialRequirements: [],
      typeOfTravel: [],
      travelSpan: [],
    },
  });
  const [childrenData, setChildrenData] = React.useState([]);

  const [extraData, setExtraData] = React.useState({
    principalCustomer: {
      interest: "",
      link: "",
      program: "",
      doc: "",
      passion: "",
      lifestyle: "",
      bucketlist: "",
      specialrequirement: "",
    },
  });
  const [childrenExtraData, setChildrenExtraData] = React.useState({
    interest: "",
    link: "",
    program: "",
    doc: "",
    passion: "",
    lifestyle: "",
    bucketlist: "",
    specialrequirement: "",
  });

  function handleDeleteAccordion(id) {
    setChildrenData((pre) => pre?.filter((item) => item?.id !== id));
  }

  function handleAddChildrenDataObject() {
    setChildrenData([
      ...childrenData,
      {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        cityOfResidence: data?.principalCustomer?.cityOfResidence || "",
        email: "",
        relation: "",
        gender: "",
        mainInterests: [],
        socialMediaLinks: [],
        loyaltyPrograms: [],
        travelDocuments: [],
        passions: [],
        lifestyle: [],
        travelBucketList: [],
        specialRequirements: [],
        typeOfTravel: [],
        travelSpan: [],
        id: uuidv4(),
      },
    ]);
  }

  const calculateAge = (dateOfBirth) => {
    if (dateOfBirth !== "" && dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
      }
      if (age === 0) {
        return 1;
      }
      return age;
    } else {
      return 0;
    }
  };

  const calculateUpcomingBirthday = (dateOfBirth) => {
    if (dateOfBirth !== "" && dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      const currentYear = today.getFullYear();
      const upcomingBirthday = new Date(
        currentYear,
        birthDate.getMonth(),
        birthDate.getDate()
      );
      if (upcomingBirthday < today) {
        upcomingBirthday.setFullYear(currentYear + 1);
      }
      const timeDiff = upcomingBirthday.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const monthsDiff = Math.floor(daysDiff / 30);
      if (monthsDiff === 0) {
        return "this month";
      }
      if (monthsDiff === 1) {
        return "next month";
      }
      return `in ${monthsDiff} months`;
    } else {
      return "";
    }
  };

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupOnBoarding({
          principalCustomer: {
            ...data?.principalCustomer,
            age: calculateAge(data?.principalCustomer?.dateOfBirth) || null,
            upcomingBirthday:
              calculateUpcomingBirthday(data?.principalCustomer?.dateOfBirth) ||
              null,
            mainInterests:
              data?.principalCustomer?.mainInterests?.map(
                (item) => item?.string
              ) || [],
            socialMediaLinks:
              data?.principalCustomer?.socialMediaLinks?.map(
                (item) => item?.string
              ) || [],
            loyaltyPrograms:
              data?.principalCustomer?.loyaltyPrograms?.map(
                (item) => item?.string
              ) || [],
            travelDocuments:
              data?.principalCustomer?.travelDocuments?.map(
                (item) => item?.string
              ) || [],
            passions:
              data?.principalCustomer?.passions?.map((item) => item?.string) ||
              [],
            lifestyle:
              data?.principalCustomer?.lifestyle?.map((item) => item?.string) ||
              [],
            travelBucketList:
              data?.principalCustomer?.travelBucketList?.map(
                (item) => item?.string
              ) || [],
            specialRequirements:
              data?.principalCustomer?.specialRequirements?.map(
                (item) => item?.string
              ) || [],
            typeOfTravel:
              data?.principalCustomer?.typeOfTravel?.map((item) => item) || [],
            travelSpan:
              data?.principalCustomer?.travelSpan?.map((item) => item) || [],
          },
          dependents: childrenData?.map((children) => {
            return {
              firstName: children?.firstName,
              lastName: children?.lastName,
              dateOfBirth: children?.dateOfBirth,
              cityOfResidence: children?.cityOfResidence,
              email: children?.email,
              relation: children?.relation,
              gender: children?.gender,
              age: calculateAge(children?.dateOfBirth) || null,
              upcomingBirthday:
                calculateUpcomingBirthday(children?.dateOfBirth) || null,
              mainInterests:
                children?.mainInterests?.map((item) => item?.string) || [],
              socialMediaLinks:
                children?.socialMediaLinks?.map((item) => item?.string) || [],
              loyaltyPrograms:
                children?.loyaltyPrograms?.map((item) => item?.string) || [],
              travelDocuments:
                children?.travelDocuments?.map((item) => item?.string) || [],
              passions: children?.passions?.map((item) => item?.string) || [],
              lifestyle: children?.lifestyle?.map((item) => item?.string) || [],
              travelBucketList:
                children?.travelBucketList?.map((item) => item?.string) || [],
              specialRequirements:
                children?.specialRequirements?.map((item) => item?.string) ||
                [],
              typeOfTravel: children?.typeOfTravel?.map((item) => item) || [],
              travelSpan: children?.travelSpan?.map((item) => item) || [],
            };
          }),
        })
      );
    }
  }

  function handleChangeExtraDataText(family, event) {
    setExtraData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          [event?.target?.name]: event?.target?.value,
        },
      };
    });
  }

  function handleChangeText(family, event) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          [event?.target?.name]: event?.target?.value,
        },
      };
    });
  }

  // For the Interest
  function handleAdd(family, subFamily, extraFieldFamily, event) {
    if (event) {
      event.preventDefault();
    }
    if (extraData[family][extraFieldFamily] === "") {
      toast.error(`Provide ${extraFieldFamily}`);
    } else {
      setData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            [subFamily]: [
              ...pre[family][subFamily],
              {
                id: uuidv4(),
                string: extraData[family][extraFieldFamily],
              },
            ],
          },
        };
      });
      setExtraData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            [extraFieldFamily]: "",
          },
        };
      });
    }
  }

  function handleDelete(family, subFamily, id) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          [subFamily]: pre[family][subFamily]?.filter((all) => all?.id !== id),
        },
      };
    });
  }

  React.useEffect(() => {
    if (onBoardingAddSuccess) {
      dispatch(resetOnBoardingAddSuccess());
    }
  }, [onBoardingAddSuccess]);

  React.useEffect(() => {
    setChildrenData((pre) => {
      return pre?.map((child) => {
        return {
          ...child,
          cityOfResidence: data?.principalCustomer?.cityOfResidence,
        };
      });
    });
  }, [data?.principalCustomer?.cityOfResidence]);

  return (
    <div className="my-4">
      <h3 className=" my-4 underline">OnBoarding</h3>
      <PrincipleCustomer
        data={data}
        handleChangeText={handleChangeText}
        extraData={extraData}
        handleChangeExtraDataText={handleChangeExtraDataText}
        handleAdd={handleAdd}
        handleDelete={handleDelete}
        setData={setData}
      />

      <hr className="mt-4" />

      <ChildrenWrap
        handleAddChildrenDataObject={handleAddChildrenDataObject}
        childrenData={childrenData}
        setChildrenExtraData={setChildrenExtraData}
        extraData={extraData}
        childrenExtraData={childrenExtraData}
        setChildrenData={setChildrenData}
        handleDeleteAccordion={handleDeleteAccordion}
      />

      <div>
        <div
          className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
            loading && "disabled"
          } `}
          onClick={handleSubmit}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          {loading ? "Loading..." : "Submit"}
        </div>
      </div>

      {/* <Responses response={response} /> */}
    </div>
  );
};

export default MainForm;
