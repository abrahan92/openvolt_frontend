import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import CustomButton from 'src/@core/components/custom/CustomButton'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import * as partnershipRequestsSlice from 'src/store/slices/partnershipRequestsSlice'
import { createPartnershipRequest, updatePartnershipRequest } from 'src/services/partnershipRequestsService'

const CreateUpdatePartnershipRequestDrawer = ({ control, dialogTitle, errors, handleSubmit, open, setOpen }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)

  const onSubmit = async ({ company_name, company_role, city, email, full_name, id, phone, social_network }) => {
    if (dialogTitle === 'add') {
      setCreating(true)

      const body = {
        company_name,
        company_role,
        city,
        email,
        full_name,
        phone,
        social_network
      }

      try {
        const { data } = await createPartnershipRequest({ body })

        dispatch(partnershipRequestsSlice.handleCreatePartnershipRequest(data))

        setOpen(false)

        toast.success(t('partnership_request_created_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setCreating(false)
    } else {
      setUpdating(true)

      const body = {
        company_name,
        company_role,
        city,
        email,
        full_name,
        phone,
        social_network
      }

      try {
        const { data } = await updatePartnershipRequest({ body, id })

        dispatch(partnershipRequestsSlice.handleUpdatePartnershipRequest(data))

        setOpen(false)

        toast.success(t('partnership_request_updated_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setUpdating(false)
    }
  }

  return (
    <Drawer
      anchor='right'
      ModalProps={{ keepMounted: true }}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      variant='temporary'
    >
      <Header>
        <Typography variant='h6'>
          {t(dialogTitle)} {t('partnership_request')}
        </Typography>
        <IconButton onClick={() => setOpen(false)} size='small'>
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-company-name-field'
            control={control}
            fullWidth
            isInvalid={errors.company_name}
            label='company_name'
            name='company_name'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-full-name-field'
            control={control}
            fullWidth
            isInvalid={errors.full_name}
            label='contact_name'
            name='full_name'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-company-role-field'
            control={control}
            fullWidth
            isInvalid={errors.company_role}
            label='contact_role'
            name='company_role'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-email-field'
            control={control}
            fullWidth
            isInvalid={errors.email}
            label='email'
            name='email'
            required
            sx={{ mb: 8 }}
            type='email'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-phone-field'
            control={control}
            fullWidth
            isInvalid={errors.phone}
            label='phone'
            name='phone'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-city-field'
            control={control}
            fullWidth
            isInvalid={errors.city}
            label='city'
            name='city'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='partnership-request-validation-social_network-field'
            control={control}
            fullWidth
            isInvalid={errors.social_network}
            label='social_network'
            name='social_network'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <CustomButton
              color='primary'
              endIcon={<></>}
              isDisabled={
                creating ||
                updating ||
                Boolean(errors.city) ||
                Boolean(errors.company_name) ||
                Boolean(errors.company_role) ||
                Boolean(errors.email) ||
                Boolean(errors.full_name) ||
                Boolean(errors.phone) ||
                Boolean(errors.social_network)
              }
              isLoading={dialogTitle === 'add' ? creating : updating}
              label='save'
              loadingLabel='saving'
              sx={{ width: '47%' }}
              type='submit'
              variant='contained'
            />
            <CustomButton
              color='secondary'
              label='cancel'
              onClick={() => setOpen(false)}
              sx={{ width: '47%' }}
              variant='outlined'
            />
          </Box>
        </Box>
      </form>
    </Drawer>
  )
}

const Header = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(6)
}))

export default CreateUpdatePartnershipRequestDrawer
