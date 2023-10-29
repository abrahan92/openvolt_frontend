import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormControl, FormHelperText, TextField } from "@mui/material";

const CustomTextInput = ({
 autoFocus,
 ariaDescribedBy,
 control,
 fullWidth,
 isDisabled,
 isInvalid,
 label,
 multiline,
 name,
 required,
 rows,
 sx,
 type,
 state,
 withControl = true,
 onChange,
}) => {
 const { t } = useTranslation();

 return withControl ? (
  <FormControl fullWidth={fullWidth} sx={sx}>
   <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
     <TextField
      aria-describedby={ariaDescribedBy}
      autoFocus={autoFocus}
      disabled={isDisabled}
      error={Boolean(isInvalid)}
      label={t(label)}
      multiline={multiline}
      onChange={(e) => {
       onChange(e);
      }}
      rows={rows}
      type={type}
      value={value}
     />
    )}
    rules={{ required }}
   />
   {isInvalid && (
    <FormHelperText id={ariaDescribedBy} sx={{ color: "error.main" }}>
     {isInvalid.message}
    </FormHelperText>
   )}
  </FormControl>
 ) : (
  <TextField
   aria-describedby={ariaDescribedBy}
   name={name}
   autoFocus={autoFocus}
   disabled={isDisabled}
   error={Boolean(isInvalid)}
   label={t(label)}
   multiline={multiline}
   onChange={onChange}
   rows={rows}
   type={type}
   value={state}
   fullWidth={fullWidth}
   sx={sx}
  />
 );
};

export default CustomTextInput;
