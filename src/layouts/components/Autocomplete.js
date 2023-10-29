import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Icon from 'src/@core/components/icon'
import * as MuiMaterial from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styled, useTheme } from '@mui/material/styles'
import { useEffect, useCallback, useRef, useState } from 'react'

const NoResult = ({ value }) => {
  const { t } = useTranslation()

  return (
    <MuiMaterial.Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <MuiMaterial.Box sx={{ color: 'text.primary', mb: 2.5 }}>
        <Icon icon='tabler:file-off' fontSize='5rem' />
      </MuiMaterial.Box>
      <MuiMaterial.Typography sx={{ mb: 11.5, wordWrap: 'break-word' }} variant='h6'>
        {t('no_results_for')}{' '}
        <MuiMaterial.Typography component='span' sx={{ wordWrap: 'break-word' }} variant='h6'>
          {`"${value}"`}
        </MuiMaterial.Typography>
      </MuiMaterial.Typography>
    </MuiMaterial.Box>
  )
}

const DefaultSuggestions = ({ setOpenDialog }) => {
  const { t } = useTranslation()
  const { userData } = useSelector(store => store.authentication)

  const DefaultSuggestionsData = () => {
    if (userData?.default_role?.name === 'super_admin') {
      return [
        {
          category: t('account_settings'),
          suggestions: [
            {
              icon: 'tabler:user',
              suggestion: t('account'),
              link: '/super_admin/user_account_settings/account'
            },
            {
              icon: 'tabler:lock',
              suggestion: t('security'),
              link: '/super_admin/user_account_settings/security'
            }
          ]
        },
        {
          category: t('other'),
          suggestions: [
            {
              icon: 'tabler:smart-home',
              suggestion: t('home'),
              link: '/super_admin/home'
            },
            {
              icon: 'tabler:zoom-money',
              suggestion: t('partnership_requests'),
              link: '/super_admin/partnership_requests'
            }
          ]
        },
        {
          category: t('products_services'),
          suggestions: [
            {
              icon: 'tabler:category-2',
              suggestion: t('categories'),
              link: '/super_admin/categories'
            },
            {
              icon: 'tabler:box',
              suggestion: t('measurement_units'),
              link: '/super_admin/measurement_units'
            }
          ]
        },
        {
          category: t('users'),
          suggestions: [
            {
              icon: 'tabler:key',
              suggestion: t('permissions'),
              link: '/super_admin/permissions'
            },
            {
              icon: 'tabler:id-badge-2',
              suggestion: t('roles'),
              link: '/super_admin/roles'
            },
            {
              icon: 'tabler:users',
              suggestion: t('users'),
              link: '/super_admin/users'
            }
          ]
        }
      ]
    }
  }

  return (
    <MuiMaterial.Grid container spacing={6} sx={{ ml: 0 }}>
      {DefaultSuggestionsData().map((item, index) => (
        <MuiMaterial.Grid item key={index} xs={12} sm={12}>
          <MuiMaterial.Typography component='p' sx={{ color: 'text.disabled', lineHeight: 1.25 }} variant='overline'>
            {item.category}
          </MuiMaterial.Typography>
          <MuiMaterial.List sx={{ py: 2.5 }}>
            {item.suggestions.map((suggestionItem, index2) => (
              <MuiMaterial.ListItem key={index2} sx={{ py: 2 }} disablePadding>
                <MuiMaterial.Box
                  component={Link}
                  href={suggestionItem.link}
                  key={index2}
                  onClick={() => setOpenDialog(false)}
                  sx={{
                    alignItems: 'center',
                    color: 'text.primary',
                    display: 'flex',
                    textDecoration: 'none',
                    '& svg': { mr: 2.5 },
                    '&:hover > *': { color: 'primary.main' }
                  }}
                >
                  <Icon icon={suggestionItem.icon} fontSize='1.25rem' />
                  <MuiMaterial.Typography sx={{ color: 'text.primary' }} variant='body2'>
                    {suggestionItem.suggestion}
                  </MuiMaterial.Typography>
                </MuiMaterial.Box>
              </MuiMaterial.ListItem>
            ))}
          </MuiMaterial.List>
        </MuiMaterial.Grid>
      ))}
    </MuiMaterial.Grid>
  )
}

