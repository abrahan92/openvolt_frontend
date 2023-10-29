import { forwardRef } from 'react'
import { Avatar as MuiAvatar } from '@mui/material'
import useBgColor from 'src/@core/hooks/useBgColor'
import { lighten, useTheme } from '@mui/material/styles'

const Avatar = forwardRef((props, ref) => {
  const theme = useTheme()
  const bgColors = useBgColor()
  const { sx, src, skin, color } = props

  const getAvatarStyles = (skin, skinColor) => {
    let avatarStyles

    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] }
    } else if (skin === 'light-static') {
      avatarStyles = {
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88),
        color: bgColors[`${skinColor}Light`].color
      }
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] }
    }

    return avatarStyles
  }

  const colors = {
    error: getAvatarStyles(skin, 'error'),
    info: getAvatarStyles(skin, 'info'),
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    warning: getAvatarStyles(skin, 'warning')
  }

  return <MuiAvatar ref={ref} sx={!src && skin && color ? Object.assign(colors[color], sx) : sx} {...props} />
})

Avatar.defaultProps = {
  color: 'primary',
  skin: 'filled'
}

export default Avatar
