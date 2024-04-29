import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";


const StaticTextFields = ({ data, handleChangeText }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 mb-2">
          <TextField
            id="firstName"
            name="firstName"
            label="Name"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.firstName}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Surname"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.lastName}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6 mb-2">
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.email}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.principalCustomer?.cityOfResidence}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-lg-6 mb-2">
          <label
            className="col-lg-12 mb-2 hidden"
            style={{ visibility: "hidden" }}
          >
            Gender
          </label>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              value={data?.principalCustomer?.gender}
              label="Relation"
              style={{ background: "white" }}
              onChange={(event) => handleChangeText("principalCustomer", event)}
              name="gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-6 mb-2">
          <label className="col-lg-12 mb-2 ">Date Of Birth</label>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            variant="outlined"
            className="form-control"
            type="date"
            value={data?.principalCustomer?.dateOfBirth}
            onChange={(event) => handleChangeText("principalCustomer", event)}
          />
        </div>
      </div>
    </div>
  );
};

export default StaticTextFields;
