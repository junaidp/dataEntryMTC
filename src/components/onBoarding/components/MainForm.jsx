import React from "react";
import PrincipleCustomer from "./principal-customer/PrincipleCustomer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { setupOnBoarding } from "../../../global-redux/reducers/onBoard/slice";
import { useSelector, useDispatch } from "react-redux";
import ChildrenWrap from "./dependents/ChildrenWrap";
import TextField from "@mui/material/TextField";

const MainForm = () => {
  const dispatch = useDispatch();
  const { loading, onBoardingAddSuccess } = useSelector(
    (state) => state?.onBoard
  );
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState([
    {
      id: uuidv4(),
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
      children: [],
    },
  ]);

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

  function handleDeleteAccordionPrincipalCustomer(id) {
    setData((pre) => pre?.filter((all) => all?.id !== id));
  }
  function handleAddPricipalCustomers() {
    setData([
      ...data,
      {
        id: uuidv4(),
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
        children: [],
      },
    ]);
  }

  function handleDeleteAccordion(id, mainId) {
    setData((pre) =>
      pre?.map((all) =>
        all?.id === mainId
          ? {
              ...all,
              children: all?.children?.filter(
                (singleChildren) => singleChildren?.id !== id
              ),
            }
          : all
      )
    );
  }

  function handleAddChildrenDataObject(id) {
    setData((pre) =>
      pre?.map((all) =>
        all?.id === id
          ? {
              ...all,
              children: [
                ...all?.children,
                {
                  firstName: "",
                  lastName: "",
                  dateOfBirth: "",
                  cityOfResidence:
                    data?.find((singleData) => singleData?.id === id)
                      ?.principalCustomer?.cityOfResidence || "",
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
              ],
            }
          : all
      )
    );
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
      if (data?.length === 0) {
        toast.error("Please provide atlease one principal customer");
      }
      if (data?.length !== 0) {
        dispatch(
          setupOnBoarding({
            groupName: "string",
            userName: userName,
            password: password,
            augmentedData: "string",
            customers: data?.map((singleDataItem) => {
              return {
                ...singleDataItem?.principalCustomer,
                age:
                  calculateAge(
                    singleDataItem?.principalCustomer?.dateOfBirth
                  ) || null,
                upcomingBirthday:
                  calculateUpcomingBirthday(
                    singleDataItem?.principalCustomer?.dateOfBirth
                  ) || null,
                mainInterests:
                  singleDataItem?.principalCustomer?.mainInterests?.map(
                    (item) => item?.string
                  ) || [],
                socialMediaLinks:
                  singleDataItem?.principalCustomer?.socialMediaLinks?.map(
                    (item) => item?.string
                  ) || [],
                loyaltyPrograms:
                  singleDataItem?.principalCustomer?.loyaltyPrograms?.map(
                    (item) => item?.string
                  ) || [],
                travelDocuments:
                  singleDataItem?.principalCustomer?.travelDocuments?.map(
                    (item) => item?.string
                  ) || [],
                passions:
                  singleDataItem?.principalCustomer?.passions?.map(
                    (item) => item?.string
                  ) || [],
                lifestyle:
                  singleDataItem?.principalCustomer?.lifestyle?.map(
                    (item) => item?.string
                  ) || [],
                travelBucketList:
                  singleDataItem?.principalCustomer?.travelBucketList?.map(
                    (item) => item?.string
                  ) || [],
                specialRequirements:
                  singleDataItem?.principalCustomer?.specialRequirements?.map(
                    (item) => item?.string
                  ) || [],
                typeOfTravel:
                  singleDataItem?.principalCustomer?.typeOfTravel?.map(
                    (item) => item
                  ) || [],
                travelSpan:
                  singleDataItem?.principalCustomer?.travelSpan?.map(
                    (item) => item
                  ) || [],
                dependents: singleDataItem?.children?.map((children) => {
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
                      children?.mainInterests?.map((item) => item?.string) ||
                      [],
                    socialMediaLinks:
                      children?.socialMediaLinks?.map((item) => item?.string) ||
                      [],
                    loyaltyPrograms:
                      children?.loyaltyPrograms?.map((item) => item?.string) ||
                      [],
                    travelDocuments:
                      children?.travelDocuments?.map((item) => item?.string) ||
                      [],
                    passions:
                      children?.passions?.map((item) => item?.string) || [],
                    lifestyle:
                      children?.lifestyle?.map((item) => item?.string) || [],
                    travelBucketList:
                      children?.travelBucketList?.map((item) => item?.string) ||
                      [],
                    specialRequirements:
                      children?.specialRequirements?.map(
                        (item) => item?.string
                      ) || [],
                    typeOfTravel:
                      children?.typeOfTravel?.map((item) => item) || [],
                    travelSpan: children?.travelSpan?.map((item) => item) || [],
                  };
                }),
              };
            }),
          })
        );
      }
    }
  }

  const handleChangeExtraDataText = React.useCallback((family, event) => {
    setExtraData((prevExtraData) => ({
      ...prevExtraData,
      [family]: {
        ...prevExtraData[family],
        [event.target.name]: event.target.value,
      },
    }));
  }, []);

  const handleChangeText = React.useCallback((family, event, id) => {
    setData((prevData) =>
      prevData.map((all) =>
        all.id === id
          ? {
              ...all,
              [family]: {
                ...all[family],
                [event.target.name]: event.target.value,
              },
            }
          : all
      )
    );
  }, []);

  const handleAdd = React.useCallback(
    (family, subFamily, extraFieldFamily, event, id) => {
      if (event) {
        event.preventDefault();
      }

      if (extraData[family][extraFieldFamily] === "") {
        toast.error(`Provide ${extraFieldFamily}`);
      } else {
        setData((prevData) =>
          prevData.map((all) =>
            all.id === id
              ? {
                  ...all,
                  [family]: {
                    ...all[family],
                    [subFamily]: [
                      ...all[family][subFamily],
                      {
                        id: uuidv4(),
                        string: extraData[family][extraFieldFamily],
                      },
                    ],
                  },
                }
              : all
          )
        );

        setExtraData((prevExtraData) => ({
          ...prevExtraData,
          [family]: {
            ...prevExtraData[family],
            [extraFieldFamily]: "",
          },
        }));
      }
    },
    [extraData]
  );

  const handleDelete = React.useCallback((family, subFamily, id, mainId) => {
    setData((prevData) =>
      prevData.map((all) =>
        all.id === mainId
          ? {
              ...all,
              [family]: {
                ...all[family],
                [subFamily]: all[family][subFamily]?.filter(
                  (subFamilyItem) => subFamilyItem.id !== id
                ),
              },
            }
          : all
      )
    );
  }, []);

  return (
    <div className="my-4">
      <h5 className="link-info cursor-pointer">OnBoarding</h5>
      <hr />

      <header className="section-header my-3 align-items-center text-start d-flex">
        <div className="mb-0 sub-heading">Add Principal Customers</div>
        <div
          className="btn btn-labeled btn-primary ms-3 px-3 shadow"
          onClick={handleAddPricipalCustomers}
        >
          <span className="btn-label me-2">
            <i className="fa fa-plus-circle"></i>
          </span>
          Add
        </div>
      </header>
      <div className="accordion" id="accordionFlushExample">
        {data?.length === 0 ? (
          <p>No Principal Customer Added Yet!</p>
        ) : (
          data?.map((singleDataItem, index) => {
            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      index === 0 && "collapsed"
                    } br-8`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={`flush-collapse${index}`}
                    onClick={() => {
                      setChildrenExtraData({
                        interest: "",
                        link: "",
                        program: "",
                        doc: "",
                        passion: "",
                        lifestyle: "",
                        bucketlist: "",
                        specialrequirement: "",
                      });
                      setExtraData({
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
                    }}
                  >
                    <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-100">
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        <div>Principal Customer {index + 1}</div>
                      </div>
                      <i
                        class="fa fa-trash text-danger f-18 cusrsor-pointer"
                        onClick={() =>
                          handleDeleteAccordionPrincipalCustomer(
                            singleDataItem?.id
                          )
                        }
                      ></i>
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 && "show"
                  }`}
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <PrincipleCustomer
                      singleDataItem={singleDataItem}
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
                      childrenData={singleDataItem}
                      setChildrenExtraData={setChildrenExtraData}
                      childrenExtraData={childrenExtraData}
                      setData={setData}
                      handleDeleteAccordion={handleDeleteAccordion}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="row mt-4">
        <div className="col-lg-4 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="User Name"
            variant="outlined"
            className="form-control"
            value={userName}
            onChange={(event) => setUserName(event?.target?.value)}
          />
        </div>
        <div className="col-lg-4 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Password"
            variant="outlined"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event?.target?.value)}
          />
        </div>
        <div className="col-lg-4 mt-3 cursor-pointer">
          <p>Optional (to sign in later)</p>
        </div>
      </div>

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
    </div>
  );
};

export default MainForm;
