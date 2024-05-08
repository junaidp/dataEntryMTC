import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const StaticTextFields = ({ data, handleChangeText, childrenData }) => {
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
            value={data?.firstName}
            onChange={(event) =>
              handleChangeText(data?.id, event, childrenData?.id)
            }
          />
        </div>
        <div className="col-lg-6 mb-2">
          <TextField
            id="lastName"
            name="lastName"
            label="Surname"
            variant="outlined"
            className="form-control"
            value={data?.lastName}
            onChange={(event) =>
              handleChangeText(data?.id, event, childrenData?.id)
            }
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
            value={data?.email}
            onChange={(event) =>
              handleChangeText(data?.id, event, childrenData?.id)
            }
          />
        </div>
        <div className="col-lg-6 mb-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Relationship with principal customer
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              value={data?.relation}
              label="Relation"
              style={{ background: "white" }}
              onChange={(event) =>
                handleChangeText(data?.id, event, childrenData?.id)
              }
              name="relation"
            >
              <MenuItem value="spouse">Spouse</MenuItem>
              <MenuItem value="daughter">Daughter</MenuItem>
              <MenuItem value="son">Son</MenuItem>
              <MenuItem value="mother">Mother</MenuItem>
              <MenuItem value="father">Father</MenuItem>
              <MenuItem value="granddaughter">GrandDaughter</MenuItem>
              <MenuItem value="grandson">GrandSon</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6 mb-2">
          <TextField
            id="cityOfResidence"
            name="cityOfResidence"
            label="City Of Residence"
            variant="outlined"
            className="form-control"
            value={data?.cityOfResidence}
            onChange={(event) =>
              handleChangeText(data?.id, event, childrenData?.id)
            }
          />
        </div>
        <div className="col-lg-6 mb-2">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              value={data?.gender}
              label="Relation"
              style={{ background: "white" }}
              onChange={(event) =>
                handleChangeText(data?.id, event, childrenData?.id)
              }
              name="gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12 mb-2">
          <label className="col-lg-12 mb-2 ">Date Of Birth</label>
          <TextField
            id="dateOfBirth"
            name="dateOfBirth"
            variant="outlined"
            className="form-control"
            type="date"
            value={data?.dateOfBirth}
            onChange={(event) =>
              handleChangeText(data?.id, event, childrenData?.id)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StaticTextFields;
