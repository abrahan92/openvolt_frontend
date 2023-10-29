import * as R from 'ramda'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Icon from 'src/@core/components/icon'
import * as MuiMaterial from '@mui/material'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { Fragment, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { roleValidation } from 'src/validations/roleValidation'
import { getPermissions } from 'src/services/permissionsService'
import CreateUpdateDeleteRoleDialog from './CreateUpdateDeleteRoleDialog'
import { handlePermissions, handlePermissionsSubjectList } from 'src/store/slices/permissionsSlice'

const RoleCards = ({ refreshing }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ability = useContext(AbilityContext)
  const { roles } = useSelector(store => store.roles)
  const [dialogTitle, setDialogTitle] = useState('add')
  const { permissions } = useSelector(store => store.permissions)
  const { userData } = useSelector(store => store.authentication)

  const defaultValues = {
    id: null,
    name: '',
    permissions: [],
    total_users: null
  }

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
    setValue,
    watch
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(roleValidation(t))
  })

  const fetchData = async dialogTitle => {
    if (R.isEmpty(permissions)) {
      try {
        const { data } = await getPermissions()

        const permissionsSubjectList = {
          actions: [...new Set(data.map(item => item.action_perform))],
          subjects: [...new Set(data.map(item => item.subject))].sort((a, b) => {
            return a.localeCompare(b)
          })
        }

        dispatch(handlePermissions(data))

        dispatch(handlePermissionsSubjectList(permissionsSubjectList))

        setDialogTitle(dialogTitle)

        if (dialogTitle === 'add') {
          reset(defaultValues)
        }

        setOpen(true)
      } catch (error) {
        console.log(error)
      }
    } else {
      const permissionsSubjectList = {
        actions: [...new Set(permissions.map(item => item.action_perform))],
        subjects: [...new Set(permissions.map(item => item.subject))].sort((a, b) => {
          return a.localeCompare(b)
        })
      }

      dispatch(handlePermissionsSubjectList(permissionsSubjectList))

      setDialogTitle(dialogTitle)

      if (dialogTitle === 'add') {
        reset(defaultValues)
      }

      setOpen(true)
    }
  }

  return (
    <Fragment>
      <MuiMaterial.Grid className='match-height' container spacing={6}>
        {ability.can('create', `${userData?.default_role?.name}_roles`) && (
          <MuiMaterial.Grid item xs={12} sm={6} lg={4}>
            <MuiMaterial.Card
              className='animate__animated animate__fadeIn animate__faster'
              onClick={() => fetchData('add')}
              sx={{ cursor: 'pointer', position: 'relative' }}
            >
              <MuiMaterial.Grid container sx={{ height: '100%' }}>
                <MuiMaterial.Grid item xs={5}>
                  <MuiMaterial.Box
                    sx={{
                      alignItems: 'flex-end',
                      display: 'flex',
                      height: '100%',
                      justifyContent: 'center',
                      minHeight: 140
                    }}
                  >
                    <img alt='add-new-role' height={122} src='/images/pages/add-new-role-illustration.png' />
                  </MuiMaterial.Box>
                </MuiMaterial.Grid>
                <MuiMaterial.Grid item xs={7}>
                  <MuiMaterial.CardContent sx={{ height: '100%', pl: 0 }}>
                    <MuiMaterial.Box sx={{ textAlign: 'right' }}>
                      <MuiMaterial.Button
                        onClick={() => fetchData('add')}
                        sx={{ mb: 3, whiteSpace: 'nowrap' }}
                        variant='contained'
                      >
                        {t('add_new_role')}
                      </MuiMaterial.Button>
                      <MuiMaterial.Typography sx={{ color: 'text.secondary' }}>
                        {t('add_a_new_role_if_it_does_not_exist')}
                      </MuiMaterial.Typography>
                    </MuiMaterial.Box>
                  </MuiMaterial.CardContent>
                </MuiMaterial.Grid>
              </MuiMaterial.Grid>
              <MuiMaterial.Backdrop
                open={refreshing}
                sx={{
                  alignItems: 'center',
                  color: 'common.white',
                  justifyContent: 'center',
                  position: 'absolute',
                  zIndex: theme => theme.zIndex.mobileStepper - 1
                }}
              >
                <MuiMaterial.CircularProgress color='inherit' />
              </MuiMaterial.Backdrop>
            </MuiMaterial.Card>
          </MuiMaterial.Grid>
        )}
        {roles.map((item, index) => (
          <MuiMaterial.Grid item key={index} xs={12} sm={6} lg={4}>
            <MuiMaterial.Card
              className='animate__animated animate__fadeIn animate__faster'
              sx={{ position: 'relative' }}
            >
              <MuiMaterial.CardContent>
                <MuiMaterial.Box
                  sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', mb: 1.5 }}
                >
                  <MuiMaterial.Typography sx={{ color: 'text.secondary' }}>
                    {t('total_users')} {item.total_users}
                  </MuiMaterial.Typography>
                </MuiMaterial.Box>
                <MuiMaterial.Box sx={{ alignItems: 'flex-end', display: 'flex', justifyContent: 'space-between' }}>
                  <MuiMaterial.Box sx={{ alignItems: 'flex-start', display: 'flex', flexDirection: 'column' }}>
                    <MuiMaterial.Typography sx={{ mb: 1 }} variant='h5'>
                      {item.name}
                    </MuiMaterial.Typography>
                    {ability.can('update', `${userData?.default_role?.name}_roles`) && (
                      <MuiMaterial.Typography
                        component={Link}
                        href='/'
                        onClick={e => {
                          e.preventDefault()

                          const { id, name, permissions, total_users } = R.find(R.propEq('id', parseInt(item.id)))(
                            roles
                          )

                          reset(defaultValues)

                          setValue('id', id)

                          setValue('name', name)

                          setValue('permissions', permissions)

                          fetchData('update')
                        }}
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                      >
                        {t('update_role')}
                      </MuiMaterial.Typography>
                    )}
                  </MuiMaterial.Box>
                  {ability.can('delete', `${userData?.default_role?.name}_roles`) && (
                    <MuiMaterial.Tooltip placement='top' title={t('delete_role')}>
                      <MuiMaterial.IconButton
                        onClick={() => {
                          reset(defaultValues)

                          setValue('id', item.id)

                          setValue('name', item.name)

                          setDialogTitle('delete')

                          setOpen(true)
                        }}
                        size='small'
                        sx={{ color: 'text.disabled' }}
                      >
                        <Icon icon='tabler:trash' />
                      </MuiMaterial.IconButton>
                    </MuiMaterial.Tooltip>
                  )}
                </MuiMaterial.Box>
              </MuiMaterial.CardContent>
              <MuiMaterial.Backdrop
                open={refreshing}
                sx={{
                  alignItems: 'center',
                  color: 'common.white',
                  justifyContent: 'center',
                  position: 'absolute',
                  zIndex: theme => theme.zIndex.mobileStepper - 1
                }}
              >
                <MuiMaterial.CircularProgress color='inherit' />
              </MuiMaterial.Backdrop>
            </MuiMaterial.Card>
          </MuiMaterial.Grid>
        ))}
      </MuiMaterial.Grid>
      <CreateUpdateDeleteRoleDialog
        control={control}
        dialogTitle={dialogTitle}
        errors={errors}
        getValues={getValues}
        handleSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        watch={watch}
      />
    </Fragment>
  )
}

export default RoleCards
