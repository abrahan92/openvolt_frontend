import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import CustomChip from 'src/@core/components/mui/chip'
import { confirmUserEmail } from 'src/services/usersService'
import { handleUpdateUser } from 'src/store/slices/usersSlice'
import CustomButton from 'src/@core/components/custom/CustomButton'
import { Box, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'

const ConfirmUserDialog = ({ getValues, open, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [confirming, setConfirming] = useState(false)

  const onSubmit = async e => {
    e.preventDefault()

    setConfirming(true)

    try {
      const { data } = await confirmUserEmail({ id: getValues('id') })

      dispatch(handleUpdateUser(data))

      setOpen(false)

      toast.success(t('user_confirmed_successfully'))
    } catch (error) {
      setOpen(false)

      toast.error(t('something_went_wrong'))

      console.log(error)
    }

    setConfirming(false)
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
          {t('confirm_user_email')}
        </Typography>
        <Typography sx={{ my: 2 }} variant='body2'>
          {t('are_you_sure_you_want_to_confirm_the_user_email')}{' '}
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
              color='primary'
              endIcon={<></>}
              isDisabled={confirming}
              isLoading={confirming}
              label='confirm'
              loadingLabel='confirming'
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

export default ConfirmUserDialog
