import React from "react";
import PrincipleCustomer from "./principal-customer/PrincipleCustomer";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { setupRunCombinationPipeline } from "../../../global-redux/reducers/onBoard/slice";
import { useSelector, useDispatch } from "react-redux";
import FirstDialog from "./pairs-dialog";

/* ──────────────────────────────────────────────────────────────
   Helpers (pure): keep them outside the component so they don't
   get recreated on every render.
   ────────────────────────────────────────────────────────────── */

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return 0;
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  return age === 0 ? 1 : age;
};

const calculateUpcomingBirthday = (dateOfBirth) => {
  if (!dateOfBirth) return "";
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const currentYear = today.getFullYear();
  const upcomingBirthday = new Date(
    currentYear,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (upcomingBirthday < today) upcomingBirthday.setFullYear(currentYear + 1);
  const timeDiff = upcomingBirthday.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const monthsDiff = Math.floor(daysDiff / 30);
  if (monthsDiff === 0) return "this month";
  if (monthsDiff === 1) return "next month";
  return `in ${monthsDiff} months`;
};

/* Initial state builders (wrapped as functions so useState calls them once) */
const createInitialCustomer = () => ({
  id: uuidv4(),
  principalCustomer: {
    id: uuidv4(),
    firstName: "Ricardo",
    lastName: "Arauja",
    dateOfBirth: "1978-07-20",
    placeOfBirth: "Bogotá",
    cityOfResidence: "Paris",
    email: "ricardoarauja@ariodante.uk",
    gender: "Male",
    phoneNumber: "+33768897772",
    nationality: "Colombian",
    mainInterests: [
      { id: "1", string: "Arts" },
      { id: "2", string: "Opera" },
      { id: "3", string: "Castles" },
      // { id: "4", string: "Legends" },
      // { id: "5", string: "Rock Art" },
      // { id: "6", string: "Immersive Games" },
      // { id: "7", string: "AI" },
      // { id: "8", string: "wildlife" },
    ],
    passions: [
      { id: "1", string: "Music" },
      { id: "2", string: "History" },
      { id: "3", string: "Culture" },
      { id: "4", string: "Modern Art" },
    ],
    lifestyle: [{ id: "1", string: "Easygoing" }],
    travelBucketList: [
      { id: "1", string: "Swimming with whales" },
      { id: "2", string: "the legend of King Arthur" },
    ],
    typeOfTravel: [],
  },
});

const createInitialExtraData = () => ({
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

const MainForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.onBoard);

  const [showResponseDialog, setShowResponseDialog] = React.useState(false);
  const [data, setData] = React.useState(() => [createInitialCustomer()]);
  const [extraData, setExtraData] = React.useState(createInitialExtraData);

  /* ────────────────────────────────────────────────────────────
     Handlers (memoized): keep stable references for children.
     ──────────────────────────────────────────────────────────── */

  const handleChangeExtraDataText = React.useCallback((family, event) => {
    const { name, value } = event.target;
    setExtraData((prev) => ({
      ...prev,
      [family]: {
        ...prev[family],
        [name]: value,
      },
    }));
  }, []);

  const handleChangeText = React.useCallback((family, event, id) => {
    const { name, value } = event.target;
    setData((prev) =>
      prev.map((all) =>
        all.id === id
          ? {
            ...all,
            [family]: {
              ...all[family],
              [name]: value,
            },
          }
          : all
      )
    );
  }, []);

  const handleAdd = React.useCallback(
    (family, subFamily, extraFieldFamily, event, id) => {
      event?.preventDefault();

      const value = extraData?.[family]?.[extraFieldFamily]?.trim?.() ?? "";
      if (!value) {
        toast.error(`Provide ${extraFieldFamily}`);
        return;
      }

      setData((prev) =>
        prev.map((all) =>
          all.id === id
            ? {
              ...all,
              [family]: {
                ...all[family],
                [subFamily]: [
                  ...(all[family][subFamily] || []),
                  { id: uuidv4(), string: value },
                ],
              },
            }
            : all
        )
      );

      setExtraData((prev) => ({
        ...prev,
        [family]: {
          ...prev[family],
          [extraFieldFamily]: "",
        },
      }));
    },
    [extraData]
  );

  const handleDelete = React.useCallback((family, subFamily, id, mainId) => {
    setData((prev) =>
      prev.map((all) =>
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

  const handleSubmit = React.useCallback(async () => {
    if (loading) return;

    const main = data[0]?.principalCustomer || {};
    const obj = {
      id: data[0]?.id,
      mainUser: {
        ...main,
        mainInterests: (main?.mainInterests || []).map((i) => i?.string),
        passions: (main?.passions || []).map((p) => p?.string),
      },
    };

    toast.info("🧩 Generating combinations... this may take up to 2 minutes");


    try {
      const resultAction = await dispatch(
        setupRunCombinationPipeline({
          interests: obj.mainUser.mainInterests,
          passions: obj.mainUser.passions,
        })
      );

      if (setupRunCombinationPipeline.fulfilled.match(resultAction)) {
        setShowResponseDialog(true);
        toast.success("✅ Data processed successfully!");
      } else {
        toast.error("Failed to run combination pipeline");
      }
    } catch (_err) {
      toast.error("Something went wrong");
    }
  }, [data, dispatch, loading]);


  /* Derived flags */
  const submitBtnClass = React.useMemo(
    () =>
      `btn btn-labeled btn-primary px-3 shadow my-4${loading ? " disabled" : ""}`,
    [loading]
  );

  return (
    <div className="my-4">
      {showResponseDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <FirstDialog setShowResponseDialog={setShowResponseDialog} />
          </div>
        </div>
      )}

      <h5 className="link-info cursor-pointer">OnBoarding</h5>
      <hr />

      <div className="accordion" id="accordionFlushExample">
        {data?.length === 0 ? (
          <p>No Principal Customer Added Yet!</p>
        ) : (
          data.map((singleDataItem, index) => {
            const isFirst = index === 0;
            const collapseId = `flush-collapse-${singleDataItem.id || index}`;
            const buttonClass = `accordion-button${isFirst ? " collapsed" : ""} br-8`;
            const collapseClass = `accordion-collapse collapse${isFirst ? " show" : ""
              }`;

            return (
              <div className="accordion-item" key={singleDataItem.id || index}>
                <h2 className="accordion-header">
                  <button
                    className={buttonClass}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={isFirst ? "true" : "false"}
                    aria-controls={collapseId}
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
                  id={collapseId}
                  className={collapseClass}
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
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div>
        <button
          type="button"
          className={submitBtnClass}
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading ? "true" : "false"}
        >
          <span className="btn-label me-2">
            <i className="fa fa-check-circle f-18"></i>
          </span>
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MainForm;
