import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import RichTextEditor from "../../../common/RichText";
import { setupEditProvider } from "../../../../global-redux/reducers/variations/slice";
import { useSelector, useDispatch } from "react-redux";
import { regions } from "../../../../constants";
import Autocomplete from "@mui/material/Autocomplete";
import AutoCompleteVendor from "./AutoCompleteVendor";

const EditProviderDialog = ({
  setShowEditProviderDialog,
  selectedProvider,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const { loading, variationAddSuccess } = useSelector(
    (state) => state?.variations
  );
  const { allProvider } = useSelector((state) => state?.providers);
  const [provider, setProvider] = React.useState({});
  const { allVendors } = useSelector((state) => state?.vendors);
  let initialValues = {
    name: "",
    address: "",
    pointOfContact: "",
    website: "",
    email: "",
    regionsCovered: "",
    manageVenue: "",
    description: "",
    termsNConditions: "",
    vendorId: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Provider name is required"),
    email: Yup.string().email("Invalid email address"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
        dispatch(
          setupEditProvider([
            {
              ...values,
              id: provider?.id,
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
    formik.resetForm({ values: { ...formik.values, termsNConditions: value } });
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setProvider({});
    setValue("");
    setShowEditProviderDialog(false);
  }

  React.useEffect(() => {
    if (value !== "") {
      formik.resetForm({ values: { ...formik.values, regionsCovered: value } });
    }
  }, [value]);

  React.useEffect(() => {
    if (variationAddSuccess) {
      formik.resetForm({ values: initialValues });
      setProvider({});
      setValue("");
      setShowEditProviderDialog(false);
    }
  }, [variationAddSuccess]);

  React.useEffect(() => {
    if (selectedProvider?.providerId) {
      setProvider(
        allProvider?.find((all) => all?.id === selectedProvider?.providerId)
      );
    }
  }, [selectedProvider]);

  React.useEffect(() => {
    if (provider && Object.keys(provider)?.length !== 0) {
      formik.resetForm({
        values: {
          ...formik.values,
          name: provider?.name,
          address: provider?.address,
          website: provider?.website,
          pointOfContact: provider?.pointOfContact,
          email: provider?.email,
          manageVenue: provider?.manageVenue,
          regionsCovered: provider?.regionsCovered,
          vendorId: provider?.vendorId,
          description: provider?.description,
          termsNConditions: provider?.termsNConditions,
        },
      });
      setValue(provider?.regionsCovered);
    }
  }, [provider]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Edit Provider</h2>
        <div>
          <div className="col-lg-8 mb-4">
            <TextField
              id="name"
              name="name"
              label="Provider name"
              variant="outlined"
              className="form-control"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>

          <div className="row">
            <div className="col-lg-6 mb-2">
              <TextField
                id="address"
                name="address"
                label="Provider address"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("address")}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <TextField
                id="pointOfContact"
                name="pointOfContact"
                label="Point of Contact"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("pointOfContact")}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 mb-4">
              <AutoCompleteVendor
                options={allVendors?.map((vendor) => {
                  return { name: vendor?.name, id: vendor?.id };
                })}
                formik={formik}
                provider={provider}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="website"
                name="website"
                label="Website"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("website")}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-4">
              <Autocomplete
                id="regionsCovered"
                name="regionsCovered"
                options={regions}
                renderInput={(params) => (
                  <TextField {...params} label="Select Region" />
                )}
                value={value}
                onChange={(_, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <div className="col-lg-6 mb-4">
              <div className="form-check form-switch ">
                <label className="mx-2">Manage Venue</label>
                <input
                  className="form-check-input h-20 w-80"
                  {...formik.getFieldProps("manageVenue")}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={Boolean(formik.values.manageVenue)}
                />
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-12">
              <label>Description:</label>
              <RichTextEditor
                initialValue={formik.values.description}
                handleChangeDescription={handleChangeDescription}
                readonly={false}
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-12">
              <label>Terms & Conditions:</label>
              <RichTextEditor
                initialValue={formik.values.termsNConditions}
                handleChangeTermsAndConditions={handleChangeTermsAndConditions}
                readonly={false}
              />
            </div>
          </div>
        </div>
        <div className="flex mb-2 flex-end">
          <div>
            <button
              type="submit"
              className={`btn btn-primary float-start ${
                loading && "disabled"
              } `}
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </div>
          <div className="mx-2">
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProviderDialog;
