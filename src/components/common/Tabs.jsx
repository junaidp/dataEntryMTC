import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Vendors from "../vendors/Vendors";
import Experience from "../experiences/Experiences";
// import Varations from "../variations/Variations";
import Providers from "../../components/providers/Provider";
import Services from "../services/Services";
import Button from "@mui/material/Button";
import { setupSearchVendorByQuery } from "../../global-redux/reducers/vendor/slice";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import Options from "../options/Options";
import Variations from "../variations/Variations";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const dispatch = useDispatch();
  const { vendorAddSuccess } = useSelector((state) => state.vendors);
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  // For Vendor
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [showAddVendorDialog, setShowAddVendorDialog] = React.useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  }, [debouncedSearchValue]);

  React.useEffect(() => {
    if (vendorAddSuccess) {
      setSearchValue("");
    }
  }, [vendorAddSuccess]);
  // For Experience
  const [experienceSearchValue, setExperienceSearchValue] = React.useState("");
  const [debouncedExperienceSearchValue] = useDebounce(searchValue, 1000);
  const [showAddExperienceDialog, setShowAddExperienceDialog] =
    React.useState(false);

  const handleExperienceInputChange = (event) => {
    setExperienceSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  // }, [debouncedExperienceSearchValue]);

  // React.useEffect(() => {
  //   if (vendorAddSuccess) {
  //     setSearchValue("");
  //   }
  // }, [vendorAddSuccess]);
  // For Service
  const [serviceSearchValue, setServiceSearchValue] = React.useState("");
  const [debouncedServiceSearchValue] = useDebounce(searchValue, 1000);
  const [showAddServiceDialog, setShowAddServiceDialog] = React.useState(false);

  const handleServiceInputChange = (event) => {
    setServiceSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  // }, [debouncedExperienceSearchValue]);

  // React.useEffect(() => {
  //   if (vendorAddSuccess) {
  //     setSearchValue("");
  //   }
  // }, [vendorAddSuccess]);
  // For Provider
  const [providerSearchValue, setProviderSearchValue] = React.useState("");
  const [debouncedProviderSearchValue] = useDebounce(searchValue, 1000);
  const [showAddProvidereDialog, setShowAddProviderDialog] =
    React.useState(false);

  const handleProviderInputChange = (event) => {
    setProviderSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  // }, [debouncedExperienceSearchValue]);

  // React.useEffect(() => {
  //   if (vendorAddSuccess) {
  //     setSearchValue("");
  //   }
  // }, [vendorAddSuccess]);
  // For Options
  const [optionSearchValue, setOptionSearchValue] = React.useState("");
  const [debouncedOptionSearchValue] = useDebounce(searchValue, 1000);
  const [showAddOptionDialog, setShowAddOptionDialog] = React.useState(false);

  const handleOptionInputChange = (event) => {
    setOptionSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  // }, [debouncedExperienceSearchValue]);

  // React.useEffect(() => {
  //   if (vendorAddSuccess) {
  //     setSearchValue("");
  //   }
  // }, [vendorAddSuccess]);
  // For  Variations
  const [variationSearchValue, setVariationSearchValue] = React.useState("");
  const [debouncedVariationSearchValue] = useDebounce(searchValue, 1000);
  const [showAddVariationDialog, setShowAddVariationDialog] =
    React.useState(false);

  const handleVariationInputChange = (event) => {
    setVariationSearchValue(event.target.value);
  };

  // React.useEffect(() => {
  //   dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  // }, [debouncedExperienceSearchValue]);

  // React.useEffect(() => {
  //   if (vendorAddSuccess) {
  //     setSearchValue("");
  //   }
  // }, [vendorAddSuccess]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Vendors" {...a11yProps(0)} />
          <Tab label="Providers" {...a11yProps(1)} />
          <Tab label="Experiences" {...a11yProps(2)} />
          <Tab label="Services" {...a11yProps(3)} />
          <Tab label="Options" {...a11yProps(4)} />
          <Tab label="Variations" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddVendorDialog(true)}>
            <h2 className="heading mt-2">Add Vendor</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Vendor</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={searchValue}
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
          </div>
        </div>
        <Vendors
          showAddVendorDialog={showAddVendorDialog}
          setShowAddVendorDialog={setShowAddVendorDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddProviderDialog(true)}>
            <h2 className="heading mt-2">Add Provider</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Provider</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={providerSearchValue}
              onChange={(event) => {
                handleProviderInputChange(event);
              }}
            />
          </div>
        </div>
        <Providers
          showAddProvidereDialog={showAddProvidereDialog}
          setShowAddProviderDialog={setShowAddProviderDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button
            size="medium"
            onClick={() => setShowAddExperienceDialog(true)}
          >
            <h2 className="heading mt-2">Add Experience</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Experience</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={experienceSearchValue}
              onChange={(event) => {
                handleExperienceInputChange(event);
              }}
            />
          </div>
        </div>
        <Experience
          showAddExperienceDialog={showAddExperienceDialog}
          setShowAddExperienceDialog={setShowAddExperienceDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddServiceDialog(true)}>
            <h2 className="heading mt-2">Add Service</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Service</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={serviceSearchValue}
              onChange={(event) => {
                handleServiceInputChange(event);
              }}
            />
          </div>
        </div>
        <Services
          showAddServiceDialog={showAddServiceDialog}
          setShowAddServiceDialog={setShowAddServiceDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddOptionDialog(true)}>
            <h2 className="heading mt-2">Add Option</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Option</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={optionSearchValue}
              onChange={(event) => {
                handleOptionInputChange(event);
              }}
            />
          </div>
        </div>
        <Options
          showAddOptionDialog={showAddOptionDialog}
          setShowAddOptionDialog={setShowAddOptionDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddVariationDialog(true)}>
            <h2 className="heading mt-2">Add Variation</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-12">
            <label>Search Variation</label>
            <input
              placeholder="Filter"
              id="inputField"
              className="form-control h-40"
              value={variationSearchValue}
              onChange={(event) => {
                handleVariationInputChange(event);
              }}
            />
          </div>
        </div>
        <Variations
          showAddVariationDialog={showAddVariationDialog}
          setShowAddVariationDialog={setShowAddVariationDialog}
        />
      </CustomTabPanel>
    </Box>
  );
}
