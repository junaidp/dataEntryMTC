import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddService } from "../../../global-redux/reducers/services/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ServiceDialogForm from "./EditServiceDialogForm";

const EditServiceDialog = ({ setShowEditServiceDialog, selectedService }) => {
  const dispatch = useDispatch();
  const { allService } = useSelector((state) => state.services);
  const { allProvider } = useSelector((state) => state.providers);
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

  // Input Refs
  const priceRef = React.useRef(null);
  const durationRef = React.useRef(null);
  const availableTimeRef = React.useRef(null);
  const keywordRef = React.useRef(null);
  const linkRef = React.useRef(null);

  const { serviceAddSuccess, loading } = useSelector(
    (state) => state?.services
  );
  let initialValues = {
    title: "",
    address: "",
    description: "",
    termsAndConditions: "",
    providerId: "",
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
          dispatch(
            setupAddService([
              {
                ...values,
                providers: [
                  allProvider?.find((all) => all?.id === values?.providerId),
                ],
                id: selectedService?.id,
                links: links?.map((item) => item?.link),
                linkWithOtherService:
                  linkWithOtherServices?.map((item) => {
                    return {
                      serviceId: item?.serviceId,
                      serviceName: item?.serviceName,
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
    if (link === "") {
      toast.error("Provide Both Values");
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

  function handleAddServices() {
    if (services?.length === 0 || serviceWhy === "") {
      toast.error("Provide all values");
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
    if (serviceAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowEditServiceDialog(false);
      toast.success("Services Updated Successfully");
    }
  }, [serviceAddSuccess]);

  React.useEffect(() => {
    if (Object.keys(selectedService)?.length !== 0) {
      if (selectedService?.providers) {
        formik.resetForm({
          values: {
            ...formik.values,
            title: selectedService?.title,
            address: selectedService?.address,
            description: selectedService?.description,
            termsAndConditions: selectedService?.termsAndConditions,
            providerId: selectedService?.providers[0]?.id,
            vendorId: selectedService?.vendorId,
          },
        });
      }
      if (!selectedService?.providers) {
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
      }
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
    />
  );
};

export default EditServiceDialog;
