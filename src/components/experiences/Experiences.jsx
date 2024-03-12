import React from "react";
import TextField from "@mui/material/TextField";
// import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RichTextEditor from "../common/RichText";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const Experience = () => {
  // const navigate = useNavigate();
  return (
    <div className="col-lg-12 w-100">
      <div className="mb-4">
        <h2 className="heading">Experience/Service Record </h2>
      </div>
      <div className="row">
        <div className="col-lg-8 mb-4">
          <TextField
            id="outlined-basic"
            label="Experience/Service Title"
            variant="outlined"
            className="form-control"
          />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-12">
          <RichTextEditor placeholder="Description" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <TextField
            id="outlined-number"
            label="XP address"
            className="w-100"
          />
        </div>

        <div className="col-lg-6 mb-4">
          <Box sx={{ display: "flex", alignItems: "flex-center", gap: "10px" }}>
            <div
              className="btn btn-labeled btn-primary px-3 shadow col-lg-2 text-between"
              onClick={() => setCheckListManagementDialog(true)}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
            </div>
            <TextField
              id="outlined-number"
              label="Price"
              className="w-100"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <Box sx={{ display: "flex", alignItems: "flex-center", gap: "10px" }}>
            <div
              className="btn btn-labeled btn-primary px-3 shadow col-lg-2 text-between"
              onClick={() => setCheckListManagementDialog(true)}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
            </div>
            <TextField
              id="outlined-number"
              label="Duration"
              className="w-100"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </div>

        <div className="col-lg-6 mb-4">
          <Box sx={{ display: "flex", alignItems: "flex-center", gap: "10px" }}>
            <div
              className="btn btn-labeled btn-primary px-3 shadow col-lg-2 text-between"
              onClick={() => setCheckListManagementDialog(true)}
            >
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
            </div>
            <TextField
              id="outlined-number"
              label="Available Time"
              className="w-100"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </div>
      </div>

      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              New Variation
            </div>
            <div className="col-lg-10 mb-4">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Sr No.</th>
                    <th className="per80">Variation List</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="per80">
                      <Button>Variation 1</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="per80">
                      <Button>Variation 2</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="per80">
                      <Button>Variation 3</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td className="per80">
                      <Button>Variation 4</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              New Option
            </div>
            <div className="col-lg-10 mb-4">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Sr No.</th>
                    <th className="per80">Option List</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="per80">
                      <Button>Option 1</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="per80">
                      <Button>Option 2</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="per80">
                      <Button>Option 3</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              New Link
            </div>
            <div className="col-lg-10 mb-4">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Sr No.</th>
                    <th className="per80">Links</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-lg-12">
          <RichTextEditor placeholder="Specific Terms and Conditions" />
        </div>
      </div>

      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              New Provider
            </div>
            <div className="col-lg-10 mb-4">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Sr No.</th>
                    <th className="per80">Provider List</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="per80">
                      <Button>Provider 1</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="per80">
                      <Button>Provider 2</Button>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="per80">
                      <Button>Provider 3</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className={`col-lg-12`}>
          <div className="row">
            <div className="btn btn-labeled btn-primary px-3 col-lg-2 h-40 shadow h-40 text-between mb-4">
              <span className="btn-label me-2">
                <i className="fa fa-plus"></i>
              </span>
              Other Experiences
            </div>
            <div className="col-lg-10 mb-4">
              <table className="table table-bordered  table-hover rounded">
                <thead className="bg-secondary text-white">
                  <tr>
                    <th>Sr No.</th>
                    <th>Links</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td className="per80">
                      <Tooltip title="Link Description" placement="top-start">
                        <Button>www.facebook.com</Button>
                      </Tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-0">
        <div className="col-lg-6 mb-4">
          <label className="w-100">Add Keyword:</label>
          <TextField className="form-control" />
        </div>
        <div className={`col-lg-6 text-end float-end align-self-end mb-4`}>
          <div className="btn btn-labeled btn-primary px-3 shadow">
            <span className="btn-label me-2">
              <i className="fa fa-plus"></i>
            </span>
            Add Keyword
          </div>
        </div>
      </div>
      <div className="mb-4 row">
        <Card className="row p-4 h-80 mb-4 h-70">
          <div className="col-lg-2 mb-4">
            <Chip
              label="Keyword Keyword"
              className="cursor-pointer"
              variant="outlined"
            />
          </div>
          <div className="col-lg-2  mb-4">
            <Chip
              label="Keyword Keyword"
              className="cursor-pointer"
              variant="outlined"
            />
          </div>
          <div className="col-lg-2  mb-4">
            <Chip
              label="Keyword Keyword"
              className="cursor-pointer"
              variant="outlined"
            />
          </div>
          <div className="col-lg-2  mb-4">
            <Chip
              label="Keyword Keyword"
              className="cursor-pointer"
              variant="outlined"
            />
          </div>
          <div className="col-lg-2  mb-4">
            <Chip
              label="Keyword Keyword"
              className="cursor-pointer"
              variant="outlined"
            />
          </div>
          <div className="col-lg-2  mb-4">
            <Chip
              label="Keyword Keyword"
              variant="outlined"
              className="cursor-pointer"
            />
          </div>
        </Card>
      </div>
      <div className="row mb-4">
        {/* <div
          className="btn btn-labeled btn-primary  col-lg-2 h-40 shadow h-40 text-between mb-4"
          onClick={() => navigate("/variation")}
        >
          Variations and Options
          <span className="px-2 btn-label me-2">
            <i class="bi bi-arrow-right"></i>
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Experience;
