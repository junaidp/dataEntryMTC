import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  setupAddOption,
  resetOptions,
} from "../../../../global-redux/reducers/options/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import OptionDialogForm from "./EditOptionDialogForm";
import { setupGetAllExperienceWithOutParams } from "../../../../global-redux/reducers/experiences/slice";
import { setupGetAllProviderWithOutParams } from "../../../../global-redux/reducers/providers/slice";

const EditOptionDialog = ({ setShowEditOptionDialog, selectedOption }) => {
  const dispatch = useDispatch();
  const [link, setLink] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);

  // Input Refs
  const priceRef = React.useRef(null);
  const durationRef = React.useRef(null);
  const availableTimeRef = React.useRef(null);
  const linkRef = React.useRef(null);

  const { optionAddSuccess, loading } = useSelector((state) => state?.options);
  const { allExperience } = useSelector((state) => state.experiences);
  const { allProvider } = useSelector((state) => state.providers);
  let initialValues = {
    title: "",
    xpAddress: "",
    experienceId: "",
    providerId: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    xpAddress: Yup.string().required("Address is required"),
    experienceId: Yup.string().required("Experience is required"),
    providerId: Yup.string().required("Provider is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
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
          links?.length !== 0 &&
          prices?.length !== 0 &&
          durations?.length !== 0 &&
          avialableTimes?.length !== 0
        ) {
          dispatch(
            setupAddOption([
              {
                ...values,
                linkWithOtherExperience: null,
                id: selectedOption?.id,
                links: links?.map((item) => {
                  return item.link;
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
    setShowEditOptionDialog(false);
  }

  React.useEffect(() => {
    if (optionAddSuccess) {
      toast.success("Option Updated Successfully");
      dispatch(resetOptions());
      formik.resetForm({ values: initialValues });
      setShowEditOptionDialog(false);
    }
  }, [optionAddSuccess]);

  React.useEffect(() => {
    dispatch(setupGetAllExperienceWithOutParams());
    dispatch(setupGetAllProviderWithOutParams());
  }, []);

  React.useEffect(() => {
    if (Object.keys(selectedOption)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          title: selectedOption?.title,
          xpAddress: selectedOption?.xpAddress,
          experienceId: selectedOption?.experienceId,
          providerId: selectedOption?.providerId,
        },
      });

      setPrices(
        selectedOption?.price?.map((singleItem) => {
          return {
            id: uuidv4(),
            price: singleItem,
          };
        })
      );
      setDurations(
        selectedOption?.duration?.map((singleItem) => {
          return {
            id: uuidv4(),
            duration: singleItem,
          };
        })
      );
      setAvailableTimes(
        selectedOption?.availableTime?.map((singleItem) => {
          return {
            id: uuidv4(),
            time: singleItem,
          };
        })
      );
      setLinks(
        selectedOption?.links?.map((singleItem) => {
          return {
            id: uuidv4(),
            link: singleItem,
          };
        })
      );
    }
  }, [selectedOption]);

  return (
    <OptionDialogForm
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
    />
  );
};

export default EditOptionDialog;
