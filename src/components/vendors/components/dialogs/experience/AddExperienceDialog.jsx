import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddExperience } from "../../../../../global-redux/reducers/experiences/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ExperienceDialogForm from "./ExperienceDialogForm";

const AddExperienceDialog = ({
  setShowAddExperienceDialog,
  currentVendorId,
}) => {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState([]);
  const [experienceName, setExperienceName] = React.useState("");
  const [why, setWhy] = React.useState("");
  const [link, setLink] = React.useState("");
  const [linkExplanation, setLinkExplanation] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [linksWithOtherExperinces, setLinksWithOtherExperiences] =
    React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);

  const { experienceAddSuccess, loading } = useSelector(
    (state) => state?.experiences
  );
  let initialValues = {
    title: "",
    address: "",
    description: "",
    termsAndConditions: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Please provide description"),
    termsAndConditions: Yup.string().required(
      "Please provide Terms And Conditions"
    ),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
        if (keywords.length === 0) {
          toast.error("Provide keywords");
        }
        if (linksWithOtherExperinces.length === 0) {
          toast.error("Provide Link With Other Experience");
        }
        if (links?.length === 0) {
          toast.error("Provide Links");
        }
        if (prices?.length === 0) {
          toast.error("Provide Prices");
        }
        if (durations?.length === 0) {
          toast.error("Provide Durations");
        }
        if (avialableTimes?.length === 0) {
          toast.error("Provide Available Times");
        }
        if (
          keywords.length !== 0 &&
          linksWithOtherExperinces?.length !== 0 &&
          links?.length !== 0 &&
          prices?.length !== 0 &&
          durations?.length !== 0 &&
          avialableTimes?.length !== 0
        ) {
          dispatch(
            setupAddExperience([
              {
                ...values,
                vendorId: currentVendorId,
                links: links?.map((item) => {
                  return {
                    link: item.link,
                    explanation: item.linkExplanation,
                  };
                }),
                linkWithOtherExperience: linksWithOtherExperinces?.map(
                  (item) => {
                    return {
                      experienceName: item?.experienceName,
                      why: item.why,
                    };
                  }
                ),
                storyLineKeywords: keywords.map((item) => {
                  return item?.name;
                }),
                price: prices?.map((item) => {
                  return item.price;
                }),
                duration: durations?.map((item) => {
                  return item.duration;
                }),
                availableTime: avialableTimes?.map((item) => {
                  return item.time;
                }),
              },
            ])
          );
        }
      }
    },
  });

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }
  function handleChangeTermsAndConditions(value) {
    formik.resetForm({
      values: { ...formik.values, termsAndConditions: value },
    });
  }

  function handleAddPrice() {
    if (price === "") {
      toast.error("Provide Price");
    }
    if (price !== "") {
      setPrices([...prices, { id: uuidv4(), price }]);
      setPrice("");
    }
  }
  function handleDeletePrice(id) {
    setPrices((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleAddDuration() {
    if (duration === "") {
      toast.error("Provide Duration");
    }
    if (duration !== "") {
      setDurations([...durations, { id: uuidv4(), duration }]);
      setDuration("");
    }
  }
  function handleDeleteDuration(id) {
    setDurations((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleAddAvailableTime() {
    if (availableTime === "") {
      toast.error("Provide Available Time");
    }
    if (availableTime !== "") {
      setAvailableTimes([
        ...avialableTimes,
        { id: uuidv4(), time: availableTime },
      ]);
      setAvailableTime("");
    }
  }
  function handleDeleteAvailableTime(id) {
    setAvailableTimes((pre) =>
      pre?.filter((singleItem) => singleItem?.id !== id)
    );
  }

  function handleAddKeyword() {
    if (keyword === "") {
      toast.error("Provide Keyword");
    }
    if (keyword !== "") {
      setKeywords([...keywords, { id: uuidv4(), name: keyword }]);
      setKeyword("");
    }
  }

  function handleAddLinkWithOtherExperience() {
    if (experienceName === "" || why === "") {
      toast.error("Provide Both Values");
    }
    if (experienceName !== "" && why !== "") {
      setLinksWithOtherExperiences([
        ...linksWithOtherExperinces,
        { id: uuidv4(), experienceName, why },
      ]);
      setExperienceName("");
      setWhy("");
    }
  }

  function handleAddLink() {
    if (link === "" || linkExplanation === "") {
      toast.error("Provide Both Values");
    }
    if (link !== "" && linkExplanation !== "") {
      setLinks([...links, { id: uuidv4(), link, linkExplanation }]);
      setLink("");
      setLinkExplanation("");
    }
  }

  function handleDeleteKeyword(id) {
    setKeywords((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleDeleteLinkWithOtherExperience(id) {
    setLinksWithOtherExperiences((pre) =>
      pre?.filter((singleItem) => singleItem?.id !== id)
    );
  }
  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowAddExperienceDialog(false);
  }

  React.useEffect(() => {
    if (experienceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowAddExperienceDialog(false);
    }
  }, [experienceAddSuccess]);

  return (
    <ExperienceDialogForm
      formik={formik}
      keyword={keyword}
      setKeyword={setKeyword}
      handleAddKeyword={handleAddKeyword}
      handleDeleteKeyword={handleDeleteKeyword}
      experienceName={experienceName}
      setExperienceName={setExperienceName}
      why={why}
      setWhy={setWhy}
      handleAddLinkWithOtherExperience={handleAddLinkWithOtherExperience}
      handleClose={handleClose}
      loading={loading}
      handleChangeDescription={handleChangeDescription}
      handleChangeTermsAndConditions={handleChangeTermsAndConditions}
      keywords={keywords}
      linksWithOtherExperinces={linksWithOtherExperinces}
      handleDeleteLinkWithOtherExperience={handleDeleteLinkWithOtherExperience}
      link={link}
      setLink={setLink}
      linkExplanation={linkExplanation}
      setLinkExplanation={setLinkExplanation}
      links={links}
      handleAddLink={handleAddLink}
      handleDeleteLink={handleDeleteLink}
      price={price}
      setPrice={setPrice}
      handleAddPrice={handleAddPrice}
      handleDeletePrice={handleDeletePrice}
      prices={prices}
      duration={duration}
      setDuration={setDuration}
      handleAddDuration={handleAddDuration}
      handleDeleteDuration={handleDeleteDuration}
      durations={durations}
      availableTime={availableTime}
      setAvailableTime={setAvailableTime}
      handleAddAvailableTime={handleAddAvailableTime}
      handleDeleteAvailableTime={handleDeleteAvailableTime}
      avialableTimes={avialableTimes}
    />
  );
};

export default AddExperienceDialog;
