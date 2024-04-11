import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  setupAddVariation,
  resetVariations,
} from "../../../global-redux/reducers/variations/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditVariationDialogForm from "./edit-variation/EditVariationDialogForm";
import { setupGetAllExperienceWithOutParams } from "../../../global-redux/reducers/experiences/slice";
import { setupGetAllProviderWithOutParams } from "../../../global-redux/reducers/providers/slice";

const DuplicateVariationDialog = ({
  setShowDuplicateDialog,
  selectedVaraition,
}) => {
  const dispatch = useDispatch();
  const [link, setLink] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [providers, setProviders] = React.useState([]);
  const [experienceChange, setExperienceChange] = React.useState(false);

  // Input Refs
  const priceRef = React.useRef(null);
  const durationRef = React.useRef(null);
  const availableTimeRef = React.useRef(null);
  const linkRef = React.useRef(null);
  const keywordRef = React.useRef(null);

  const { variationAddSuccess, loading } = useSelector(
    (state) => state?.variations
  );
  const { allExperience } = useSelector((state) => state.experiences);
  const { allProvider } = useSelector((state) => state.providers);
  let initialValues = {
    title: "",
    xpAddress: "",
    experienceId: "",
    description: "",
    termsAndConditions: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
        const filteredProvidersArray = allProvider?.filter((item) =>
          providers?.map((singleItem) => singleItem?.id)?.includes(item?.id)
        );
        dispatch(
          setupAddVariation([
            {
              ...values,
              providers:
                filteredProvidersArray?.map((item) => {
                  return {
                    providerId: item?.id,
                    providerName: item?.name,
                  };
                }) || [],
              links:
                links?.map((item) => {
                  return item.link;
                }) || [],
              storyLineKeywords:
                keywords.map((item) => {
                  return item?.name;
                }) || [],
              price:
                prices?.map((item) => {
                  return item.price;
                }) || [],
              duration:
                durations?.map((item) => {
                  return item.duration;
                }) || [],
              availableTime:
                avialableTimes?.map((item) => {
                  return item.time;
                }) || [],
            },
          ])
        );
      }
    },
  });

  function handleAddLink(event) {
    event.preventDefault();
    if (link === "") {
      toast.error("Provide Link");
    }
    if (linkRef.current) {
      linkRef.current.focus();
    }
    if (link !== "") {
      setLinks([...links, { id: uuidv4(), link }]);
      setLink("");
    }
  }
  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleAddPrice(event) {
    event.preventDefault();
    if (price === "") {
      toast.error("Provide Price");
    }
    if (priceRef.current) {
      priceRef.current.focus();
    }
    if (price !== "") {
      setPrices([...prices, { id: uuidv4(), price }]);
      setPrice("");
    }
  }
  function handleDeletePrice(id) {
    setPrices((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleAddDuration(event) {
    event.preventDefault();
    if (duration === "") {
      toast.error("Provide Duration");
    }
    if (durationRef.current) {
      durationRef.current.focus();
    }
    if (duration !== "") {
      setDurations([...durations, { id: uuidv4(), duration }]);
      setDuration("");
    }
  }
  function handleDeleteDuration(id) {
    setDurations((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }
  function handleAddAvailableTime(event) {
    event.preventDefault();
    if (availableTime === "") {
      toast.error("Provide Available Time");
    }
    if (availableTimeRef.current) {
      availableTimeRef.current.focus();
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

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowDuplicateDialog(false);
  }

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }
  function handleChangeTermsAndConditions(value) {
    formik.resetForm({
      values: { ...formik.values, termsAndConditions: value },
    });
  }

  function handleAddKeyword(event) {
    event.preventDefault();
    if (keyword === "") {
      toast.error("Provide Keyword");
    }
    if (keywordRef.current) {
      keywordRef.current.focus();
    }
    if (keyword !== "") {
      setKeywords([...keywords, { id: uuidv4(), name: keyword }]);
      setKeyword("");
    }
  }

  function handleDeleteKeyword(id) {
    setKeywords((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  React.useEffect(() => {
    if (variationAddSuccess) {
      toast.success("Variation Duplicated Successfully");
      dispatch(resetVariations());
      formik.resetForm({ values: initialValues });
      setShowDuplicateDialog(false);
    }
  }, [variationAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllProviderWithOutParams());
  }, []);

  React.useEffect(() => {
    if (formik?.values?.experienceId && formik?.values?.experienceId !== "") {
      let selectedExperience = allExperience?.find(
        (exp) => exp?.id === formik?.values?.experienceId
      );
      if (
        selectedExperience?.price &&
        selectedExperience?.price?.length !== 0
      ) {
        setPrices(
          selectedExperience?.price?.map((singleItem) => {
            return {
              id: uuidv4(),
              price: singleItem,
            };
          })
        );
      }
      if (
        !selectedExperience?.price ||
        selectedExperience?.price?.length === 0
      ) {
        setPrices([]);
      }
      if (
        selectedExperience?.duration &&
        selectedExperience?.duration?.length !== 0
      ) {
        setDurations(
          selectedExperience?.duration?.map((singleItem) => {
            return {
              id: uuidv4(),
              duration: singleItem,
            };
          })
        );
      }
      if (
        !selectedExperience?.duration ||
        selectedExperience?.duration?.length === 0
      ) {
        setDurations([]);
      }
    }
  }, [experienceChange]);

  React.useEffect(() => {
    if (Object.keys(selectedVaraition)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          title: selectedVaraition?.title,
          xpAddress: selectedVaraition?.xpAddress,
          experienceId: selectedVaraition?.experienceId,
          description: selectedVaraition?.description,
          termsAndConditions: selectedVaraition?.termsAndConditions,
        },
      });

      setPrices(
        selectedVaraition?.price?.map((singleItem) => {
          return {
            id: uuidv4(),
            price: singleItem,
          };
        })
      );
      setDurations(
        selectedVaraition?.duration?.map((singleItem) => {
          return {
            id: uuidv4(),
            duration: singleItem,
          };
        })
      );
      setKeywords(
        selectedVaraition?.storyLineKeywords?.map((singleItem) => {
          return {
            id: uuidv4(),
            name: singleItem,
          };
        })
      );
      setAvailableTimes(
        selectedVaraition?.availableTime?.map((singleItem) => {
          return {
            id: uuidv4(),
            time: singleItem,
          };
        })
      );
      setLinks(
        selectedVaraition?.links?.map((singleItem) => {
          return {
            id: uuidv4(),
            link: singleItem,
          };
        })
      );
      if (
        selectedVaraition?.providers &&
        selectedVaraition?.providers?.length !== 0
      ) {
        setProviders(
          selectedVaraition?.providers?.map((all) => {
            return {
              title: all?.providerName,
              id: all?.providerId,
            };
          })
        );
      }
    }
  }, [selectedVaraition]);

  return (
    <EditVariationDialogForm
      duplicate={true}
      formik={formik}
      handleClose={handleClose}
      loading={loading}
      link={link}
      setLink={setLink}
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
      priceRef={priceRef}
      durationRef={durationRef}
      availableTimeRef={availableTimeRef}
      linkRef={linkRef}
      allExperience={allExperience}
      allProvider={allProvider}
      handleAddKeyword={handleAddKeyword}
      handleDeleteKeyword={handleDeleteKeyword}
      keywordRef={keywordRef}
      keyword={keyword}
      keywords={keywords}
      setKeyword={setKeyword}
      handleChangeDescription={handleChangeDescription}
      handleChangeTermsAndConditions={handleChangeTermsAndConditions}
      providers={providers}
      setProviders={setProviders}
      selectedVaraition={selectedVaraition}
      setExperienceChange={setExperienceChange}
    />
  );
};

export default DuplicateVariationDialog;
