import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RichTextEditor from "../../../../common/RichText";
import {
  setupAddVendor,
  resetVendorAddSuccess,
} from "../../../../../global-redux/reducers/vendor/slice";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { regions } from "../../../../../constants";

const EditVendorDialog = ({ setShowEditVendorDialog, currentVendorId }) => {
  const dispatch = useDispatch();
  const { vendorAddSuccess, loading, allVendors } = useSelector(
    (state) => state?.vendors
  );
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
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Vendor's name is required"),
    email: Yup.string().email("Invalid email address"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let currentVendor = allVendors?.find(
        (singleVendor) => singleVendor?.id === currentVendorId
      );
      if (!loading) {
        dispatch(setupAddVendor({ ...values, id: currentVendor?.id }));
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
    setShowEditVendorDialog(false);
  }

  React.useEffect(() => {
    if (vendorAddSuccess) {
      toast.success("Vendor Updated Successfully");
      formik.resetForm({ values: initialValues });
      setShowEditVendorDialog(false);
      dispatch(resetVendorAddSuccess());
    }
  }, [vendorAddSuccess]);

  React.useEffect(() => {
    let selectedVendor = allVendors?.find(
      (singleVendor) => singleVendor?.id === currentVendorId
    );
    formik.resetForm({
      values: {
        ...formik.values,
        name: selectedVendor?.name,
        address: selectedVendor?.address,
        pointOfContact: selectedVendor?.pointOfContact,
        website: selectedVendor?.website,
        email: selectedVendor?.email,
        regionsCovered: selectedVendor?.regionsCovered,
        manageVenue: selectedVendor?.manageVenue,
        description: selectedVendor?.description,
        termsNConditions: selectedVendor?.termsNConditions,
      },
    });
  }, [currentVendorId]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Edit Vendor</h2>
        <div>
          <div className="col-lg-8 mb-4">
            <TextField
              id="name"
              name="name"
              label="Vendor’s name"
              variant="outlined"
              className="form-control"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>

          <div className="row">
            <div className="col-lg-6 mb-4">
              <TextField
                id="address"
                name="address"
                label="Vendor’s address"
                variant="outlined"
                className="form-control"
                {...formik.getFieldProps("address")}
              />
            </div>
            <div className="col-lg-6 mb-4">
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Regions Covered
                </InputLabel>
                <Select
                  id="regionsCovered"
                  name="regionsCovered"
                  className="form-control w-100 "
                  label="Regions Covered"
                  defaultValue="Germany"
                  {...formik.getFieldProps("regionsCovered")}
                >
                  <MenuItem value="">Select Region</MenuItem>
                  {regions?.map((region, index) => {
                    return (
                      <MenuItem value={region} key={index}>
                        {region}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className="col-lg-6 mb-4">
              <div>
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
              <label>Terms & Condition:</label>
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

export default EditVendorDialog;
