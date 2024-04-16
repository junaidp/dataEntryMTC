import React from "react";
import PrincipleCustomer from "./PrincipleCustomer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const MainForm = () => {
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
    children: [
      {
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
    ],
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

  function handleChangeExtraDataText(family, event) {
    if (family === "principalCustomer") {
      setExtraData((pre) => {
        return {
          ...pre,
          principalCustomer: {
            ...pre?.principalCustomer,
            [event?.target?.name]: event?.target?.value,
          },
        };
      });
    }
  }

  function handleChangeText(family) {
    if (family === "principalCustomer") {
      setData((pre) => {
        return {
          ...pre,
          principalCustomer: {
            ...pre?.principalCustomer,
            [event?.target?.name]: event?.target?.value,
          },
        };
      });
    }
  }

  function handleAddInterest(family, event) {
    if (event) {
      event.preventDefault();
    }
    if (family === "principalCustomer") {
      if (extraData?.principalCustomer?.interest === "") {
        toast.error("Provide Interest");
      } else {
        setData((pre) => {
          return {
            ...pre,
            principalCustomer: {
              ...pre?.principalCustomer,
              mainInterests: [
                ...pre?.principalCustomer?.mainInterests,
                {
                  id: uuidv4(),
                  string: extraData?.principalCustomer?.interest,
                },
              ],
            },
          };
        });
        setExtraData((pre) => {
          return {
            ...pre,
            principalCustomer: {
              ...pre?.principalCustomer,
              interest: "",
            },
          };
        });
      }
    }
  }

  function handleDeleteInterest(family, id) {
    if (family === "principalCustomer") {
      setData((pre) => {
        return {
          ...pre,
          principalCustomer: {
            ...pre?.principalCustomer,
            mainInterests: pre?.principalCustomer?.mainInterests?.filter(
              (all) => all?.id !== id
            ),
          },
        };
      });
    }
    if (family === "spouse") {
      setData((pre) => {
        return {
          ...pre,
          spouse: {
            ...pre?.spouse,
            mainInterests: pre?.spouse?.mainInterests?.filter(
              (all) => all?.id !== id
            ),
          },
        };
      });
    }
    if (family === "children") {
      setData((pre) => {
        return {
          ...pre,
          children: {
            ...pre?.children,
            mainInterests: pre?.children?.mainInterests?.filter(
              (all) => all?.id !== id
            ),
          },
        };
      });
    }
  }

  console.log(extraData?.principalCustomer?.interest);

  return (
    <div className="mt-4">
      <PrincipleCustomer
        data={data}
        handleChangeText={handleChangeText}
        extraData={extraData}
        handleChangeExtraDataText={handleChangeExtraDataText}
        handleAddInterest={handleAddInterest}
        handleDeleteInterest={handleDeleteInterest}
      />
    </div>
  );
};

export default MainForm;
