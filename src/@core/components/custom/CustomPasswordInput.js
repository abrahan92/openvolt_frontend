import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

const CustomPasswordInput = ({
  ariaDescribedBy,
  control,
  fullWidth,
  isDisabled,
  isInvalid,
  label,
  name,
  required,
  sx
}) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl fullWidth={fullWidth} sx={sx}>
      <InputLabel error={Boolean(isInvalid)} htmlFor={ariaDescribedBy}>
        {t(label)}
      </InputLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <OutlinedInput
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  <Icon icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                </IconButton>
              </InputAdornment>
            }
            disabled={isDisabled}
            error={Boolean(isInvalid)}
            id={ariaDescribedBy}
            label={t(label)}
            onChange={onChange}
            type={showPassword ? 'text' : 'password'}
            value={value}
          />
        )}
        rules={{ required }}
      />
      {isInvalid && (
        <FormHelperText id={ariaDescribedBy} sx={{ color: 'error.main' }}>
          {isInvalid.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default CustomPasswordInput
