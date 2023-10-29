import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/hooks/useAuth'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Badge, Menu, MenuItem } from '@mui/material'
import { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'src/services/authenticationService'
import { handleLoginCredentials, handleLogout } from 'src/store/slices/authenticationSlice'

const UserDropdown = ({ settings }) => {
  const router = useRouter()
  const { setUser } = useAuth()
  const { direction } = settings
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const { userData } = useSelector(store => store.authentication)
  const [imgSrc, setImgSrc] = useState('/images/avatars/profile_avatar.png')

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    url && router.push(url)

    setAnchorEl(null)
  }

  const handleLogoutUser = async () => {
    setLoggingOut(true)

    try {
      await logout()

      Cookies.remove(process.env.NEXT_PUBLIC_SESSION_EXPIRATION_NAME, {
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SET_COOKIE_DOMAIN : ''
      })

      const rememberMe = localStorage.getItem('rememberMe')

      if (rememberMe === 'false') {
        dispatch(
          handleLoginCredentials({
            email: null,
            rememberMe: false
          })
        )
      }

      dispatch(handleLogout())

      setUser(null)

      toast.success(t('you_have_successfully_logged_out'))

      router.push('/login')
    } catch (error) {
      console.log(error)
    }

    setLoggingOut(false)
  }

  useEffect(() => {
    userData?.picture_url && setImgSrc(userData?.picture_url)
  }, [userData])

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <ImgStyled src={imgSrc} alt='Profile Pic' />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4.5 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItemStyled
          onClick={() => handleLogoutUser()}
          disabled={loggingOut}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem' } }}
        >
          <Icon icon='tabler:logout' />
          {t(loggingOut ? 'logging_out' : 'log_out')}
        </MenuItemStyled>
      </Menu>
    </Fragment>
  )
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const ImgStyled = styled('img')(() => ({
  width: 40,
  height: 40,
  borderRadius: '50%'
}))

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  '&:hover .MuiBox-root, &:hover .MuiBox-root svg': {
    color: theme.palette.primary.main
  }
}))

export default UserDropdown
