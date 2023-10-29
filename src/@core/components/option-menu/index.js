import Link from 'next/link'
import { Fragment, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Box, Menu, Divider, MenuItem, IconButton } from '@mui/material'

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        sx={{
          alignItems: 'center',
          color: 'inherit',
          display: 'flex',
          px: 4,
          py: 1.5,
          textDecoration: 'none',
          width: '100%'
        }}
        {...option.linkProps}
      >
        {children}
      </Box>
    )
  } else {
    return <>{children}</>
  }
}

const OptionsMenu = ({ icon, iconButtonProps, iconProps, leftAlignMenu, menuProps, options }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { settings } = useSettings()
  const { direction } = settings

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <Fragment>
      <IconButton aria-haspopup='true' onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <Icon icon='tabler:dots-vertical' {...iconProps} />}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: { vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' },
          transformOrigin: { vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }
        })}
        {...menuProps}
      >
        {options.map((option, index) => {
          if (typeof option === 'string') {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            )
          } else if ('divider' in option) {
            return option.divider && <Divider key={index} {...option.dividerProps} />
          } else {
            return (
              <MenuItem
                key={index}
                onClick={e => {
                  handleClose()
                  option.menuItemProps && option.menuItemProps.onClick ? option.menuItemProps.onClick(e) : null
                }}
                {...option.menuItemProps}
                {...(option.href && { sx: { p: 0 } })}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            )
          }
        })}
      </Menu>
    </Fragment>
  )
}

export default OptionsMenu
