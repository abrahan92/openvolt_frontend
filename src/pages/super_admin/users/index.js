import * as R from 'ramda'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import { getUsers } from 'src/services/usersService'
import { getRoles } from 'src/services/rolesService'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { handleRoles } from 'src/store/slices/rolesSlice'
import { handleUsers } from 'src/store/slices/usersSlice'
import PageHeader from 'src/@core/components/page-header'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { userValidation } from 'src/validations/userValidation'
import CustomLoader from 'src/@core/components/custom/CustomLoader'
import DataGridHeader from 'src/views/super_admin/users/DataGridHeader'
import DeleteUserDialog from 'src/views/super_admin/users/DeleteUserDialog'
import ConfirmUserDialog from 'src/views/super_admin/users/ConfirmUserDialog'
import { useState, useEffect, useCallback, useContext, Fragment } from 'react'
import CreateUpdateUserDrawer from 'src/views/super_admin/users/CreateUpdateUserDrawer'
import { Card, Backdrop, Box, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [role, setRole] = useState('')
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ability = useContext(AbilityContext)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const { roles } = useSelector(store => store.roles)
  const [refreshing, setRefreshing] = useState(false)
  const { users } = useSelector(store => store.users)
  const [dialogTitle, setDialogTitle] = useState('add')
  const [openConfirm, setOpenConfirm] = useState(false)
  const [platformAccess, setPlatformAccess] = useState('')
  const { userData } = useSelector(store => store.authentication)

  const [tempStore, setTempStore] = useState(users)

  const defaultValues = {
    account_type: '',
    email: '',
    id: null,
    lastname: '',
    platform_access: '',
    password: '',
    password_confirmation: '',
    name: '',
    role: ''
  }

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(userValidation(t))
  })

  const columns = [
    {
      field: 'userRecord',
      headerName: t('user'),
      minWidth: 380,
      renderCell: ({ row }) => (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          {row?.picture_url ? (
            <CustomAvatar src={row.picture_url} sx={{ height: 38, mr: 2.5, width: 38 }} />
          ) : (
            <CustomAvatar color='success' skin='light'>
              {getInitials(`${row?.name?.split(' ', 2)} ${row?.lastname?.split(' ', 2)}`)}
            </CustomAvatar>
          )}
          <Box
            sx={{
              alignItems: 'flex-start',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 3
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>
              {row.name} {row.lastname}
            </Typography>
            <Typography sx={{ color: 'text.disabled' }} variant='body2'>
              {row.email}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'access_type',
      headerName: t('access_type'),
      minWidth: 180,
      renderCell: ({ row }) => {
        return <CustomChip color='primary' label={row.properties?.platform_access} rounded skin='light' />
      }
    },
    {
      field: 'name',
      headerName: t('name'),
      minWidth: 170,
      renderCell: ({ row }) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>
      }
    },
    {
      field: 'lastname',
      headerName: t('last_name'),
      minWidth: 170,
      renderCell: ({ row }) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.lastname}</Typography>
      }
    },
    {
      field: 'confirmation_status',
      headerName: t('confirmation_status'),
      minWidth: 190,
      renderCell: ({ row }) => {
        return (
          <CustomChip
            color={row.confirmed_at ? 'success' : 'warning'}
            label={row.confirmed_at ? t('confirmed') : t('pending')}
            skin='light'
            rounded
          />
        )
      }
    },
    {
      field: 'created_at',
      flex: 0.15,
      headerName: t('created_at'),
      minWidth: 190,
      renderCell: ({ row }) => {
        return (
          <Typography sx={{ color: 'text.secondary' }}>{format(new Date(row.created_at), 'dd-MM-yyyy')}</Typography>
        )
      }
    },
    {
      field: 'updated_at',
      flex: 0.15,
      headerName: t('updated_at'),
      minWidth: 190,
      renderCell: ({ row }) => {
        return (
          <Typography sx={{ color: 'text.secondary' }}>{format(new Date(row.updated_at), 'dd-MM-yyyy')}</Typography>
        )
      }
    },
    {
      flex: 0.15,
      field: 'actions',
      headerName: t('actions'),
      hide:
        !ability.can('update', `${userData?.default_role?.name}_users`) &&
        !ability.can('delete', `${userData?.default_role?.name}_users`),
      minWidth: 160,
      renderCell: ({ row }) => (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          {ability.can('update', `${userData?.default_role?.name}_users`) && (
            <Tooltip arrow placement='top' title={t('update_user')}>
              <IconButton
                color='warning'
                onClick={() => {
                  reset(defaultValues)

                  setValue('account_type', row.properties.account_type)

                  setValue('email', row.email)

                  setValue('id', row.id)

                  setValue('lastname', row.lastname)

                  setValue('name', row.name)

                  setValue('password', '12345678')

                  setValue('password_confirmation', '12345678')

                  setValue('platform_access', row.properties.platform_access)

                  setValue('role', row.roles[0].id)

                  fetchData('update')
                }}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          )}
          {ability.can('delete', `${userData?.default_role?.name}_users`) && (
            <Tooltip arrow placement='top' title={t('delete_user')}>
              <IconButton
                color='error'
                onClick={() => {
                  reset(defaultValues)

                  setValue('email', row.email)

                  setValue('id', row.id)

                  fetchData('delete')
                }}
              >
                <Icon icon='tabler:trash' />
              </IconButton>
            </Tooltip>
          )}
          {R.isNil(row.confirmed_at) && (
            <Tooltip arrow placement='top' title={t('confirm_user_email')}>
              <IconButton
                color='success'
                onClick={() => {
                  reset(defaultValues)

                  setValue('email', row.email)

                  setValue('id', row.id)

                  setOpenConfirm(true)
                }}
              >
                <Icon icon='tabler:mail-plus' />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
      sortable: false
    }
  ]

  const fetchData = dialogTitle => {
    setDialogTitle(dialogTitle)

    if (dialogTitle === 'add') {
      reset(defaultValues)
    }

    setOpen(true)
  }

  const handleRoleChange = e => {
    setPlatformAccess('')

    setRole(e.target.value)
  }

  const handlePlatformAccessChange = e => {
    setRole('')

    setPlatformAccess(e.target.value)
  }

  const handleFilter = useCallback(val => setSearch(val), [])

  useEffect(() => {
    const filterByRole = (role, users) => {
      const filteredUsers = users.filter(user => {
        return user.roles.some(roleItem => roleItem.id === role)
      })

      setTempStore(filteredUsers)

      return filteredUsers
    }

    const filterFunc = role => {
      if (!R.isEmpty(users) && !R.isNil(users)) {
        const mainFilteredArray = role ? filterByRole(role, users) : users

        const predicate = R.anyPass([
          R.propSatisfies(R.includes(search), ['email']),
          R.propSatisfies(R.includes(search), ['lastname']),
          R.propSatisfies(R.includes(search), ['name'])
        ])

        const filteredArray = R.filter(predicate, mainFilteredArray)

        setTempStore(filteredArray)
      }
    }

    setTimeout(() => {
      if (R.isEmpty(search) && R.isEmpty(role)) {
        setTempStore(users)
      } else if (!R.isEmpty(search) && !R.isEmpty(role)) {
        filterFunc(role)
      } else if (!R.isEmpty(search) && R.isEmpty(role)) {
        filterFunc()
      } else {
        filterByRole(role, users)
      }
    }, 100)
  }, [role, search, users])

  useEffect(() => {
    const filterByplatformAccess = (platformAccess, users) => {
      const filterUsersByplatformAccess = platformAccess =>
        R.filter(R.pathEq(['properties', 'platform_access'], platformAccess), users)

      const filteredUsers = filterUsersByplatformAccess(platformAccess)

      setTempStore(filteredUsers)

      return filteredUsers
    }

    const filterFunc = platformAccess => {
      if (!R.isEmpty(users) && !R.isNil(users)) {
        const mainFilteredArray = platformAccess ? filterByplatformAccess(platformAccess, users) : users

        const predicate = R.anyPass([
          R.propSatisfies(R.includes(search), ['email']),
          R.propSatisfies(R.includes(search), ['lastname']),
          R.propSatisfies(R.includes(search), ['name'])
        ])

        const filteredArray = R.filter(predicate, mainFilteredArray)

        setTempStore(filteredArray)
      }
    }

    if (R.isEmpty(search) && R.isEmpty(platformAccess)) {
      setTempStore(users)
    } else if (!R.isEmpty(search) && !R.isEmpty(platformAccess)) {
      filterFunc(platformAccess)
    } else if (!R.isEmpty(search) && R.isEmpty(platformAccess)) {
      filterFunc()
    } else {
      filterByplatformAccess(platformAccess, users)
    }
  }, [platformAccess, search, users])

  useEffect(() => {
    const fetchData = async () => {
      if (R.isNil(users) || R.isEmpty(users)) {
        try {
          const { data } = await getUsers()

          dispatch(handleUsers(data))
        } catch (error) {
          console.log(error)
        }
      }

      setLoading(false)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users])

  useEffect(() => {
    const fetchData = async () => {
      if (R.isNil(roles) || R.isEmpty(roles)) {
        try {
          const { data } = await getRoles()

          dispatch(handleRoles(data))
        } catch (error) {
          console.log(error)
        }
      }

      setLoading(false)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  return (
    <Fragment>
      <Grid container spacing={6.5}>
        <PageHeader
          title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h5'>{t('users_list')}</Typography>
              <Tooltip arrow placement='right' title={t('refresh')}>
                <span>
                  <IconButton
                    aria-label='collapse'
                    disabled={loading || refreshing}
                    onClick={async () => {
                      setRefreshing(true)

                      try {
                        const { data: rolesData } = await getRoles()

                        const { data: usersData } = await getUsers()

                        dispatch(handleRoles(rolesData))

                        dispatch(handleUsers(usersData))
                      } catch (error) {
                        console.log(error)
                      }

                      setRefreshing(false)
                    }}
                    size='medium'
                    sx={{ color: 'text.secondary' }}
                  >
                    <Icon icon='tabler:reload' fontSize={20} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          }
        />
        <Grid item xs={12}>
          {loading ? (
            <CustomLoader />
          ) : (
            <Card sx={{ position: 'relative' }}>
              <DataGridHeader
                fetchData={fetchData}
                handleFilter={handleFilter}
                handlePlatformAccessChange={handlePlatformAccessChange}
                handleRoleChange={handleRoleChange}
                platformAccess={platformAccess}
                role={role}
                search={search}
              />
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={tempStore}
                columns={columns}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 25, 50]}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
              />
              <Backdrop
                open={refreshing}
                sx={{
                  alignItems: 'center',
                  color: 'common.white',
                  justifyContent: 'center',
                  position: 'absolute',
                  zIndex: theme => theme.zIndex.mobileStepper - 1
                }}
              >
                <CircularProgress color='inherit' />
              </Backdrop>
            </Card>
          )}
        </Grid>
      </Grid>
      <DeleteUserDialog getValues={getValues} open={open && dialogTitle === 'delete'} setOpen={setOpen} />
      <CreateUpdateUserDrawer
        control={control}
        dialogTitle={dialogTitle}
        errors={errors}
        handleSubmit={handleSubmit}
        open={open && dialogTitle !== 'delete'}
        setOpen={setOpen}
      />
      <ConfirmUserDialog getValues={getValues} open={openConfirm} setOpen={setOpenConfirm} />
    </Fragment>
  )
}

Users.acl = {
  action: 'read',
  subject: 'super_admin_users'
}

export default Users
