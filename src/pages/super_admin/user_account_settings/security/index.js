import { useState } from 'react'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateUserPassword } from 'src/services/userService'
import CustomButton from 'src/@core/components/custom/CustomButton'
import CustomPasswordInput from 'src/@core/components/custom/CustomPasswordInput'
import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { userAccountSettingsSecuritySchema } from 'src/validations/userAccountSettingsSecurityValidation'

const UserAccountSettingsSecurity = userData => {
  const { t } = useTranslation()
  const [updatingUser, setUpdatingUser] = useState(false)

  const defaultValues = {
    confirmNewPassword: '',
    currentPassword: '',
    newPassword: '',
    id: userData.id
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(userAccountSettingsSecuritySchema(t))
  })

  const onSubmit = async ({ confirmNewPassword, currentPassword, id, newPassword }) => {
    setUpdatingUser(true)

    const body = { confirmNewPassword, currentPassword, newPassword }

    try {
      const { data } = await updateUserPassword({ body, id })

      if (data) {
        toast.success(t('user_updated_successfully'))
      }
    } catch (error) {
      toast.error(t('something_went_wrong'))

      console.log(error)
    }

    setUpdatingUser(false)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title={t('change_password')} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <CustomPasswordInput
                  ariaDescribedBy='user-account-settings-security-tab-validation-current-password-field'
                  control={control}
                  fullWidth
                  isInvalid={errors.currentPassword}
                  label='current_password'
                  name='currentPassword'
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ mt: 0 }}>
              <Grid item xs={12} sm={6}>
                <CustomPasswordInput
                  ariaDescribedBy='user-account-settings-security-tab-validation-new-password-field'
                  control={control}
                  fullWidth
                  isInvalid={errors.newPassword}
                  label='new_password'
                  name='newPassword'
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomPasswordInput
                  ariaDescribedBy='user-account-settings-security-tab-validation-confirm-new-password-field'
                  control={control}
                  fullWidth
                  isInvalid={errors.confirmNewPassword}
                  label='confirm_new_password'
                  name='confirmNewPassword'
                  required
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 500 }}>{t('password_requirements')}</Typography>
                <Box component='ul' sx={{ mb: 0, pl: 6, '& li': { color: 'text.secondary', mb: 1.5 } }}>
                  <li>{t('password_minimum_length')}</li>
                  <li>{t('passwords_must_match')}</li>
                </Box>
              </Grid>
              <Grid className='demo-space-x' item xs={12} sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}>
                <CustomButton
                  color='primary'
                  endIcon={<></>}
                  isDisabled={updatingUser}
                  isLoading={updatingUser}
                  label='save'
                  loadingLabel='saving'
                  sx={{ paddingRight: updatingUser ? 8 : null }}
                  type='submit'
                  variant='contained'
                />
              </Grid>
            </Grid>
          </CardContent>
        </form>
      </Card>
    </Grid>
  )
}

UserAccountSettingsSecurity.acl = {
  action: 'read',
  subject: 'super_admin_user_account_settings_security'
}

export default UserAccountSettingsSecurity
