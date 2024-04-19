import React from "react";
import PrincipleCustomer from "./PrincipleCustomer";
import Spouse from "./SpouseForm";
import Children from "./ChildrenForm";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  resetOnBoardingAddSuccess,
  setupOnBoarding,
} from "../../../global-redux/reducers/onBoard/slice";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
      phoneNumber: "",
      age: "",
      upcomingBirthday: "",
      nationality: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
    },
    spouse: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      cityOfResidence: "",
      email: "",
      age: "",
      upcomingBirthday: "",
      phoneNumber: "",
      nationality: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
    },
  });
  const [childrenData, setChildrenData] = React.useState([
    {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      cityOfResidence: "",
      email: "",
      age: "",
      upcomingBirthday: "",
      phoneNumber: "",
      nationality: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
      id: uuidv4(),
    },
  ]);

  const [extraData, setExtraData] = React.useState({
    principalCustomer: {
      interest: "",
      link: "",
      program: "",
      doc: "",
    },
    spouse: {
      interest: "",
      link: "",
      program: "",
      doc: "",
    },
  });
  const [childrenExtraData, setChildrenExtraData] = React.useState({
    interest: "",
    link: "",
    program: "",
    doc: "",
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
        cityOfResidence: "",
        email: "",
        age: "",
        upcomingBirthday: "",
        phoneNumber: "",
        nationality: "",
        mainInterests: [],
        socialMediaLinks: [],
        loyaltyPrograms: [],
        travelDocuments: [],
        id: uuidv4(),
      },
    ]);
  }

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupOnBoarding({
          principalCustomer: {
            ...data?.principalCustomer,
            age: Number(data?.principalCustomer?.age),
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
          },
          spouse: {
            ...data?.spouse,
            age: Number(data?.spouse?.age),
            mainInterests:
              data?.spouse?.mainInterests?.map((item) => item?.string) || [],
            socialMediaLinks:
              data?.spouse?.socialMediaLinks?.map((item) => item?.string) || [],
            loyaltyPrograms:
              data?.spouse?.loyaltyPrograms?.map((item) => item?.string) || [],
            travelDocuments:
              data?.spouse?.travelDocuments?.map((item) => item?.string) || [],
          },
          children: childrenData?.map((children) => {
            return {
              firstName: children?.firstName,
              lastName: children?.lastName,
              dateOfBirth: children?.dateOfBirth,
              cityOfResidence: children?.cityOfResidence,
              email: children?.email,
              phoneNumber: children?.phoneNumber,
              nationality: children?.nationality,
              age: Number(children?.age),
              upcomingBirthday: children?.upcomingBirthday,
              mainInterests:
                children?.mainInterests?.map((item) => item?.string) || [],
              socialMediaLinks:
                children?.socialMediaLinks?.map((item) => item?.string) || [],
              loyaltyPrograms:
                children?.loyaltyPrograms?.map((item) => item?.string) || [],
              travelDocuments:
                children?.travelDocuments?.map((item) => item?.string) || [],
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
  function handleAddInterest(family, event) {
    if (event) {
      event.preventDefault();
    }
    if (extraData[family]?.interest === "") {
      toast.error("Provide Interest", {
        toastId: "interest",
      });
    } else {
      setData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            mainInterests: [
              ...pre[family]?.mainInterests,
              {
                id: uuidv4(),
                string: extraData[family]?.interest,
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
            interest: "",
          },
        };
      });
    }
  }

  function handleDeleteInterest(family, id) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          mainInterests: pre[family]?.mainInterests?.filter(
            (all) => all?.id !== id
          ),
        },
      };
    });
  }
  // For the Link
  function handleAddLink(family, event) {
    if (event) {
      event.preventDefault();
    }
    if (extraData[family]?.link === "") {
      toast.error("Provide Link", {
        toastId: "link",
      });
    } else {
      setData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            socialMediaLinks: [
              ...pre[family]?.socialMediaLinks,
              {
                id: uuidv4(),
                string: extraData[family]?.link,
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
            link: "",
          },
        };
      });
    }
  }

  function handleDeleteLink(family, id) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          socialMediaLinks: pre[family]?.socialMediaLinks?.filter(
            (all) => all?.id !== id
          ),
        },
      };
    });
  }
  // For the Program
  function handleAddProgram(family, event) {
    if (event) {
      event.preventDefault();
    }
    if (extraData[family]?.program === "") {
      toast.error("Provide Program", {
        toastId: "program",
      });
    } else {
      setData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            loyaltyPrograms: [
              ...pre[family]?.loyaltyPrograms,
              {
                id: uuidv4(),
                string: extraData[family]?.program,
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
            program: "",
          },
        };
      });
    }
  }

  function handleDeleteProgram(family, id) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          loyaltyPrograms: pre[family]?.loyaltyPrograms?.filter(
            (all) => all?.id !== id
          ),
        },
      };
    });
  }
  // For the Doc
  function handleAddDoc(family, event) {
    if (event) {
      event.preventDefault();
    }
    if (extraData[family]?.doc === "") {
      toast.error("Provide Document", {
        toastId: "document",
      });
    } else {
      setData((pre) => {
        return {
          ...pre,
          [family]: {
            ...pre[family],
            travelDocuments: [
              ...pre[family]?.travelDocuments,
              {
                id: uuidv4(),
                string: extraData[family]?.doc,
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
            doc: "",
          },
        };
      });
    }
  }

  function handleDeleteDoc(family, id) {
    setData((pre) => {
      return {
        ...pre,
        [family]: {
          ...pre[family],
          travelDocuments: pre[family]?.travelDocuments?.filter(
            (all) => all?.id !== id
          ),
        },
      };
    });
  }

  React.useEffect(() => {
    if (onBoardingAddSuccess) {
      dispatch(resetOnBoardingAddSuccess());
    }
  }, [onBoardingAddSuccess]);

  return (
    <div className="my-4">
      <PrincipleCustomer
        data={data}
        handleChangeText={handleChangeText}
        extraData={extraData}
        handleChangeExtraDataText={handleChangeExtraDataText}
        handleAddInterest={handleAddInterest}
        handleDeleteInterest={handleDeleteInterest}
        handleAddLink={handleAddLink}
        handleDeleteLink={handleDeleteLink}
        handleAddProgram={handleAddProgram}
        handleDeleteProgram={handleDeleteProgram}
        handleAddDoc={handleAddDoc}
        handleDeleteDoc={handleDeleteDoc}
      />
      <hr className="mt-4" />
      <div className="mt-4">
        <Spouse
          data={data}
          handleChangeText={handleChangeText}
          extraData={extraData}
          handleChangeExtraDataText={handleChangeExtraDataText}
          handleAddInterest={handleAddInterest}
          handleDeleteInterest={handleDeleteInterest}
          handleAddLink={handleAddLink}
          handleDeleteLink={handleDeleteLink}
          handleAddProgram={handleAddProgram}
          handleDeleteProgram={handleDeleteProgram}
          handleAddDoc={handleAddDoc}
          handleDeleteDoc={handleDeleteDoc}
        />
      </div>
      <hr className="mt-4" />
      <div className="mt-4">
        <header className="section-header my-3 align-items-center text-start d-flex">
          <div className="mb-0 sub-heading">Add More Childrens</div>
          <div
            className="btn btn-labeled btn-primary ms-3 px-3 shadow"
            onClick={handleAddChildrenDataObject}
          >
            <span className="btn-label me-2">
              <i className="fa fa-plus-circle"></i>
            </span>
            Add
          </div>
        </header>
        <div className="accordion" id="accordionFlushExample">
          {childrenData?.map((children, index) => {
            return (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed br-8"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#flush-collapse${index}`}
                    aria-expanded="false"
                    aria-controls={`flush-collapse${index}`}
                    onClick={() =>
                      setChildrenExtraData({
                        interest: "",
                        link: "",
                        program: "",
                        doc: "",
                      })
                    }
                  >
                    <div className="d-flex w-100 me-3 align-items-center justify-content-between">
                      <div className="d-flex align-items-center w-100">
                        <i className="fa fa-check-circle fs-3 text-success pe-3"></i>
                        <div>Children {index + 1}</div>
                      </div>
                      {index !== 0 && (
                        <i
                          class="fa fa-trash text-danger f-18 cusrsor-pointer"
                          onClick={() => handleDeleteAccordion(children?.id)}
                        ></i>
                      )}
                    </div>
                  </button>
                </h2>
                <div
                  id={`flush-collapse${index}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <Children
                      index={index}
                      key={index}
                      data={children}
                      extraData={extraData}
                      childrenExtraData={childrenExtraData}
                      setChildrenData={setChildrenData}
                      setChildrenExtraData={setChildrenExtraData}
                    />
                  </div>
                </div>
              </div>
            );
          })}
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
      <div className="mt-4 ">
        <table className="table table-bordered  table-hover rounded mb-4">
          <thead className="bg-secondary text-white">
            <tr className="row">
              <th className="col-lg-4">Claude Response</th>
              <th className="col-lg-4">Open AI Response</th>
              <th className="col-lg-4">Gemini Response</th>
            </tr>
          </thead>
          <tbody>
            <tr className="row mb-4">
              <td className="col-lg-4">
                {response?.claudeResponse
                  ? JSON?.parse(response?.claudeResponse)?.content?.map(
                      (choice) => {
                        return choice?.text
                          ?.split(/\d+\./)
                          ?.filter(Boolean)
                          ?.map((para, index) => {
                            return (
                              <div key={index}>
                                <p>
                                  {index + 1}. {para?.trim() || "null"}
                                </p>
                              </div>
                            );
                          });
                      }
                    )
                  : "null"}
                {response?.claudeResponse && (
                  <div>
                    <hr />
                    <h5 className="heading">Tokens:</h5>
                    <div className="row">
                      <p className="col-lg-3">Input Tokens:</p>
                      <p className="col-lg-1">
                        {
                          JSON?.parse(response?.claudeResponse)?.usage
                            ?.input_tokens
                        }
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-lg-4">Output Tokens:</p>
                      <p className="col-lg-1">
                        {
                          JSON?.parse(response?.claudeResponse)?.usage
                            ?.output_tokens
                        }
                      </p>
                    </div>
                  </div>
                )}
              </td>
              <td className="col-lg-4">
                {response?.openAiResponse
                  ? JSON?.parse(response?.openAiResponse)?.choices?.map(
                      (choice) => {
                        return choice?.message?.content
                          ?.split(/\d+\./)
                          ?.filter(Boolean)
                          ?.map((para, index) => {
                            return (
                              <div key={index}>
                                <p>
                                  {index + 1}. {para?.trim() || "null"}
                                </p>
                              </div>
                            );
                          });
                      }
                    )
                  : "null"}
                {response?.openAiResponse && (
                  <div>
                    <hr />
                    <h5 className="heading">Tokens:</h5>
                    <div className="row">
                      <p className="col-lg-4">Prompt Tokens:</p>
                      <p className="col-lg-1">
                        {
                          JSON?.parse(response?.openAiResponse)?.usage
                            ?.prompt_tokens
                        }
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-lg-4">Completion Tokens:</p>
                      <p className="col-lg-1">
                        {
                          JSON?.parse(response?.openAiResponse)?.usage
                            ?.completion_tokens
                        }
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-lg-4">Total Tokens:</p>
                      <p className="col-lg-1">
                        {
                          JSON?.parse(response?.openAiResponse)?.usage
                            ?.total_tokens
                        }
                      </p>
                    </div>
                  </div>
                )}
              </td>
              <td className="col-lg-4">
                {(() => {
                  try {
                    const parsedResponse = JSON?.parse(
                      response?.geminiResponse
                    );
                    return (
                      parsedResponse?.candidates[0]?.content?.parts?.map(
                        (choice) => {
                          return choice?.text
                            ?.split(/\d+\./)
                            ?.filter(Boolean)
                            ?.map((para, index) => {
                              return (
                                <div key={index}>
                                  <p>
                                    {index + 1}. {para?.trim() || "null"}
                                  </p>
                                </div>
                              );
                            });
                        }
                      ) || "N/A"
                    );
                  } catch (error) {
                    return "Error parsing JSON";
                  }
                })()}

                {response?.geminiResponse && (
                  <div>
                    <hr />
                    <h5 className="heading">Tokens:</h5>
                    <div className="row">
                      <p className="col-lg-4">Prompt Tokens:</p>
                      <p className="col-lg-1">
                        {(() => {
                          try {
                            const parsedResponse = JSON?.parse(
                              response?.geminiResponse
                            );
                            return (
                              parsedResponse?.usageMetadata?.promptTokenCount ||
                              "N/A"
                            );
                          } catch (error) {
                            return "Error parsing JSON";
                          }
                        })()}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-lg-4">Candidate Tokens:</p>
                      <p className="col-lg-1">
                        {(() => {
                          try {
                            const parsedResponse = JSON?.parse(
                              response?.candidatesTokenCount
                            );
                            return (
                              parsedResponse?.usageMetadata
                                ?.candidatesTokenCount || "N/A"
                            );
                          } catch (error) {
                            return "Error parsing JSON";
                          }
                        })()}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-lg-4">Total Tokens:</p>
                      <p className="col-lg-1">
                        {(() => {
                          try {
                            const parsedResponse = JSON?.parse(
                              response?.totalTokenCount
                            );
                            return (
                              parsedResponse?.usageMetadata?.totalTokenCount ||
                              "N/A"
                            );
                          } catch (error) {
                            return "Error parsing JSON";
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainForm;