const AutocompleteComponent = ({ hidden, settings }) => {
  const theme = useTheme()
  const router = useRouter()
  const wrapper = useRef(null)
  const { t } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const { userData } = useSelector(store => store.authentication)
  const fullScreenDialog = MuiMaterial.useMediaQuery(theme.breakpoints.down('sm'))

  const { layout } = settings

  const categoryTitle = {
    account_settings: t('account_settings'),
    other: t('other'),
    products_services: t('products_services'),
    users: t('users')
  }

  const Options = () => {
    if (userData?.default_role?.name === 'super_admin') {
      return [
        {
          url: '/super_admin/user_account_settings/account',
          icon: 'tabler:user',
          title: t('account'),
          category: 'account_settings'
        },
        {
          url: '/super_admin/user_account_settings/security',
          icon: 'tabler:lock',
          title: t('security'),
          category: 'account_settings'
        },
        {
          url: '/super_admin/home',
          icon: 'tabler:smart-home',
          title: t('home'),
          category: 'other'
        },
        {
          url: '/super_admin/home',
          icon: 'tabler:smart-home',
          title: t('home'),
          category: 'other'
        },
        {
          url: '/super_admin/partnership_requests',
          icon: 'tabler:zoom-money',
          title: t('partnership_requests'),
          category: 'other'
        },
        {
          url: '/super_admin/categories',
          icon: 'tabler:category-2',
          title: t('categories'),
          category: 'products_services'
        },
        {
          url: '/super_admin/measurement_units',
          icon: 'tabler:box',
          title: t('measurement_units'),
          category: 'products_services'
        },
        {
          url: '/super_admin/permissions',
          icon: 'tabler:key',
          title: t('permissions'),
          category: 'users'
        },
        {
          url: '/super_admin/roles',
          icon: 'tabler:id-badge-2',
          title: t('roles'),
          category: 'users'
        },
        {
          url: '/super_admin/users',
          icon: 'tabler:users',
          title: t('users'),
          category: 'users'
        }
      ]
    }
  }

  // Handle click event on a list item in search result
  const handleOptionClick = obj => {
    setSearchValue('')

    setOpenDialog(false)

    if (obj.url) {
      router.push(obj.url)
    }
  }

  // Handle ESC & shortcut keys keydown events
  const handleKeydown = useCallback(
    event => {
      // ** Shortcut keys to open searchbox (Ctrl + /)
      if (!openDialog && event.ctrlKey && event.which === 191) {
        setOpenDialog(true)
      }
    },
    [openDialog]
  )

  // Handle shortcut keys keyup events
  const handleKeyUp = useCallback(
    event => {
      // ** ESC key to close searchbox
      if (openDialog && event.keyCode === 27) {
        setOpenDialog(false)
      }
    },
    [openDialog]
  )

  useEffect(() => {
    if (!openDialog) {
      setSearchValue('')
    }
  }, [openDialog])

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, handleKeydown])

  if (!isMounted) {
    return null
  } else {
    return (
      <MuiMaterial.Box
        onClick={() => !openDialog && setOpenDialog(true)}
        ref={wrapper}
        sx={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
      >
        <MuiMaterial.IconButton color='inherit' sx={!hidden && layout === 'vertical' ? { ml: -2.75, mr: 0.5 } : {}}>
          <Icon fontSize='1.5rem' icon='tabler:search' />
        </MuiMaterial.IconButton>
        {!hidden && layout === 'vertical' ? (
          <MuiMaterial.Typography sx={{ color: 'text.disabled', userSelect: 'none' }}>
            {t('search')} (Ctrl+/)
          </MuiMaterial.Typography>
        ) : null}
        {openDialog && (
          <Dialog fullScreen={fullScreenDialog} fullWidth onClose={() => setOpenDialog(false)} open={openDialog}>
            <MuiMaterial.Box sx={{ position: 'sticky', top: 0, width: '100%' }}>
              <Autocomplete
                autoHighlight
                disablePortal
                getOptionLabel={option => option.title}
                groupBy={option => (searchValue.length ? categoryTitle[option.category] : '')}
                id='appBar-search'
                isOptionEqualToValue={() => true}
                noOptionsText={<NoResult setOpenDialog={setOpenDialog} value={searchValue} />}
                onChange={(event, obj) => handleOptionClick(obj)}
                onInputChange={(event, value) => setSearchValue(value)}
                options={Options()}
                renderInput={params => {
                  return (
                    <MuiMaterial.TextField
                      inputRef={input => {
                        if (input) {
                          if (openDialog) {
                            input.focus()
                          } else {
                            input.blur()
                          }
                        }
                      }}
                      onChange={event => setSearchValue(event.target.value)}
                      value={searchValue}
                      {...params}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <MuiMaterial.InputAdornment
                            onClick={() => setOpenDialog(false)}
                            position='end'
                            sx={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
                          >
                            {!hidden ? (
                              <MuiMaterial.Typography sx={{ color: 'text.disabled', mr: 2.5 }}>
                                [esc]
                              </MuiMaterial.Typography>
                            ) : null}
                            <MuiMaterial.IconButton size='small' sx={{ p: 1 }}>
                              <Icon icon='tabler:x' fontSize='1.25rem' />
                            </MuiMaterial.IconButton>
                          </MuiMaterial.InputAdornment>
                        ),
                        startAdornment: (
                          <MuiMaterial.InputAdornment position='start' sx={{ color: 'text.primary' }}>
                            <Icon fontSize='1.5rem' icon='tabler:search' />
                          </MuiMaterial.InputAdornment>
                        ),
                        sx: { p: `${theme.spacing(3.75, 6)} !important`, '&.Mui-focused': { boxShadow: 0 } }
                      }}
                    />
                  )
                }}
                renderOption={(props, option) => {
                  return searchValue.length ? (
                    <MuiMaterial.ListItem
                      className={`suggestion ${props.className}`}
                      key={option.title}
                      onClick={() => handleOptionClick(option)}
                      secondaryAction={<Icon icon='tabler:corner-down-left' fontSize='1.25rem' />}
                      sx={{
                        '& .MuiListItemSecondaryAction-root': {
                          '& svg': {
                            color: 'text.disabled',
                            cursor: 'pointer'
                          }
                        }
                      }}
                      {...props}
                    >
                      <MuiMaterial.ListItemButton
                        sx={{
                          py: 2.5,
                          px: `${theme.spacing(6)} !important`,
                          '& svg': { mr: 2.5, color: 'text.primary' }
                        }}
                      >
                        <Icon fontSize='1.25rem' icon={option.icon || themeConfig.navSubItemIcon} />
                        <MuiMaterial.Typography sx={{ color: 'text.primary' }} variant='body2'>
                          {option.title}
                        </MuiMaterial.Typography>
                      </MuiMaterial.ListItemButton>
                    </MuiMaterial.ListItem>
                  ) : null
                }}
                sx={{
                  '& + .MuiAutocomplete-popper': {
                    ...(searchValue.length
                      ? {
                          borderTop: `1px solid ${theme.palette.divider}`,
                          height: fullScreenDialog ? 'calc(100vh - 69px)' : 481,
                          maxHeight: 'calc(100vh - 69px)',
                          overflow: 'auto',
                          '& .MuiListSubheader-root': { p: theme.spacing(3.75, 6, 0.75) }
                        }
                      : {
                          '& .MuiAutocomplete-listbox': { pb: 0 }
                        })
                  }
                }}
              />
            </MuiMaterial.Box>
            {searchValue.length === 0 ? (
              <MuiMaterial.Box
                sx={{
                  alignItems: 'center',
                  borderTop: `1px solid ${theme.palette.divider}`,
                  display: 'grid',
                  height: fullScreenDialog ? 'calc(100vh - 69px)' : '100%',
                  justifyContent: 'center',
                  overflow: 'auto',
                  p: 10
                }}
              >
                <DefaultSuggestions setOpenDialog={setOpenDialog} />
              </MuiMaterial.Box>
            ) : null}
          </Dialog>
        )}
      </MuiMaterial.Box>
    )
  }
}

