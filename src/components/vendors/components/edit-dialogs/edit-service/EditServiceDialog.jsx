import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddService } from "../../../../../global-redux/reducers/services/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ServiceDialogForm from "./EditServiceDialogForm";

const EditServiceDialog = ({ setShowEditServiceDialog }) => {
  const dispatch = useDispatch();
  const { selectedService } = useSelector((state) => state.services);
  const { allService } = useSelector((state) => state.services);
  const { allProvider } = useSelector((state) => state.providers);
  const { allExperience } = useSelector((state) => state.experiences);
  const { allVendors } = useSelector((state) => state.vendors);
  const [keywords, setKeywords] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [link, setLink] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);
  const [services, setServices] = React.useState([]);
  const [serviceWhy, setServiceWhy] = React.useState("");
  const [linkWithOtherServices, setLinkWithOtherServices] = React.useState([]);
  const [providers, setProviders] = React.useState([]);
  const [experience, setExperiences] = React.useState([]);
  const [experienceWhy, setExperienceWhy] = React.useState("");
  const [linkWithOtherExperiences, setLinkWithOtherExperiences] =
    React.useState([]);
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
  const experienceWhyRef = React.useRef(null);

  const { serviceAddSuccess, loading } = useSelector(
    (state) => state?.services
  );
  let initialValues = {
    title: "",
    address: "",
    description: "",
    termsAndConditions: "",
    vendorId: "",
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
          setupAddService([
            {
              ...values,
              id: selectedService?.id,
              providers: filteredProvidersArray || [],
              links: links?.map((item) => item?.link) || [],
              linkWithOtherService:
                linkWithOtherServices?.map((item) => {
                  return {
                    serviceId: item?.serviceId,
                    serviceName: item?.serviceName,
                    why: item?.why,
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

  function handleDeleteKeyword(id) {
    setKeywords((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowEditServiceDialog(false);
  }

  function handleAddServices(event) {
    event.preventDefault();
    if (whyRef.current) {
      whyRef.current.focus();
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

  function handleAddExperience(event) {
    event.preventDefault();
    if (experienceWhyRef.current) {
      experienceWhyRef.current.focus();
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

  React.useEffect(() => {
    if (serviceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowEditServiceDialog(false);
      toast.success("Services Updated Successfully");
    }
  }, [serviceAddSuccess]);

  React.useEffect(() => {
    if (Object.keys(selectedService)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          title: selectedService?.title,
          address: selectedService?.address,
          description: selectedService?.description,
          termsAndConditions: selectedService?.termsAndConditions,
          vendorId: selectedService?.vendorId,
        },
      });

      setPrices(
        selectedService?.price?.map((singleItem) => {
          return {
            id: uuidv4(),
            price: singleItem,
          };
        })
      );
      setKeywords(
        selectedService?.storyLineKeywords?.map((key) => {
          return {
            id: uuidv4(),
            name: key,
          };
        })
      );

      setDurations(
        selectedService?.duration?.map((singleItem) => {
          return {
            id: uuidv4(),
            duration: singleItem,
          };
        })
      );
      setAvailableTimes(
        selectedService?.availableTime?.map((singleItem) => {
          return {
            id: uuidv4(),
            time: singleItem,
          };
        })
      );
      setLinks(
        selectedService?.links?.map((singleItem) => {
          return {
            id: uuidv4(),
            link: singleItem,
          };
        })
      );
      if (selectedService?.linkWithOtherService) {
        setLinkWithOtherServices(
          selectedService?.linkWithOtherService?.map((singleItem) => {
            return {
              serviceId: singleItem?.serviceId,
              serviceName: singleItem?.serviceName,
              why: singleItem?.why,
              id: uuidv4(),
            };
          })
        );
      }
      if (selectedService?.linkWithOtherExperience) {
        setLinkWithOtherExperiences(
          selectedService?.linkWithOtherExperience?.map((singleItem) => {
            return {
              experienceId: singleItem?.experienceId,
              experienceName: singleItem?.experienceName,
              why: singleItem?.why,
              id: uuidv4(),
            };
          })
        );
      }
      if (
        selectedService?.providers &&
        selectedService?.providers?.length !== 0
      ) {
        setProviders(
          selectedService?.providers?.map((all) => {
            return {
              title: all?.name,
              id: all?.id,
            };
          })
        );
      }
    }
  }, [selectedService]);

  return (
    <ServiceDialogForm
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
      setServices={setServices}
      services={services}
      allService={allService}
      allProvider={allProvider}
      setServiceWhy={setServiceWhy}
      serviceWhy={serviceWhy}
      handleAddServices={handleAddServices}
      linkWithOtherServices={linkWithOtherServices}
      handleDeleteLinkWithOtherServices={handleDeleteLinkWithOtherServices}
      allVendors={allVendors}
      providers={providers}
      setProviders={setProviders}
      whyRef={whyRef}
      setExperiences={setExperiences}
      experience={experience}
      allExperience={allExperience}
      experienceWhyRef={experienceWhyRef}
      setExperienceWhy={setExperienceWhy}
      experienceWhy={experienceWhy}
      handleAddExperience={handleAddExperience}
      linkWithOtherExperiences={linkWithOtherExperiences}
      handleDeleteLinkWithOtherExperience={handleDeleteLinkWithOtherExperience}
      resetExperienceMultiSelect={resetExperienceMultiSelect}
      setResetExperienceMultiSelect={setResetExperienceMultiSelect}
      resetServiceMultiSelect={resetServiceMultiSelect}
      setResetServiceMultiSelect={setResetServiceMultiSelect}
      selectedService={selectedService}
    />
  );
};

export default EditServiceDialog;
