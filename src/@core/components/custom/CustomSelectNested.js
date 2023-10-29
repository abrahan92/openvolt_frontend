import { useTranslation } from 'react-i18next'
import { useEffect, useState, Fragment } from 'react'
import { Autocomplete, CircularProgress, TextField } from '@mui/material'

const CustomSelectNested = ({
  findParent,
  fullWidth,
  getValues,
  isDisabled,
  isInvalid,
  labelText,
  optionId,
  optionText,
  parentId,
  required,
  setParentId,
  items
}) => {
  const { t } = useTranslation()
  const value = findParent(parentId)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(getValues('name'))

  const loading = open && options.length === 0

  useEffect(() => {
    !open && setOptions([])
  }, [open])

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    if (active) {
      setOptions([...items])
    }

    return () => {
      active = false
    }
  }, [loading, items])

  return (
    <Autocomplete
      disabled={isDisabled}
      fullWidth={fullWidth}
      getOptionLabel={option => option?.[optionText]}
      inputValue={inputValue}
      isOptionEqualToValue={(option, value) => option?.[optionText] === value?.[optionText]}
      loading={loading}
      onChange={(event, newValue) => setParentId(newValue ? newValue?.[optionId] : null)}
      onClose={() => setOpen(false)}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue !== 'undefined' ? newInputValue : '')}
      onOpen={() => setOpen(true)}
      open={open}
      options={options}
      renderInput={params => (
        <TextField
          error={isInvalid}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
          label={t(labelText)}
          required={required}
          {...params}
        />
      )}
      value={value}
    />
  )
}

export default CustomSelectNested
