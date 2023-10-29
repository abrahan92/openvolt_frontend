import { useTheme } from '@mui/material/styles'
import useBgColor from 'src/@core/hooks/useBgColor'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { TimelineDot as MuiTimelineDot } from '@mui/lab'

const TimelineDot = props => {
  const theme = useTheme()
  const bgColors = useBgColor()
  const { sx, skin, color, variant } = props

  const colors = {
    error: {
      backgroundColor: bgColors.errorLight.backgroundColor,
      boxShadow: 'none',
      color: theme.palette.error.main
    },
    grey: {
      backgroundColor: hexToRGBA(theme.palette.grey[500], 0.12),
      boxShadow: 'none',
      color: theme.palette.grey[500]
    },
    info: {
      backgroundColor: bgColors.infoLight.backgroundColor,
      boxShadow: 'none',
      color: theme.palette.info.main
    },
    primary: {
      color: theme.palette.primary.main,
      backgroundColor: bgColors.primaryLight.backgroundColor,
      boxShadow: 'none'
    },
    secondary: {
      backgroundColor: bgColors.secondaryLight.backgroundColor,
      boxShadow: 'none',
      color: theme.palette.secondary.main
    },
    success: {
      backgroundColor: bgColors.successLight.backgroundColor,
      boxShadow: 'none',
      color: theme.palette.success.main
    },
    warning: {
      backgroundColor: bgColors.warningLight.backgroundColor,
      boxShadow: 'none',
      color: theme.palette.warning.main
    }
  }

  return (
    <MuiTimelineDot
      sx={color && skin === 'light' && variant === 'filled' ? Object.assign(colors[color], sx) : sx}
      {...props}
    />
  )
}

TimelineDot.defaultProps = {
  color: 'grey',
  variant: 'filled'
}

export default TimelineDot
