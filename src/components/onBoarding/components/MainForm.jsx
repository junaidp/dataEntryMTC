import React from "react";
import PrincipleCustomer from "./principal-customer/PrincipleCustomer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  setupOnBoardingFirstCall,
  setupOnBoardingSecondCall,
} from "../../../global-redux/reducers/onBoard/slice";
import { useSelector, useDispatch } from "react-redux";
import ChildrenWrap from "./dependents/ChildrenWrap";
import TextField from "@mui/material/TextField";
import moment from "moment";
import FirstDialog from "./first-dialog";

const MainForm = ({ userName, setUserName }) => {
  const dispatch = useDispatch();
  const {
    loading,
    signInData,
    onBoardingAddSuccess,
    firstOnBoardingResult,
    secondOnBoardingResult,
  } = useSelector((state) => state?.onBoard);

  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState([
    {
      id: uuidv4(),
      principalCustomer: {
        id: uuidv4(),
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        cityOfResidence: "",
        email: "",
        gender: "",
        phoneNumber: "",
        nationality: "",
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
                  phoneNumber: "",
                  nationality: "",
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
      let obj = {
        id: data[0].id,
        groupName: "string",
        userName: userName,
        password: password,
        augmentedData: "string",
        mainUser: {
          ...data[0].principalCustomer,
          age: calculateAge(data[0]?.principalCustomer?.dateOfBirth) || null,
          upcomingBirthday:
            calculateUpcomingBirthday(
              data[0]?.principalCustomer?.dateOfBirth
            ) || null,
          mainInterests:
            data[0]?.principalCustomer?.mainInterests?.map(
              (item) => item?.string
            ) || [],
          socialMediaLinks:
            data[0]?.principalCustomer?.socialMediaLinks?.map(
              (item) => item?.string
            ) || [],
          loyaltyPrograms:
            data[0]?.principalCustomer?.loyaltyPrograms?.map(
              (item) => item?.string
            ) || [],
          travelDocuments:
            data[0]?.principalCustomer?.travelDocuments?.map(
              (item) => item?.string
            ) || [],
          passions:
            data[0]?.principalCustomer?.passions?.map((item) => item?.string) ||
            [],
          lifestyle:
            data[0]?.principalCustomer?.lifestyle?.map(
              (item) => item?.string
            ) || [],
          travelBucketList:
            data[0]?.principalCustomer?.travelBucketList?.map(
              (item) => item?.string
            ) || [],
          specialRequirements:
            data[0]?.principalCustomer?.specialRequirements?.map(
              (item) => item?.string
            ) || [],
          typeOfTravel:
            data[0]?.principalCustomer?.typeOfTravel?.map((item) => item) || [],
          travelSpan:
            data[0]?.principalCustomer?.travelSpan?.map((item) => item) || [],
        },
        dependents: data[0]?.children?.map((children) => {
          return {
            id: children?.id,
            firstName: children?.firstName,
            lastName: children?.lastName,
            dateOfBirth: children?.dateOfBirth,
            cityOfResidence: children?.cityOfResidence,
            email: children?.email,
            relation: children?.relation,
            gender: children?.gender,
            phoneNumber: children?.phoneNumber,
            nationality: children?.nationality,
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
              children?.specialRequirements?.map((item) => item?.string) || [],
            typeOfTravel: children?.typeOfTravel?.map((item) => item) || [],
            travelSpan: children?.travelSpan?.map((item) => item) || [],
          };
        }),
      };
      dispatch(setupOnBoardingFirstCall(obj));
      setTimeout(() => {
        dispatch(
          setupOnBoardingSecondCall({
            id: data[0]?.id,
            groupName: "string",
            userName: userName,
            password: password,
            augmentedData: "User family travel data",
            customers: [
              {
                ...obj?.mainUser,
                dependents: obj?.dependents || [],
              },
            ],
          })
        );
      }, 5000);
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

  React.useEffect(() => {
    if (
      signInData &&
      signInData?.customers &&
      signInData?.customers?.length !== 0
    ) {
      setData(
        signInData?.customers?.map((singleDataItem) => {
          return {
            id: singleDataItem?.id || uuidv4(),
            principalCustomer: {
              firstName: singleDataItem?.firstName || "",
              lastName: singleDataItem?.lastName || "",
              dateOfBirth: singleDataItem?.dateOfBirth
                ? moment.utc(singleDataItem?.dateOfBirth).format("YYYY-MM-DD")
                : "",
              cityOfResidence: singleDataItem?.cityOfResidence || "",
              email: singleDataItem?.email || "",
              gender: singleDataItem?.gender || "",
              phoneNumber: singleDataItem?.phoneNumber,
              nationality: singleDataItem?.nationality,
              mainInterests:
                singleDataItem?.mainInterests &&
                singleDataItem?.mainInterests?.length !== 0
                  ? singleDataItem?.mainInterests?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              socialMediaLinks:
                singleDataItem?.socialMediaLinks &&
                singleDataItem?.socialMediaLinks?.length !== 0
                  ? singleDataItem?.socialMediaLinks?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              loyaltyPrograms:
                singleDataItem?.loyaltyPrograms &&
                singleDataItem?.loyaltyPrograms?.length !== 0
                  ? singleDataItem?.loyaltyPrograms?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              travelDocuments:
                singleDataItem?.travelDocuments &&
                singleDataItem?.travelDocuments?.length !== 0
                  ? singleDataItem?.travelDocuments?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              passions:
                singleDataItem?.passions &&
                singleDataItem?.passions?.length !== 0
                  ? singleDataItem?.passions?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              lifestyle:
                singleDataItem?.lifestyle &&
                singleDataItem?.lifestyle?.length !== 0
                  ? singleDataItem?.lifestyle?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              travelBucketList:
                singleDataItem?.travelBucketList &&
                singleDataItem?.travelBucketList?.length !== 0
                  ? singleDataItem?.travelBucketList?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              specialRequirements:
                singleDataItem?.specialRequirements &&
                singleDataItem?.specialRequirements?.length !== 0
                  ? singleDataItem?.specialRequirements?.map((item) => {
                      return {
                        string: item,
                        id: uuidv4(),
                      };
                    })
                  : [],
              typeOfTravel:
                singleDataItem?.typeOfTravel &&
                singleDataItem?.typeOfTravel?.length !== 0
                  ? singleDataItem?.typeOfTravel?.map((item) => item)
                  : [],
              travelSpan:
                singleDataItem?.travelSpan &&
                singleDataItem?.travelSpan?.length !== 0
                  ? singleDataItem?.travelSpan?.map((item) => item)
                  : [],
            },
            children: singleDataItem?.dependents?.map((children) => {
              return {
                id: children?.id || uuidv4(),
                firstName: children?.firstName || "",
                lastName: children?.lastName || "",
                dateOfBirth: children?.dateOfBirth
                  ? moment.utc(children?.dateOfBirth).format("YYYY-MM-DD")
                  : "",
                cityOfResidence: children?.cityOfResidence || "",
                email: children?.email || "",
                relation: children?.relation || "",
                gender: children?.gender || "",
                mainInterests:
                  children?.mainInterests &&
                  children?.mainInterests?.length !== 0
                    ? children?.mainInterests?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                socialMediaLinks:
                  children?.socialMediaLinks &&
                  children?.socialMediaLinks?.length !== 0
                    ? children?.socialMediaLinks?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                loyaltyPrograms:
                  children?.loyaltyPrograms &&
                  children?.loyaltyPrograms?.length !== 0
                    ? children?.loyaltyPrograms?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                travelDocuments:
                  children?.travelDocuments &&
                  children?.travelDocuments?.length !== 0
                    ? children?.travelDocuments?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                passions:
                  children?.passions && children?.passions?.length !== 0
                    ? children?.passions?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                lifestyle:
                  children?.lifestyle && children?.lifestyle?.length !== 0
                    ? children?.lifestyle?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                travelBucketList:
                  children?.travelBucketList &&
                  children?.travelBucketList?.length !== 0
                    ? children?.travelBucketList?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                specialRequirements:
                  children?.specialRequirements &&
                  children?.specialRequirements?.length !== 0
                    ? children?.specialRequirements?.map((item) => {
                        return {
                          string: item,
                          id: uuidv4(),
                        };
                      })
                    : [],
                typeOfTravel:
                  children?.typeOfTravel && children?.typeOfTravel?.length !== 0
                    ? children?.typeOfTravel?.map((item) => item)
                    : [],
                travelSpan:
                  children?.travelSpan && children?.travelSpan?.length !== 0
                    ? children?.travelSpan?.map((item) => item)
                    : [],
              };
            }),
          };
        })
      );
      setUserName(signInData?.userName || "");
      setPassword(signInData?.password || "");
    }
  }, [signInData]);

  return (
    <div className="my-4">
      {onBoardingAddSuccess && (
        <div className="modal-objective">
          <div className="model-wrap">
            <FirstDialog
              firstOnBoardingResult={firstOnBoardingResult}
              secondOnBoardingResult={secondOnBoardingResult}
            />
          </div>
        </div>
      )}
      <h5 className="link-info cursor-pointer">OnBoarding</h5>
      <hr />

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
                        <div>Main User</div>
                      </div>
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
                      index={index}
                    />
                    <hr className="mt-4" />
                    <ChildrenWrap
                      handleAddChildrenDataObject={handleAddChildrenDataObject}
                      childrenData={singleDataItem}
                      setChildrenExtraData={setChildrenExtraData}
                      childrenExtraData={childrenExtraData}
                      setData={setData}
                      handleDeleteAccordion={handleDeleteAccordion}
                      index={index}
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {!signInData?.customers && (
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
              type="password"
            />
          </div>
          <div className="col-lg-4 mt-3 cursor-pointer">
            <p>Optional (to sign in later)</p>
          </div>
        </div>
      )}

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
