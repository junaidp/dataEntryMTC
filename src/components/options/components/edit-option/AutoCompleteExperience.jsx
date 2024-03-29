import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ControllableStates({
  options,
  formik,
  selectedOption,
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
    if (selectedOption?.experienceId && selectedOption?.experienceId !== "") {
      setValue(
        options?.find(
          (singleItem) => singleItem?.id === selectedOption?.experienceId
        )?.name
      );
    }
  }, [selectedOption]);
  return (
    <div>
      <br />
      <Autocomplete
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
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
