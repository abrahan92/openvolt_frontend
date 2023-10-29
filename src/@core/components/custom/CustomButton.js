import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'

const CustomButton = ({
  color,
  endIcon,
  fullWidth,
  isLoading,
  isDisabled,
  label,
  loadingLabel,
  onClick,
  size,
  startIcon,
  sx,
  type,
  variant,
  isLink,
  linkRef
}) => {
  const { t } = useTranslation()

  return (
    <LoadingButton
      color={color}
      disabled={isDisabled}
      endIcon={endIcon}
      loading={isLoading}
      loadingPosition={endIcon && 'end'}
      fullWidth={fullWidth}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      sx={sx}
      type={type}
      variant={variant}
    >
      {t(isLoading ? loadingLabel : label)}
    </LoadingButton>
  )
}

export default CustomButton
