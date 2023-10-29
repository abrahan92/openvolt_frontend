import { useTheme } from '@mui/material/styles'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const UseBgColor = () => {
  const theme = useTheme()

  return {
    errorFilled: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText
    },
    errorLight: {
      backgroundColor: hexToRGBA(theme.palette.error.main, 0.16),
      color: theme.palette.error.main
    },
    infoFilled: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.info.contrastText
    },
    infoLight: {
      backgroundColor: hexToRGBA(theme.palette.info.main, 0.16),
      color: theme.palette.info.main
    },
    primaryFilled: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    primaryLight: {
      backgroundColor: hexToRGBA(theme.palette.primary.main, 0.16),
      color: theme.palette.primary.main
    },
    secondaryFilled: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText
    },
    secondaryLight: {
      backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.16),
      color: theme.palette.secondary.main
    },
    successFilled: {
      backgroundColor: theme.palette.success.main,
      color: theme.palette.success.contrastText
    },
    successLight: {
      backgroundColor: hexToRGBA(theme.palette.success.main, 0.16),
      color: theme.palette.success.main
    },
    warningFilled: {
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText
    },
    warningLight: {
      backgroundColor: hexToRGBA(theme.palette.warning.main, 0.16),
      color: theme.palette.warning.main
    }
  }
}

export default UseBgColor
