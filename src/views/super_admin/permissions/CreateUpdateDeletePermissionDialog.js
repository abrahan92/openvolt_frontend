import { toast } from 'react-hot-toast'
import { Fragment, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'src/@core/components/custom/CustomButton'
import * as permissionsSlice from 'src/store/slices/permissionsSlice'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import { createPermission, deletePermission, updatePermission } from 'src/services/permissionsService'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'

const CreateUpdateDeletePermissionDialog = ({
  control,
  dialogTitle,
  errors,
  getValues,
  handleSubmit,
  open,
  setOpen
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { permissions } = useSelector(store => store.permissions)

  const onSubmit = async ({ action_perform, id, subject }) => {
    if (dialogTitle === 'add') {
      setCreating(true)

      const body = {
        action_perform,
        subject
      }

      try {
        const { data } = await createPermission({ body })

        dispatch(permissionsSlice.handleCreatePermission(data))

        setOpen(false)

        toast.success(t('permission_created_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setCreating(false)
    } else if (dialogTitle === 'update') {
      setUpdating(true)

      const body = {
        action_perform,
        subject
      }

      try {
        const { data } = await updatePermission({ body, id })

        dispatch(permissionsSlice.handleUpdatePermission(data))

        setOpen(false)

        toast.success(t('permission_updated_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setUpdating(false)
    } else {
      setDeleting(true)

      try {
        await deletePermission({ id })

        const recordIndexInArray = permissions?.findIndex(record => record?.id === id)

        dispatch(permissionsSlice.handleDeletePermission(recordIndexInArray))

        setOpen(false)

        toast.success(t('permission_deleted_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setDeleting(false)
    }
  }

  return (
    <Dialog
      className='animate__animated animate__fadeIn animate__faster'
      fullWidth
      maxWidth='sm'
      onClose={() => setOpen(false)}
      open={open}
    >
      <IconButton onClick={() => setOpen(false)} size='small' sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
        <Icon icon='tabler:x' />
      </IconButton>
      <DialogTitle
        sx={{
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`],
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          textAlign: 'center'
        }}
      >
        <Typography component='span' variant='h5'>
          {t(dialogTitle)} {t('permission')}
        </Typography>
        <Typography sx={{ my: 2 }} variant='body2'>
          {t(dialogTitle === 'delete' ? 'are_you_sure_you_want_to_delete_the_permission' : '')}{' '}
          {dialogTitle === 'delete' && (
            <Fragment>
              <CustomChip
                color='primary'
                label={`${getValues('action_perform')} ${getValues('subject')}`}
                rounded
                skin='light'
              />
              {'?'}
            </Fragment>
          )}
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {dialogTitle !== 'delete' && (
          <DialogContent
            sx={{
              pb: theme => `${theme.spacing(5)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
            }}
          >
            <CustomTextInput
              ariaDescribedBy='permissions-validation-action-perform-field'
              control={control}
              fullWidth
              isInvalid={errors.action_perform}
              label='action_perform'
              name='action_perform'
              required
              sx={{ mb: 8 }}
              type='text'
            />
            <CustomTextInput
              ariaDescribedBy='permissions-validation-subject-field'
              control={control}
              fullWidth
              isInvalid={errors.subject}
              label='subject'
              name='subject'
              required
              type='text'
            />
          </DialogContent>
        )}
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <CustomButton
              color={dialogTitle === 'delete' ? 'error' : 'primary'}
              endIcon={<></>}
              isDisabled={creating || updating || deleting || Boolean(errors.action_perform) || Boolean(errors.subject)}
              isLoading={dialogTitle === 'add' ? creating : dialogTitle === 'update' ? updating : deleting}
              label={dialogTitle === 'delete' ? 'delete' : 'save'}
              loadingLabel={dialogTitle === 'delete' ? 'deleting' : 'saving'}
              type='submit'
              variant='contained'
            />
            <CustomButton color='secondary' label='cancel' onClick={() => setOpen(false)} variant='outlined' />
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default CreateUpdateDeletePermissionDialog
