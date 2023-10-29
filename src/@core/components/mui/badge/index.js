import { Badge as MuiBadge } from '@mui/material'
import useBgColor from 'src/@core/hooks/useBgColor'

const Badge = props => {
  const bgColors = useBgColor()
  const { sx, skin, color } = props

  const colors = {
    info: { ...bgColors.infoLight },
    error: { ...bgColors.errorLight },
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    warning: { ...bgColors.warningLight }
  }

  return (
    <MuiBadge
      sx={skin === 'light' && color ? Object.assign({ '& .MuiBadge-badge': colors[color] }, sx) : sx}
      {...props}
    />
  )
}

export default Badge
