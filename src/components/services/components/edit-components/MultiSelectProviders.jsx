import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function MultiSelectProviders({
  names,
  setProviders,
  selectedService,
}) {
  const [value, setValue] = React.useState([]);

  React.useEffect(() => {
    setProviders(value);
  }, [value]);

  React.useEffect(() => {
    if (
      selectedService?.providers &&
      selectedService?.providers?.length !== 0
    ) {
      setValue(
        selectedService?.providers?.map((all) => {
          return {
            title: all?.name,
            id: all?.id,
          };
        })
      );
    }
  }, [selectedService]);

  return (
    <Autocomplete
      multiple
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
        <TextField {...params} label="Providers" placeholder="Providers" />
      )}
    />
  );
}
