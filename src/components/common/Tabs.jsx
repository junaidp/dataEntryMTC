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
import { useDebounce } from "use-debounce";

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

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const [searchValue, setSearchValue] = React.useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [showAddVendorDialog, setShowAddVendorDialog] = React.useState(false);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  React.useEffect(() => {
    dispatch(setupSearchVendorByQuery(debouncedSearchValue));
  }, [debouncedSearchValue]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Vendor" {...a11yProps(0)} />
          <Tab label="Providers" {...a11yProps(2)} />
          <Tab label="Experience" {...a11yProps(1)} />
          <Tab label="Services" {...a11yProps(1)} />
          <Tab label="Options" {...a11yProps(1)} />
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
        <Experience />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Providers />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <p>Here Comes Service Data</p>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <p>Here Comes Option Data</p>
      </CustomTabPanel>
    </Box>
  );
}
