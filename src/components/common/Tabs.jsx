import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Vendors from "../vendors/Vendors";
import Experience from "../experiences/Experiences";
import Providers from "../variations/Variations";
import Button from "@mui/material/Button";
import { setupSearchVendorByQuery } from "../../global-redux/reducers/vendor/slice";
import { useDispatch, useSelector } from "react-redux";

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
  const [value, setValue] = React.useState(0);
  const { loading } = useSelector((state) => state?.vendors);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const [searchValue, setSearchValue] = React.useState("");
  const [showAddVendorDialog, setShowAddVendorDialog] = React.useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  function handleSeachVendor() {
    if (!loading) {
      dispatch(setupSearchVendorByQuery(searchValue));
    }
  }

  React.useEffect(() => {
    if (searchValue === "") {
      dispatch(setupSearchVendorByQuery(""));
    }
  }, [searchValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Vendor" {...a11yProps(0)} />
          <Tab label="Experience" {...a11yProps(1)} />
          <Tab label="Providers" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mb-4 " style={{ marginLeft: "-10px" }}>
          <Button size="medium" onClick={() => setShowAddVendorDialog(true)}>
            <h2 className="heading mt-2">Add Vendor</h2>
          </Button>
        </div>
        <div className="example-header row">
          <div className="mb-4 col-lg-10">
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
          <div className="col-lg-2">
            <div
              className={`btn btn-labeled btn-primary px-3 shadow  my-4 ${
                loading && "disabled"
              }`}
              onClick={handleSeachVendor}
            >
              <span className="btn-label me-2">
                <i className="fa fa-check-circle f-18"></i>
              </span>
              {loading ? "Loading.." : "Search"}
            </div>
          </div>
        </div>
        <Vendors
          showAddVendorDialog={showAddVendorDialog}
          setShowAddVendorDialog={setShowAddVendorDialog}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Experience />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Providers />
      </CustomTabPanel>
    </Box>
  );
}
