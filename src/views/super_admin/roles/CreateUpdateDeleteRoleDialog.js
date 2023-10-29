import { toast } from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import * as MuiMaterial from '@mui/material'
import { useTranslation } from 'react-i18next'
import React, { Fragment, useState } from 'react'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import { handlePermissionCheckbox } from 'src/@core/utils/utility'
import CustomButton from 'src/@core/components/custom/CustomButton'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import { getMe } from "src/services/authenticationService";
import { createRole, deleteRole, updateRole } from 'src/services/rolesService'
import { handleUserData, handleLogin } from 'src/store/slices/authenticationSlice'
import { handleCreateRole, handleDeleteRole, handleUpdateRole } from 'src/store/slices/rolesSlice'

const CreateUpdateDeleteRoleDialog = ({
  control,
  dialogTitle,
  errors,
  getValues,
  handleSubmit,
  open,
  setOpen,
  setValue,
  watch
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { roles } = useSelector(store => store.roles)
  const { permissions, permissionsSubjectList } = useSelector(store => store.permissions)

  const onSubmit = async ({ id, name }) => {
    if (dialogTitle === 'add') {
      setCreating(true)

      const body = {
        name,
        permission_ids: getValues('permissions').map(item => item.id)
      }

      try {
        const { data } = await createRole({ body })
        const me = await getMe();

        dispatch(handleLogin(me?.data))
        dispatch(handleCreateRole(data))

        setOpen(false)

        toast.success(t('role_created_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setCreating(false)
    } else if (dialogTitle === 'update') {
      setUpdating(true)

      const body = {
        name,
        permission_ids: getValues('permissions').map(item => item.id)
      }

      try {
        const { data } = await updateRole({ body, id })

        const me = await getMe();

        dispatch(handleLogin(me?.data))
        dispatch(handleUpdateRole(data))

        setOpen(false)

        toast.success(t('role_updated_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setUpdating(false)
    } else {
      setDeleting(true)

      try {
        await deleteRole({ id })

        const recordIndexInArray = roles.findIndex(record => record.id === id)

        dispatch(handleDeleteRole(recordIndexInArray))

        setOpen(false)

        toast.success(t('role_deleted_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setDeleting(false)
    }
  }

  return (
    <MuiMaterial.Dialog
      className='animate__animated animate__fadeIn animate__faster'
      fullWidth
      maxWidth={dialogTitle === 'delete' ? 'sm' : 'md'}
      onClose={() => setOpen(false)}
      open={open}
      scroll='body'
    >
      <MuiMaterial.IconButton
        onClick={() => setOpen(false)}
        size='small'
        sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
      >
        <Icon icon='tabler:x' />
      </MuiMaterial.IconButton>
      <MuiMaterial.DialogTitle
        sx={{
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          textAlign: 'center'
        }}
      >
        <MuiMaterial.Typography component='span' variant='h5'>
          {t(dialogTitle)} {t('role')}
        </MuiMaterial.Typography>
        <MuiMaterial.Typography sx={{ my: 2 }} variant='body2'>
          {t(dialogTitle === 'delete' ? 'are_you_sure_you_want_to_delete_the_role' : '')}{' '}
          {dialogTitle === 'delete' && (
            <Fragment>
              <CustomChip color='primary' label={getValues('name')} rounded skin='light' />
              {'?'}
            </Fragment>
          )}
        </MuiMaterial.Typography>
      </MuiMaterial.DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dialogTitle !== 'delete' && (
          <MuiMaterial.DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <MuiMaterial.Box sx={{ mb: 4 }}>
              <CustomTextInput
                ariaDescribedBy='roles-validation-name-field'
                control={control}
                fullWidth
                isInvalid={errors.name}
                label='role_name'
                name='name'
                required
                sx={{ mb: 4 }}
                type='text'
              />
            </MuiMaterial.Box>
            <MuiMaterial.Typography variant='h6'>{t('permission_ids')}</MuiMaterial.Typography>
            <MuiMaterial.TableContainer>
              <MuiMaterial.Table size='small'>
                <MuiMaterial.TableHead>
                  <MuiMaterial.TableRow>
                    <MuiMaterial.TableCell sx={{ pl: '0 !important' }}>
                      <MuiMaterial.Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          fontSize: '0.875rem',
                          textTransform: 'capitalize',
                          whiteSpace: 'nowrap',
                          '& svg': { ml: 1, cursor: 'pointer' }
                        }}
                      >
                        {t('super_admin_access')}
                        <MuiMaterial.Tooltip arrow placement='top' title={t('allows_a_full_access_to_the_system')}>
                          <MuiMaterial.Box sx={{ display: 'flex' }}>
                            <Icon fontSize='1.25rem' icon='tabler:info-circle' />
                          </MuiMaterial.Box>
                        </MuiMaterial.Tooltip>
                      </MuiMaterial.Box>
                    </MuiMaterial.TableCell>
                    <MuiMaterial.TableCell colSpan={3}>
                      <MuiMaterial.FormControlLabel
                        control={
                          <MuiMaterial.Checkbox
                            checked={watch('permissions').length === permissions.length}
                            onChange={() => {
                              if (dialogTitle === 'add' || dialogTitle === 'update') {
                                if (getValues('permissions').length === permissions.length) {
                                  setValue('permissions', [])
                                } else {
                                  setValue(
                                    'permissions',
                                    permissions.map(permission => {
                                      return {
                                        action_perform: permission.action_perform,
                                        id: permission.id,
                                        subject: permission.subject
                                      }
                                    })
                                  )
                                }
                              }
                            }}
                            size='small'
                          />
                        }
                        label={t('select_all')}
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      />
                    </MuiMaterial.TableCell>
                  </MuiMaterial.TableRow>
                </MuiMaterial.TableHead>
                <MuiMaterial.TableBody>
                  {permissionsSubjectList.subjects.map((subject, index) => (
                    <MuiMaterial.TableRow
                      key={index}
                      sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}
                    >
                      <MuiMaterial.TableCell
                        sx={{
                          color: theme => `${theme.palette.text.primary} !important`,
                          fontWeight: 600,
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {subject}
                      </MuiMaterial.TableCell>
                      {permissionsSubjectList.actions.map((action_perform, index) => (
                        <MuiMaterial.TableCell key={index}>
                          <MuiMaterial.FormControlLabel
                            control={
                              <MuiMaterial.Checkbox
                                checked={
                                  watch('permissions').find(permission => {
                                    return (
                                      permission.subject === subject && permission.action_perform === action_perform
                                    )
                                  })
                                    ? true
                                    : false
                                }
                                disabled={
                                  !permissions.find(permission => {
                                    return (
                                      permission.subject === subject && permission.action_perform === action_perform
                                    )
                                  })
                                }
                                id={`${subject}-${action_perform}`}
                                onChange={() => {
                                  if (dialogTitle === 'add') {
                                    handlePermissionCheckbox({
                                      action_perform,
                                      getValues,
                                      permission: getValues('permissions').find(permission => {
                                        return (
                                          permission.subject === subject && permission.action_perform === action_perform
                                        )
                                      }),
                                      permissions,
                                      setValue,
                                      subject
                                    })
                                  } else if (dialogTitle === 'update') {
                                    handlePermissionCheckbox({
                                      action_perform,
                                      getValues,
                                      permission: getValues('permissions').find(permission => {
                                        return (
                                          permission.subject === subject && permission.action_perform === action_perform
                                        )
                                      }),
                                      permissions,
                                      setValue,
                                      subject
                                    })
                                  }
                                }}
                                size='small'
                              />
                            }
                            label={t(action_perform)}
                          />
                        </MuiMaterial.TableCell>
                      ))}
                    </MuiMaterial.TableRow>
                  ))}
                </MuiMaterial.TableBody>
              </MuiMaterial.Table>
            </MuiMaterial.TableContainer>
          </MuiMaterial.DialogContent>
        )}
        <MuiMaterial.DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          <MuiMaterial.Box className='demo-space-x'>
            <CustomButton
              color={dialogTitle === 'delete' ? 'error' : 'primary'}
              endIcon={<></>}
              isDisabled={creating || updating || deleting || Boolean(errors.name)}
              isLoading={dialogTitle === 'add' ? creating : dialogTitle === 'update' ? updating : deleting}
              label={dialogTitle === 'delete' ? 'delete' : 'save'}
              loadingLabel={dialogTitle === 'delete' ? 'deleting' : 'saving'}
              type='submit'
              variant='contained'
            />
            <CustomButton color='secondary' label='cancel' onClick={() => setOpen(false)} variant='outlined' />
          </MuiMaterial.Box>
        </MuiMaterial.DialogActions>
      </form>
    </MuiMaterial.Dialog>
  )
}

export default CreateUpdateDeleteRoleDialog
