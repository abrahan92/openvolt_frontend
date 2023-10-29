import { toast } from 'react-hot-toast'
import { Fragment, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'src/@core/components/custom/CustomButton'
import { deletePartnershipRequest } from 'src/services/partnershipRequestsService'
import { handleDeletePartnershipRequest } from 'src/store/slices/partnershipRequestsSlice'
import { Box, Dialog, DialogActions, DialogTitle, IconButton, Typography } from '@mui/material'

const DeletePartnershipRequestDialog = ({ dialogTitle, getValues, open, setOpen }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleting, setDeleting] = useState(false)
  const { partnershipRequests } = useSelector(store => store.partnershipRequests)

  const onSubmit = async e => {
    e.preventDefault()

    setDeleting(true)

    try {
      await deletePartnershipRequest({ id: getValues('id') })

      const recordIndexInArray = partnershipRequests?.findIndex(record => record?.id === getValues('id'))

      dispatch(handleDeletePartnershipRequest(recordIndexInArray))

      setOpen(false)

      toast.success(t('partnership_request_deleted_successfully'))
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
          {t('delete')} {t('partnership_request')}
        </Typography>
        <Typography sx={{ my: 2 }} variant='body2'>
          {t('are_you_sure_you_want_to_delete_the_partnership_request')}{' '}
          {dialogTitle === 'delete' && (
            <Fragment>
              <CustomChip color='primary' label={getValues('company_name')} rounded skin='light' />
              {'?'}
            </Fragment>
          )}
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

export default DeletePartnershipRequestDialog
