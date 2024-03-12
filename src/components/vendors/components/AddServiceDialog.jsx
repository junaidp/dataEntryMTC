import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { setupAddService } from "../../../global-redux/reducers/services/slice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ServiceDialogForm from "./ServiceDialogForm";

const AddExperienceDialog = ({ setShowAddServiceDialog, currentVendorId }) => {
  const dispatch = useDispatch();
  const [link, setLink] = React.useState("");
  const [links, setLinks] = React.useState([]);
  const { serviceAddSuccess, loading } = useSelector(
    (state) => state?.services
  );
  let initialValues = {
    title: "",
    address: "",
    price: "",
    duration: "",
    availableTime: "",
    description: "",
    linkWithOtherExperience: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    linkWithOtherExperience: Yup.string().required(
      "Link With Other Experience is required"
    ),
    address: Yup.string().required("Address is required"),
    price: Yup.string().required("Price is required"),
    duration: Yup.string().required("Duration is required"),
    availableTime: Yup.string().required("availableTime  is required"),
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
        if (links?.length !== 0) {
          dispatch(
            setupAddService([
              {
                ...values,
                vendorId: currentVendorId,
                links: links?.map((item) => {
                  return item.link;
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
    />
  );
};

export default AddExperienceDialog;
