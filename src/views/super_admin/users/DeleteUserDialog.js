import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import CustomChip from 'src/@core/components/mui/chip'
import { deleteUser } from 'src/services/usersService'
import { useDispatch, useSelector } from 'react-redux'
import { handleDeleteUser } from 'src/store/slices/usersSlice'
import CustomButton from 'src/@core/components/custom/CustomButton'
import { Box, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'

const DeleteUserDialog = ({ getValues, open, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleting, setDeleting] = useState(false)
  const { users } = useSelector(store => store.users)

  const onSubmit = async e => {
    e.preventDefault()

    setDeleting(true)

    try {
      await deleteUser({ id: getValues('id') })

      const recordIndexInArray = users?.findIndex(record => record?.id === getValues('id'))

      dispatch(handleDeleteUser(recordIndexInArray))

      setOpen(false)

      toast.success(t('user_deleted_successfully'))
    } catch (error) {
      setOpen(false)

      toast.error(t('something_went_wrong'))

      console.log(error)
    }

    setDeleting(false)
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
          {t('delete')} {t('user')}
        </Typography>
        <Typography sx={{ my: 2 }} variant='body2'>
          {t('are_you_sure_you_want_to_delete_the_user')}{' '}
          <CustomChip color='primary' label={getValues('email')} rounded skin='light' />
          {'?'}
        </Typography>
      </DialogTitle>
      <form onSubmit={onSubmit}>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(10)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <CustomButton
              color='error'
              endIcon={<></>}
              isDisabled={deleting}
              isLoading={deleting}
              label='delete'
              loadingLabel='deleting'
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

export default DeleteUserDialog
