import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MultiSelectExperiences({
  names,
  setExperiences,
  resetExperienceMultiSelect,
  setResetExperienceMultiSelect,
}) {
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    setExperiences(value?.map((item) => item?.title));
  }, [value]);

  React.useEffect(() => {
    if (resetExperienceMultiSelect === true) {
      setValue([]);
      setResetExperienceMultiSelect(false);
    }
  }, [resetExperienceMultiSelect]);

  return (
    <Autocomplete
      multiple
      style={{ marginTop: "30px" }}
      id="fixed-tags-demo"
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      options={names}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option.title} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label="Experience" placeholder="Experience" />
      )}
    />
  );
}
