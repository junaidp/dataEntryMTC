import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ControllableStates({
  options,
  formik,
  selectedExperience,
}) {
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    formik.resetForm({
      values: {
        ...formik.values,
        vendorId: options?.find((singleItem) => singleItem?.name === value)?.id,
      },
    });
  }, [value]);

  React.useEffect(() => {
    formik.resetForm({
      values: {
        ...formik.values,
        vendorId: options?.find((singleItem) => singleItem?.name === inputValue)
          ?.id,
      },
    });
  }, [inputValue]);

  React.useEffect(() => {
    if (selectedExperience?.vendorId && selectedExperience?.vendorId !== "") {
      setValue(
        options?.find(
          (singleItem) => singleItem?.id === selectedExperience?.vendorId
        )?.name
      );
    }
  }, [selectedExperience]);
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
          <TextField {...params} label="Select Vendor" />
        )}
      />
    </div>
  );
}
