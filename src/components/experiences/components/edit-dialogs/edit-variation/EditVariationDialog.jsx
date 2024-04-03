import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddVariation } from "../../../../../global-redux/reducers/variations/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import EditVariationDialogForm from "./EditVariationDialogForm";
const EditVariationDialog = ({
  setShowEditVariationDialog,
  selectedVariation,
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
              id: selectedVariation?.id,
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
    setShowEditVariationDialog(false);
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
      toast.success("Variation Updated Successfully");
      formik.resetForm({ values: initialValues });
      setShowEditVariationDialog(false);
    }
  }, [variationAddSuccess]);

  React.useEffect(() => {
    if (Object.keys(selectedVariation)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          title: selectedVariation?.title,
          xpAddress: selectedVariation?.xpAddress,
          experienceId: selectedVariation?.experienceId,
          description: selectedVariation?.description,
          termsAndConditions: selectedVariation?.termsAndConditions,
        },
      });

      setPrices(
        selectedVariation?.price?.map((singleItem) => {
          return {
            id: uuidv4(),
            price: singleItem,
          };
        })
      );
      setDurations(
        selectedVariation?.duration?.map((singleItem) => {
          return {
            id: uuidv4(),
            duration: singleItem,
          };
        })
      );
      setKeywords(
        selectedVariation?.storyLineKeywords?.map((singleItem) => {
          return {
            id: uuidv4(),
            name: singleItem,
          };
        })
      );
      setAvailableTimes(
        selectedVariation?.availableTime?.map((singleItem) => {
          return {
            id: uuidv4(),
            time: singleItem,
          };
        })
      );
      setLinks(
        selectedVariation?.links?.map((singleItem) => {
          return {
            id: uuidv4(),
            link: singleItem,
          };
        })
      );
      if (
        selectedVariation?.providers &&
        selectedVariation?.providers?.length !== 0
      ) {
        setProviders(
          selectedVariation?.providers?.map((all) => {
            return {
              title: all?.providerName,
              id: all?.providerId,
            };
          })
        );
      }
    }
  }, [selectedVariation]);

  return (
    <EditVariationDialogForm
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
      selectedVariation={selectedVariation}
    />
  );
};

export default EditVariationDialog;
