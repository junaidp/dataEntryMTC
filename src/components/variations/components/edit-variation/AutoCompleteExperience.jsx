import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ControllableStates({
  options,
  formik,
  selectedVaraition,
  setExperienceChange,
}) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    formik.resetForm({
      values: {
        ...formik.values,
        experienceId: options?.find((singleItem) => singleItem?.name === value)
          ?.id,
      },
    });
  }, [value]);

  React.useEffect(() => {
    if (
      selectedVaraition?.experienceId &&
      selectedVaraition?.experienceId !== ""
    ) {
      setValue(
        options?.find(
          (singleItem) => singleItem?.id === selectedVaraition?.experienceId
        )?.name
      );
    }
  }, [selectedVaraition]);
  return (
    <div>
      <br />
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          setTimeout(() => {
            setExperienceChange((pre) => !pre);
          }, 800);
        }}
        id="controllable-states-demo"
        options={options?.map((all) => all?.name)}
        renderInput={(params) => (
          <TextField {...params} label="Select Experience" />
        )}
      />
    </div>
  );
}
