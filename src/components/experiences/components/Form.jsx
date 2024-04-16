import React from "react";
import RichTextEditor from "../../../components/common/RichText";
import Chip from "@mui/material/Chip";
import { useSelector } from "react-redux";
import OptionRecord from "./records/OptionsRecord";
import VariationRecord from "./records/VariationRecord";
import ViewSelectedOptionDialog from "./view-dialogs/ViewOption";
import ViewSelectedVariationDialog from "./view-dialogs/ViewVariation";
import AddOptionDialog from "./extras-add-dialogs.jsx/options/AddOptionDialog";
import AddVariationDialog from "./extras-add-dialogs.jsx/variations/AddVariationDialog";
import ProviderRecord from "./records/ProviderRecord";

const Form = ({ experience, currentExperienceId }) => {
  const [selectedOption, setSelectedOption] = React.useState({});
  const [showAddOptionDialog, setShowAddOptionDialog] = React.useState(false);
  const [duplicateOptionCall, setDuplicateOptionCall] = React.useState(false);
  const [showOptionEditDialog, setShowOptionEditDialog] = React.useState(false);

  const [showViewOptionDialog, setShowViewOptionDialog] = React.useState(false);
  const [selectedVariation, setSelectedVariation] = React.useState({});
  const [duplicateVariationCall, setDuplicateVariationCall] =
    React.useState(false);
  const [showEditVariationDialog, setShowEditVariationDialog] =
    React.useState(false);
  const [showAddVariationDialog, setShowAddVariationDialog] =
    React.useState(false);
  const [showViewVariationDialog, setShowViewVariationDialog] =
    React.useState(false);
  const { allVendors } = useSelector((state) => state?.vendors);
  return (
    <div className="px-4 py-4">
      {showViewOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewSelectedOptionDialog
              selectedOption={selectedOption}
              setShowViewOptionDialog={setShowViewOptionDialog}
              setDuplicateOptionCall={setDuplicateOptionCall}
              setShowOptionEditDialog={setShowOptionEditDialog}
            />
          </div>
        </div>
      )}
      {showAddOptionDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddOptionDialog
              currentExperienceId={currentExperienceId}
              setShowAddOptionDialog={setShowAddOptionDialog}
            />
          </div>
        </div>
      )}
      {showViewVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ViewSelectedVariationDialog
              selectedVariation={selectedVariation}
              setShowViewVariationDialog={setShowViewVariationDialog}
              setDuplicateVariationCall={setDuplicateVariationCall}
              setShowEditVariationDialog={setShowEditVariationDialog}
            />
          </div>
        </div>
      )}
      {showAddVariationDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <AddVariationDialog
              currentExperienceId={currentExperienceId}
              setShowAddVariationDialog={setShowAddVariationDialog}
            />
          </div>
        </div>
      )}
      <div>
        <div className="row mx-0" style={{ margin: "0px" }}>
          <div className="col-lg-4 mb-4 p-0">
            <label>Experience title</label>
            <p>{experience?.title ? experience?.title : "No Title Provided"}</p>
          </div>
          <div className="col-lg-4 mb-4">
            <label>Experience address</label>
            <p>
              {experience?.address
                ? experience?.address
                : "No Address Provided"}
            </p>
          </div>
          <div className="col-lg-4 mb-4 ">
            <label>Vendor</label>
            <p>
              {allVendors?.find((item) => item?.id === experience?.vendorId)
                ?.name || "No Vendor Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 mb-2">
            <label>MemberShip</label>
            <p>
              {experience?.memberShip?.toUpperCase() ||
                "No MemberShip Provided"}
            </p>
          </div>
        </div>

        <div className="row">
          <div>
            <label className="mb-2">List Of Prices</label>
            <div>
              {!experience?.price || experience?.price?.length === 0 ? (
                <lable>No Price Provided</lable>
              ) : (
                experience?.price?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label>List Of Durations</label>
            <div>
              {!experience?.duration || experience?.duration?.length === 0 ? (
                <lable>No Duration Provided</lable>
              ) : (
                experience?.duration?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div>
            <label className="mb-2">List Of Available Times</label>
            <div>
              {!experience?.availableTime ||
              experience?.availableTime?.length === 0 ? (
                <lable>No Time Provided</lable>
              ) : (
                experience?.availableTime?.map((key, index) => {
                  return (
                    <Chip
                      label={key}
                      key={index}
                      variant="outlined"
                      className="mr-2 mb-2"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <label className="mb-2">List Of Keywords</label>
          <div>
            {!experience?.storyLineKeywords ||
            experience?.storyLineKeywords?.length === 0 ? (
              <lable>No Keyword Provided</lable>
            ) : (
              experience?.storyLineKeywords?.map((key, index) => {
                return (
                  <Chip
                    label={key}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Experiences</label>
          <div>
            {!experience?.linkWithOtherExperience ||
            experience?.linkWithOtherExperience?.length === 0 ? (
              <p>No Link With Other Experince Provided</p>
            ) : (
              experience?.linkWithOtherExperience?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.experienceName}-${key?.why}`}
                    key={index}
                    variant="outlined"
                    className={`mr-2 mb-2`}
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="mb-4">
          <label className="mb-2">List Of Link With Other Services</label>
          <div>
            {!experience?.linkWithOtherService ||
            experience?.linkWithOtherService?.length === 0 ? (
              <p>No Link With Other Service Provided</p>
            ) : (
              experience?.linkWithOtherService?.map((key, index) => {
                return (
                  <Chip
                    label={`${key?.serviceName}-${key?.why}`}
                    key={index}
                    variant="outlined"
                    className={`mr-2 mb-2`}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2">List Of Links</label>
          <div>
            {!experience?.links || experience?.links?.length === 0 ? (
              <lable>No Link Provided</lable>
            ) : (
              experience?.links.map((key, index) => {
                return (
                  <Chip
                    label={key?.link}
                    key={index}
                    variant="outlined"
                    className="mr-2 mb-2"
                  />
                );
              })
            )}
          </div>
        </div>
        <div className="max-height-200 overflow-y-auto">
          <OptionRecord
            setShowAddOptionDialog={setShowAddOptionDialog}
            setShowViewOptionDialog={setShowViewOptionDialog}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            duplicateOptionCall={duplicateOptionCall}
            setDuplicateOptionCall={setDuplicateOptionCall}
            showOptionEditDialog={showOptionEditDialog}
            setShowOptionEditDialog={setShowOptionEditDialog}
          />
        </div>
        <div className="max-height-200 overflow-y-auto">
          <VariationRecord
            setShowAddVariationDialog={setShowAddVariationDialog}
            setShowViewVariationDialog={setShowViewVariationDialog}
            setSelectedVariation={setSelectedVariation}
            selectedVariation={selectedVariation}
            duplicateVariationCall={duplicateVariationCall}
            setDuplicateVariationCall={setDuplicateVariationCall}
            showEditVariationDialog={showEditVariationDialog}
            setShowEditVariationDialog={setShowEditVariationDialog}
          />
        </div>
        <div className="max-height-200 overflow-y-auto ">
          <ProviderRecord experience={experience} />
        </div>

        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Description</label>
            <RichTextEditor
              initialValue={
                experience?.description !== ""
                  ? experience?.description
                  : "No Description Provided"
              }
              readonly={true}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-lg-12">
            <label>Terms & Conditions</label>
            <RichTextEditor
              initialValue={
                experience?.termsAndConditions !== ""
                  ? experience?.termsAndConditions
                  : "No Terms & Conditionn Provided Provided"
              }
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
