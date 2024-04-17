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
      phoneNumber: "",
      nationality: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
    },
    children: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      cityOfResidence: "",
      email: "",
      phoneNumber: "",
      nationality: "",
      mainInterests: [],
      socialMediaLinks: [],
      loyaltyPrograms: [],
      travelDocuments: [],
    },
  });

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
    children: {
      interest: "",
      link: "",
      program: "",
      doc: "",
    },
  });

  function handleSubmit() {
    if (!loading) {
      dispatch(
        setupOnBoarding({
          principalCustomer: {
            ...data?.principalCustomer,
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
            mainInterests:
              data?.spouse?.mainInterests?.map((item) => item?.string) || [],
            socialMediaLinks:
              data?.spouse?.socialMediaLinks?.map((item) => item?.string) || [],
            loyaltyPrograms:
              data?.spouse?.loyaltyPrograms?.map((item) => item?.string) || [],
            travelDocuments:
              data?.spouse?.travelDocuments?.map((item) => item?.string) || [],
          },
          children: [
            {
              ...data?.children,
              mainInterests:
                data?.children?.mainInterests?.map((item) => item?.string) ||
                [],
              socialMediaLinks:
                data?.children?.socialMediaLinks?.map((item) => item?.string) ||
                [],
              loyaltyPrograms:
                data?.children?.loyaltyPrograms?.map((item) => item?.string) ||
                [],
              travelDocuments:
                data?.children?.travelDocuments?.map((item) => item?.string) ||
                [],
            },
          ],
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
    if (extraData[family].interest === "") {
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
    if (extraData[family].link === "") {
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
    if (extraData[family].program === "") {
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
    if (extraData[family].doc === "") {
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
        <Children
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
      <div className="mt-4">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
            },
          }}
        >
          <Paper elevation={3} className="p-2 w-100">
            <h1 className="heading">Responses:</h1>
            <hr />
            <h2 className="heading">Claude Response</h2>
            <p>
              {response?.claudeResponse
                ? JSON?.parse(response?.claudeResponse)?.choices?.map(
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
            </p>

            <h2 className="heading">Open AI Response</h2>
            <p>
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
            </p>
            <h2 className="heading">Gemini Response</h2>
            <p>
              {response?.geminiResponse
                ? JSON?.parse(response?.geminiResponse)?.choices?.map(
                    (choice) => {
                      return choice?.message?.content
                        ?.split(/\d+\./)
                        ?.filter(Boolean)
                        ?.map((para, index) => {
                          return (
                            <div key={index}>
                              <p>
                                {index + 1}.{para?.trim()}
                              </p>
                            </div>
                          );
                        });
                    }
                  )
                : "null"}
            </p>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default MainForm;
