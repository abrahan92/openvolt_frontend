import * as R from 'ramda'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'src/@core/components/page-header'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { getPermissions } from 'src/services/permissionsService'
import CustomLoader from 'src/@core/components/custom/CustomLoader'
import { handlePermissions } from 'src/store/slices/permissionsSlice'
import NoRowsOverlay from 'src/@core/components/shared/NoRowsOverlay'
import { permissionValidation } from 'src/validations/permissionValidation'
import DataGridHeader from 'src/views/super_admin/permissions/DataGridHeader'
import { useState, useEffect, useCallback, Fragment, useContext } from 'react'
import { Backdrop, Box, Card, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import CreateUpdateDeletePermissionDialog from 'src/views/super_admin/permissions/CreateUpdateDeletePermissionDialog'

const Permissions = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ability = useContext(AbilityContext)
  const [loading, setLoading] = useState(true)
  const [pageSize, setPageSize] = useState(10)
  const [refreshing, setRefreshing] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('add')
  const { permissions } = useSelector(store => store.permissions)
  const { userData } = useSelector(store => store.authentication)

  const [tempStore, setTempStore] = useState(permissions)

  const defaultValues = {
    action_perform: '',
    id: null,
    subject: ''
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
    resolver: yupResolver(permissionValidation(t))
  })

  const columns = [
    {
      field: 'action_perform',
      flex: 0.15,
      headerName: t('action_perform'),
      minWidth: 170,
      renderCell: ({ row }) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.action_perform}</Typography>
      }
    },
    {
      field: 'subject',
      flex: 0.15,
      headerName: t('subject'),
      minWidth: 120,
      renderCell: ({ row }) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.subject}</Typography>
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
      field: 'actions',
      flex: 0.15,
      headerName: t('actions'),
      hide:
        !ability.can('update', `${userData?.default_role?.name}_permissions`) &&
        !ability.can('delete', `${userData?.default_role?.name}_permissions`),
      minWidth: 120,
      renderCell: ({ row }) => (
        <Box sx={{ alignItems: 'center', display: 'flex' }}>
          {ability.can('update', `${userData?.default_role?.name}_permissions`) && (
            <Tooltip arrow placement='top' title={t('update_permission')}>
              <IconButton
                color='warning'
                onClick={() => {
                  reset(defaultValues)

                  setValue('action_perform', row.action_perform)

                  setValue('id', row.id)

                  setValue('subject', row.subject)

                  fetchData('update')
                }}
              >
                <Icon icon='tabler:edit' />
              </IconButton>
            </Tooltip>
          )}
          {ability.can('delete', `${userData?.default_role?.name}_permissions`) && (
            <Tooltip arrow placement='top' title={t('delete_permission')}>
              <IconButton
                color='error'
                onClick={() => {
                  reset(defaultValues)

                  setValue('action_perform', row.action_perform)

                  setValue('id', row.id)

                  setValue('subject', row.subject)

                  fetchData('delete')
                }}
              >
                <Icon icon='tabler:trash' />
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

  const handleFilter = useCallback(val => setSearch(val), [])

  useEffect(() => {
    if (R.isEmpty(search)) {
      setTempStore(permissions)
    } else {
      if (!R.isEmpty(permissions) && !R.isNil(permissions)) {
        const predicate = R.anyPass([
          R.propSatisfies(R.includes(search), ['action_perform']),
          R.propSatisfies(R.includes(search), ['subject'])
        ])

        const filteredArray = R.filter(predicate, permissions)

        setTempStore(filteredArray)
      }
    }
  }, [permissions, search])

  useEffect(() => {
    const fetchData = async () => {
      if (R.isNil(permissions) || R.isEmpty(permissions)) {
        try {
          const { data } = await getPermissions()

          dispatch(handlePermissions(data))
        } catch (error) {
          console.log(error)
        }
      }

      setLoading(false)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions])

  return (
    <Fragment>
      <Grid container spacing={6}>
        <PageHeader
          title={
            <Box
              className='animate__animated animate__fadeIn animate__faster'
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant='h5'>{t('permissions_list')}</Typography>
              <Tooltip arrow placement='right' title={t('refresh')}>
                <span>
                  <IconButton
                    aria-label='collapse'
                    disabled={loading || refreshing}
                    onClick={async () => {
                      setRefreshing(true)

                      try {
                        const { data } = await getPermissions()

                        dispatch(handlePermissions(data))
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
            <Card className='animate__animated animate__fadeIn animate__faster' sx={{ position: 'relative' }}>
              <DataGridHeader fetchData={fetchData} handleFilter={handleFilter} search={search} />
              <DataGrid
                autoHeight
                columns={columns}
                components={{
                  NoRowsOverlay
                }}
                disableSelectionOnClick
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                pageSize={pageSize}
                rowHeight={tempStore.length > 0 ? 62 : 100}
                rows={tempStore}
                rowsPerPageOptions={[10, 25, 50]}
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
      <CreateUpdateDeletePermissionDialog
        control={control}
        dialogTitle={dialogTitle}
        errors={errors}
        getValues={getValues}
        handleSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  )
}

Permissions.acl = {
  action: 'read',
  subject: 'super_admin_permissions'
}

export default Permissions
