import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ControllableStates({ options, formik, provider }) {
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    formik.resetForm({
      values: {
        ...formik.values,
        vendorId: options?.find((singleItem) => singleItem?.name === value)?.id,
      },
    });
  }, [value]);

  React.useEffect(() => {
    if (provider?.vendorId && provider?.vendorId !== "") {
      setValue(
        options?.find((singleItem) => singleItem?.id === provider?.vendorId)
          ?.name
      );
    }
  }, [provider]);
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