const Autocomplete = styled(MuiMaterial.Autocomplete)(({ theme }) => ({
  '& fieldset': {
    border: 0
  },
  '& + .MuiAutocomplete-popper': {
    '& .MuiAutocomplete-listbox': {
      height: '100%',
      maxHeight: 'inherit',
      paddingTop: 0,
      '& .MuiListSubheader-root': {
        color: theme.palette.text.disabled,
        letterSpacing: '1px',
        lineHeight: '15px',
        fontSize: '0.75rem',
        fontWeight: 400,
        top: 0
      }
    },
    '& .MuiAutocomplete-paper': {
      border: 0,
      borderRadius: 0,
      boxShadow: 'none',
      height: '100%'
    },
    '& .MuiListItem-root.suggestion': {
      padding: 0,
      '& .MuiListItemSecondaryAction-root': {
        display: 'flex'
      },
      '&.Mui-focused.Mui-focusVisible, &:hover': {
        backgroundColor: theme.palette.action.hover
      },
      '& .MuiListItemButton-root: hover': {
        backgroundColor: 'transparent'
      },
      '&:not(:hover)': {
        '& .MuiListItemSecondaryAction-root': {
          display: 'none'
        },
        '&.Mui-focused, &.Mui-focused.Mui-focusVisible:not(:hover)': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'flex'
          }
        },
        [theme.breakpoints.down('sm')]: {
          '&.Mui-focused:not(.Mui-focusVisible) .MuiListItemSecondaryAction-root': {
            display: 'none'
          }
        }
      }
    },
    '& .MuiAutocomplete-noOptions': {
      alignItems: 'center',
      display: 'grid',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100%',
      padding: theme.spacing(10)
    }
  }
}))

const Dialog = styled(MuiMaterial.Dialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)'
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550
    }
  }
})

export default AutocompleteComponent
