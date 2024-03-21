import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import RichTextEditor from "../../../components/common/RichText";
import { setupAddProvider } from "../../../global-redux/reducers/providers/slice";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AutoCompleteVendor from "./AutoCompleteVendor";
import AutoCompleteExperience from "./AutoCompleteExperience";
import { toast } from "react-toastify";

const AddProviderDialog = ({ setShowAddProviderDialog }) => {
  const dispatch = useDispatch();
  const { providerAddSuccess, loading } = useSelector(
    (state) => state?.providers
  );
  const { allVendors } = useSelector((state) => state.vendors);
  const { allExperience } = useSelector((state) => state.experiences);
  let initialValues = {
    name: "",
    address: "",
    pointOfContact: "",
    website: "",
    email: "",
    regionsCovered: "",
    manageVenue: "",
    description: "",
    vendorId: "",
    experienceId: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Provider name is required"),
    address: Yup.string().required("Provider address is required"),
    pointOfContact: Yup.string().required("Point of contact is required"),
    website: Yup.string().required("Website of contact is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email of contact is required"),
    regionsCovered: Yup.string().required("Regions covered is required"),
    manageVenue: Yup.boolean().required(
      "Please select Yes or No for managing venue"
    ),
    description: Yup.string().required("Please provide description"),
    vendorId: Yup.string().required("Vendor is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!loading) {
        dispatch(
          setupAddProvider([
            {
              ...values,
            },
          ])
        );
      }
    },
  });

  function handleChangeDescription(value) {
    formik.resetForm({ values: { ...formik.values, description: value } });
  }

  function handleClose() {
    formik.resetForm({ values: initialValues });
    setShowAddProviderDialog(false);
  }

  React.useEffect(() => {
    if (providerAddSuccess) {
      formik.resetForm({ values: initialValues });
      setShowAddProviderDialog(false);
      toast.success("Provider Added Successfully")
    }
  }, [providerAddSuccess]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-4 py-4">
        <h2 className="pb-4 heading">Add Provider</h2>
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
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
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
                error={
                  formik.touched.pointOfContact &&
                  Boolean(formik.errors.pointOfContact)
                }
                helperText={
                  formik.touched.pointOfContact && formik.errors.pointOfContact
                }
              />
            </div>
          </div>

          <div className="mb-2 w-100">
            <div className="col-lg-12">
              <AutoCompleteVendor
                options={allVendors?.map((vendor) => {
                  return { name: vendor?.name, id: vendor?.id };
                })}
                formik={formik}
              />
            </div>
          </div>
          <div className="mb-4 w-100">
            <div className="col-lg-12">
              <AutoCompleteExperience
                options={allExperience?.map((experience) => {
                  return { name: experience?.title, id: experience?.id };
                })}
                formik={formik}
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
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
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
                  error={
                    formik.touched.regionsCovered &&
                    Boolean(formik.errors.regionsCovered)
                  }
                  helperText={
                    formik.touched.regionsCovered &&
                    formik.errors.regionsCovered
                  }
                >
                  <MenuItem value="">Select Region</MenuItem>
                  <MenuItem value="UK">UK</MenuItem>
                  <MenuItem value="US">US</MenuItem>
                  <MenuItem value="Germany">Germany</MenuItem>
                  <MenuItem value="Pakistan">Pakistan</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.regionsCovered &&
                formik.errors.regionsCovered && (
                  <div className="error">{formik.errors.regionsCovered}</div>
                )}
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
                />
              </div>

              {formik.touched.manageVenue && formik.errors.manageVenue && (
                <div className="error">{formik.errors.manageVenue}</div>
              )}
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
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
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

export default AddProviderDialog;
