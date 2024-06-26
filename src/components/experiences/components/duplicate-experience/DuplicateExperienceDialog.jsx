import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddDuplicateExperience } from "../../../../global-redux/reducers/experiences/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ExperienceDialogForm from "./DuplicateExperienceDialogForm";

const DuplicateExperienceDialog = ({
  setShowDuplicateDialog,
  selectedExperience,
  duplicateOptions,
  setDuplicateOptions,
  duplicateVariations,
  setDuplicateVariations,
}) => {
  const dispatch = useDispatch();
  const { allOptions } = useSelector((state) => state?.options);
  const { allVariations } = useSelector((state) => state?.variations);
  const { allExperience } = useSelector((state) => state.experiences);
  const { allProvider } = useSelector((state) => state.providers);
  const { allVendors } = useSelector((state) => state.vendors);
  const { allService } = useSelector((state) => state.services);
  const [experience, setExperiences] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [link, setLink] = React.useState("");
  const [linkExplanation, setLinkExplanation] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);
  const [experienceWhy, setExperienceWhy] = React.useState("");
  const [linkWithOtherExperiences, setLinkWithOtherExperiences] =
    React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [serviceWhy, setServiceWhy] = React.useState("");
  const [linkWithOtherServices, setLinkWithOtherServices] = React.useState([]);
  const [resetExperienceMultiSelect, setResetExperienceMultiSelect] =
    React.useState(false);
  const [resetServiceMultiSelect, setResetServiceMultiSelect] =
    React.useState(false);

  // Input Refs
  const priceRef = React.useRef(null);
  const durationRef = React.useRef(null);
  const availableTimeRef = React.useRef(null);
  const keywordRef = React.useRef(null);
  const linkRef = React.useRef(null);
  const whyRef = React.useRef(null);
  const serviceWhyRef = React.useRef(null);

  const { duplicateExperienceAddSuccess, loading } = useSelector(
    (state) => state?.experiences
  );
  let initialValues = {
    title: "",
    address: "",
    description: "",
    termsAndConditions: "",
    vendorId: "",
    memberShip: "",
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
          setupAddDuplicateExperience([
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
                  return {
                    link: item.link,
                    explanation: item.linkExplanation,
                  };
                }) || [],
              linkWithOtherExperience:
                linkWithOtherExperiences?.map((item) => {
                  return {
                    experienceId: item?.experienceId,
                    experienceName: item?.experienceName,
                    why: item?.why,
                  };
                }) || [],
              linkWithOtherService:
                linkWithOtherServices?.map((item) => {
                  return {
                    serviceId: item?.serviceId,
                    serviceName: item?.serviceName,
                    why: item?.why,
                  };
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

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }
  function handleChangeTermsAndConditions(value) {
    formik.resetForm({
      values: { ...formik.values, termsAndConditions: value },
    });
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

  function handleAddLink(event) {
    event.preventDefault();
    if (link === "" || linkExplanation === "") {
      toast.error("Provide Both Values");
    }
    if (linkRef.current) {
      linkRef.current.focus();
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

  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowDuplicateDialog(false);
  }

  function handleAddExperience(event) {
    event.preventDefault();
    if (whyRef.current) {
      whyRef.current.focus();
    }
    if (experience?.length !== 0 && experienceWhy !== "") {
      let filteredArray = allExperience.filter((item) =>
        experience.includes(item?.title)
      );
      let finalArray = [
        ...linkWithOtherExperiences,
        ...filteredArray?.map((all) => {
          return {
            experienceId: all?.id,
            experienceName: all?.title,
            why: experienceWhy,
            id: uuidv4(),
          };
        }),
      ];
      setResetExperienceMultiSelect(true);
      setLinkWithOtherExperiences(finalArray);
      setExperienceWhy("");
      setExperiences([]);
    }
  }

  function handleDeleteLinkWithOtherExperience(id) {
    setLinkWithOtherExperiences((pre) =>
      pre?.filter((singleItem) => singleItem?.id !== id)
    );
  }

  function handleAddService(event) {
    event.preventDefault();
    if (serviceWhyRef.current) {
      serviceWhyRef.current.focus();
    }
    if (services?.length !== 0 && serviceWhy !== "") {
      let filteredArray = allService.filter((item) =>
        services.includes(item?.title)
      );
      let finalArray = [
        ...linkWithOtherServices,
        ...filteredArray?.map((all) => {
          return {
            serviceId: all?.id,
            serviceName: all?.title,
            why: serviceWhy,
            id: uuidv4(),
          };
        }),
      ];
      setResetServiceMultiSelect(true);
      setLinkWithOtherServices(finalArray);
      setServiceWhy("");
      setServices([]);
    }
  }

  function handleDeleteLinkWithOtherServices(id) {
    setLinkWithOtherServices((pre) =>
      pre?.filter((singleItem) => singleItem?.id !== id)
    );
  }

  React.useEffect(() => {
    if (duplicateExperienceAddSuccess) {
      setShowDuplicateDialog(false);
      formik.resetForm({ values: initialValues });
      toast.success("Experience Duplicated Successfully");
    }
  }, [duplicateExperienceAddSuccess]);

  React.useEffect(() => {
    if (Object.keys(selectedExperience)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          title: selectedExperience?.title,
          address: selectedExperience?.address,
          description: selectedExperience?.description,
          termsAndConditions: selectedExperience?.termsAndConditions,
          vendorId: selectedExperience?.vendorId,
          memberShip: selectedExperience?.memberShip,
        },
      });

      setPrices(
        selectedExperience?.price?.map((singleItem) => {
          return {
            id: uuidv4(),
            price: singleItem,
          };
        })
      );
      setDurations(
        selectedExperience?.duration?.map((singleItem) => {
          return {
            id: uuidv4(),
            duration: singleItem,
          };
        })
      );
      setAvailableTimes(
        selectedExperience?.availableTime?.map((singleItem) => {
          return {
            id: uuidv4(),
            time: singleItem,
          };
        })
      );
      setLinks(
        selectedExperience?.links?.map((singleItem) => {
          return {
            id: uuidv4(),
            link: singleItem?.link,
            linkExplanation: singleItem?.explanation,
          };
        })
      );
      setKeywords(
        selectedExperience?.storyLineKeywords?.map((singleItem) => {
          return {
            id: uuidv4(),
            name: singleItem,
          };
        })
      );
      if (selectedExperience?.linkWithOtherExperience) {
        setLinkWithOtherExperiences(
          selectedExperience?.linkWithOtherExperience?.map((singleItem) => {
            return {
              experienceId: singleItem?.experienceId,
              experienceName: singleItem?.experienceName,
              why: singleItem?.why,
              id: uuidv4(),
            };
          })
        );
      }
      if (selectedExperience?.linkWithOtherService) {
        setLinkWithOtherServices(
          selectedExperience?.linkWithOtherService?.map((singleItem) => {
            return {
              serviceId: singleItem?.serviceId,
              serviceName: singleItem?.serviceName,
              why: singleItem?.why,
              id: uuidv4(),
            };
          })
        );
      }
      if (
        selectedExperience?.providers &&
        selectedExperience?.providers?.length !== 0
      ) {
        setProviders(
          selectedExperience?.providers?.map((all) => {
            return {
              title: all?.providerName,
              id: all?.providerId,
            };
          })
        );
      }
    }
  }, [selectedExperience]);

  React.useEffect(() => {
    if (allOptions && allOptions?.length !== 0) {
      setDuplicateOptions(allOptions);
    }
    if (!allOptions || allOptions?.length === 0) {
      setDuplicateOptions([]);
    }
    if (allVariations && allVariations?.length !== 0) {
      setDuplicateVariations(allVariations);
    }
    if (!allVariations || allVariations?.length === 0) {
      setDuplicateVariations([]);
    }
  }, []);

  return (
    <ExperienceDialogForm
      duplicate={true}
      formik={formik}
      keyword={keyword}
      setKeyword={setKeyword}
      handleAddKeyword={handleAddKeyword}
      handleDeleteKeyword={handleDeleteKeyword}
      handleClose={handleClose}
      loading={loading}
      handleChangeDescription={handleChangeDescription}
      handleChangeTermsAndConditions={handleChangeTermsAndConditions}
      keywords={keywords}
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
      priceRef={priceRef}
      durationRef={durationRef}
      availableTimeRef={availableTimeRef}
      keywordRef={keywordRef}
      linkRef={linkRef}
      setExperiences={setExperiences}
      experience={experience}
      allExperience={allExperience}
      allProvider={allProvider}
      setExperienceWhy={setExperienceWhy}
      experienceWhy={experienceWhy}
      handleAddExperience={handleAddExperience}
      linkWithOtherExperiences={linkWithOtherExperiences}
      handleDeleteLinkWithOtherExperience={handleDeleteLinkWithOtherExperience}
      allVendors={allVendors}
      providers={providers}
      setProviders={setProviders}
      whyRef={whyRef}
      allService={allService}
      serviceWhyRef={serviceWhyRef}
      services={services}
      setServices={setServices}
      serviceWhy={serviceWhy}
      setServiceWhy={setServiceWhy}
      linkWithOtherServices={linkWithOtherServices}
      handleAddService={handleAddService}
      handleDeleteLinkWithOtherServices={handleDeleteLinkWithOtherServices}
      resetExperienceMultiSelect={resetExperienceMultiSelect}
      setResetExperienceMultiSelect={setResetExperienceMultiSelect}
      resetServiceMultiSelect={resetServiceMultiSelect}
      setResetServiceMultiSelect={setResetServiceMultiSelect}
      selectedExperience={selectedExperience}
      duplicateOptions={duplicateOptions}
      setDuplicateOptions={setDuplicateOptions}
      setDuplicateVariations={setDuplicateVariations}
      duplicateVariations={duplicateVariations}
    />
  );
};

export default DuplicateExperienceDialog;
