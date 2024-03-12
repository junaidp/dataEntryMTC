import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddService } from "../../../../../global-redux/reducers/services/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ServiceDialogForm from "./ServiceDialogForm";

const AddExperienceDialog = ({ setShowAddServiceDialog, currentVendorId }) => {
  const dispatch = useDispatch();
  const [link, setLink] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [prices, setPrices] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [durations, setDurations] = React.useState([]);
  const [availableTime, setAvailableTime] = React.useState("");
  const [avialableTimes, setAvailableTimes] = React.useState([]);

  const { serviceAddSuccess, loading } = useSelector(
    (state) => state?.services
  );
  let initialValues = {
    title: "",
    address: "",
    description: "",
    linkWithOtherExperience: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    linkWithOtherExperience: Yup.string().required(
      "Link With Other Experience is required"
    ),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Please provide description"),
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
            setupAddService([
              {
                ...values,
                vendorId: currentVendorId,
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

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }

  function handleAddLink() {
    if (link === "") {
      toast.error("Provide Link");
    }
    if (link !== "") {
      setLinks([...links, { id: uuidv4(), link }]);
      setLink("");
    }
  }
  function handleDeleteLink(id) {
    setLinks((pre) => pre?.filter((singleItem) => singleItem?.id !== id));
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

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowAddServiceDialog(false);
  }

  React.useEffect(() => {
    if (serviceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowAddServiceDialog(false);
    }
  }, [serviceAddSuccess]);

  return (
    <ServiceDialogForm
      formik={formik}
      handleClose={handleClose}
      loading={loading}
      handleChangeDescription={handleChangeDescription}
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
    />
  );
};

export default AddExperienceDialog;
