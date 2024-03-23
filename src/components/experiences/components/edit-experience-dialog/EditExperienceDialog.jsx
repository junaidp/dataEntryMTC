import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddExperience } from "../../../../global-redux/reducers/experiences/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ExperienceDialogForm from "./ExperienceDialogForm";

const EditExperienceDialog = ({
  setShowEditExperienceDialog,
  selectedExperience,
}) => {
  const dispatch = useDispatch();
  const { allExperience } = useSelector((state) => state.experiences);
  const { allProvider } = useSelector((state) => state.providers);
  const { allVendors } = useSelector((state) => state.vendors);
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

  // Input Refs
  const priceRef = React.useRef(null);
  const durationRef = React.useRef(null);
  const availableTimeRef = React.useRef(null);
  const keywordRef = React.useRef(null);
  const linkRef = React.useRef(null);

  const { experienceAddSuccess, loading } = useSelector(
    (state) => state?.experiences
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
          links?.length !== 0 &&
          prices?.length !== 0 &&
          durations?.length !== 0 &&
          avialableTimes?.length !== 0
        ) {
          const filteredProvidersArray = allProvider.filter((item) =>
            providers.includes(item?.name)
          );
          dispatch(
            setupAddExperience([
              {
                ...values,
                id: selectedExperience?.id,
                providers:
                  filteredProvidersArray?.map((item) => {
                    return {
                      providerId: item?.id,
                      providerName: item?.name,
                    };
                  }) || [],
                links: links?.map((item) => {
                  return {
                    link: item.link,
                    explanation: item.linkExplanation,
                  };
                }),
                linkWithOtherExperience:
                  linkWithOtherExperiences?.map((item) => {
                    return {
                      experienceId: item?.experienceId,
                      experienceName: item?.experienceName,
                      why: item?.why,
                    };
                  }) || [],
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
    setShowEditExperienceDialog(false);
  }

  function handleAddExperience() {
    if (experience?.length === 0 || experienceWhy === "") {
      toast.error("Provide all values");
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
    if (experienceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowEditExperienceDialog(false);
      toast.success("Experience Updated Successfully");
    }
  }, [experienceAddSuccess]);

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
      if (
        selectedExperience?.providers &&
        selectedExperience?.providers?.length !== 0
      ) {
        setProviders(
          selectedExperience?.providers?.map((all) => all?.providerName)
        );
      }
    }
  }, [selectedExperience]);

  return (
    <ExperienceDialogForm
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
    />
  );
};

export default EditExperienceDialog;
