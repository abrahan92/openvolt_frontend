import clsx from 'clsx'
import { Chip as MuiChip } from '@mui/material'
import useBgColor from 'src/@core/hooks/useBgColor'

const Chip = props => {
  const bgColors = useBgColor()
  const { sx, skin, color, rounded } = props

  const propsToPass = { ...props }

  propsToPass.rounded = undefined

  const colors = {
    error: { ...bgColors.errorLight },
    info: { ...bgColors.infoLight },
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    warning: { ...bgColors.warningLight }
  }

  return (
    <MuiChip
      className={clsx({
        'MuiChip-light': skin === 'light',
        'MuiChip-rounded': rounded
      })}
      sx={skin === 'light' && color ? Object.assign(colors[color], sx) : sx}
      variant='filled'
      {...propsToPass}
    />
  )
}

export default Chip
