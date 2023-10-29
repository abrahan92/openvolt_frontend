import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import * as MuiMaterial from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { updateUser } from 'src/services/userService'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'src/@core/components/custom/CustomButton'
import { handleUserData } from 'src/store/slices/authenticationSlice'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import { userAccountSettingsAccountSchema } from 'src/validations/userAccountSettingsAccountValidation'

const UserAccountSettingsAccount = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [userInput, setUserInput] = useState('yes')
  const [updatingUser, setUpdatingUser] = useState(false)
  const { userData } = useSelector(store => store.authentication)
  const [secondDialogOpen, setSecondDialogOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/avatars/profile_avatar.png')

  const defaultValues = {
    checkbox: false,
    email: userData.email,
    id: userData.id,
    lastName: '',
    name: '',
    picture: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(userAccountSettingsAccountSchema(t))
  })

  const handleConfirmation = value => {
    setOpen(false)

    setUserInput(value)

    setSecondDialogOpen(true)
  }

  const handleInputImageChange = file => {
    const reader = new FileReader()

    const { files } = file.target

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)

      reader.readAsDataURL(files[0])

      setValue('picture', files[0])

      if (reader.result !== null) {
        setInputValue(reader.result)
      }
    }
  }

  const handleInputImageReset = () => {
    setInputValue('')

    userData.picture_url ? setImgSrc(userData?.picture_url) : setImgSrc('/images/avatars/profile_avatar.png')
  }

  const onSubmit = async ({ email, id, lastName, name, picture }) => {
    setUpdatingUser(true)

    const body = { email, lastname: lastName, name, picture }

    try {
      const { data } = await updateUser({ body, id })

      if (data) {
        dispatch(handleUserData(data))

        setOpen(false)

        toast.success(t('user_updated_successfully'))
      }
    } catch (error) {
      toast.error(t('something_went_wrong'))

      console.log(error)
    }

    setUpdatingUser(false)
  }

  useEffect(() => {
    userData?.picture_url && setImgSrc(userData?.picture_url)
  }, [])

  return (
    <MuiMaterial.Grid container spacing={6}>
      <MuiMaterial.Grid item xs={12}>
        <MuiMaterial.Card>
          <MuiMaterial.CardHeader title={t('profile_details')} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <MuiMaterial.CardContent sx={{ pt: 0 }}>
              <MuiMaterial.Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='user-account-settings-upload-image'>
                    {t('upload_new_photo')}
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='user-account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    {t('reset')}
                  </ResetButtonStyled>
                  <MuiMaterial.Typography sx={{ mt: 4, color: 'text.disabled' }}>
                    {t('allowed_png_or_jpeg_max_size_of_800K')}
                  </MuiMaterial.Typography>
                </div>
              </MuiMaterial.Box>
            </MuiMaterial.CardContent>
            <MuiMaterial.Divider />
            <MuiMaterial.CardContent>
              <MuiMaterial.Grid container spacing={5}>
                <MuiMaterial.Grid item xs={12} sm={6}>
                  <CustomTextInput
                    ariaDescribedBy='user-account-settings-account-tab-validation-name-field'
                    control={control}
                    fullWidth
                    isInvalid={errors.name}
                    label='name'
                    name='name'
                    required
                    sx={{ mb: 4 }}
                    type='text'
                  />
                </MuiMaterial.Grid>
                <MuiMaterial.Grid item xs={12} sm={6}>
                  <CustomTextInput
                    ariaDescribedBy='user-account-settings-account-tab-validation-lastName-field'
                    control={control}
                    fullWidth
                    isInvalid={errors.lastName}
                    label='last_name'
                    name='lastName'
                    required
                    sx={{ mb: 4 }}
                    type='text'
                  />
                </MuiMaterial.Grid>
                <MuiMaterial.Grid item xs={12} sm={6}>
                  <CustomTextInput
                    ariaDescribedBy='user-account-settings-account-tab-validation-email-field'
                    control={control}
                    fullWidth
                    isInvalid={errors.email}
                    label='email'
                    name='email'
                    required
                    type='email'
                  />
                </MuiMaterial.Grid>
                <MuiMaterial.Grid
                  item
                  xs={12}
                  sx={{ pt: theme => `${theme.spacing(6.5)} !important` }}
                  className='demo-space-x'
                >
                  <CustomButton
                    color='primary'
                    endIcon={<></>}
                    isDisabled={
                      updatingUser || Boolean(errors.email) || Boolean(errors.lastName) || Boolean(errors.name)
                    }
                    isLoading={updatingUser}
                    label='save'
                    loadingLabel='saving'
                    sx={{ paddingRight: updatingUser ? 8 : null }}
                    type='submit'
                    variant='contained'
                  />
                  <MuiMaterial.Button
                    color='secondary'
                    onClick={() => {
                      reset({ ...defaultValues })

                      setInputValue('')

                      userData.picture_url
                        ? setImgSrc(userData?.picture_url)
                        : setImgSrc('/images/avatars/profile_avatar.png')
                    }}
                    variant='outlined'
                  >
                    {t('reset')}
                  </MuiMaterial.Button>
                </MuiMaterial.Grid>
              </MuiMaterial.Grid>
            </MuiMaterial.CardContent>
          </form>
        </MuiMaterial.Card>
      </MuiMaterial.Grid>
      <MuiMaterial.Grid item xs={12}>
        <MuiMaterial.Card>
          <MuiMaterial.CardHeader title={t('delete_account')} />
          <MuiMaterial.CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <MuiMaterial.Box sx={{ mb: 4 }}>
                <MuiMaterial.FormControl>
                  <Controller
                    control={control}
                    name='checkbox'
                    render={({ field }) => (
                      <MuiMaterial.FormControlLabel
                        label={t('i_confirm_my_account_deactivation')}
                        sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                        control={
                          <MuiMaterial.Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                    rules={{ required: true }}
                  />
                  {errors.checkbox && (
                    <MuiMaterial.FormHelperText id='validation-basic-checkbox' sx={{ color: 'error.main' }}>
                      {t('please_confirm_you_want_to_delete_account')}
                    </MuiMaterial.FormHelperText>
                  )}
                </MuiMaterial.FormControl>
              </MuiMaterial.Box>
              <MuiMaterial.Button
                variant='contained'
                color='error'
                type='submit'
                disabled={errors.checkbox !== undefined}
              >
                {t('deactivate_account')}
              </MuiMaterial.Button>
            </form>
          </MuiMaterial.CardContent>
        </MuiMaterial.Card>
      </MuiMaterial.Grid>
      <MuiMaterial.Dialog fullWidth maxWidth='xs' open={open} onClose={() => setOpen(false)}>
        <MuiMaterial.DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <MuiMaterial.Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 6, color: 'warning.main' }
            }}
          >
            <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
            <MuiMaterial.Typography>
              {t('are_you_sure_you_would_like_to_cancel_your_subscription')}
            </MuiMaterial.Typography>
          </MuiMaterial.Box>
        </MuiMaterial.DialogContent>
        <MuiMaterial.DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <MuiMaterial.Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes')}>
            {t('yes')}
          </MuiMaterial.Button>
          <MuiMaterial.Button variant='outlined' color='secondary' onClick={() => handleConfirmation('cancel')}>
            {t('cancel')}
          </MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
      <MuiMaterial.Dialog fullWidth maxWidth='xs' open={secondDialogOpen} onClose={() => setSecondDialogOpen(false)}>
        <MuiMaterial.DialogContent
          sx={{
            pb: theme => `${theme.spacing(6)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <MuiMaterial.Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 8,
                color: userInput === 'yes' ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon fontSize='5.5rem' icon={userInput === 'yes' ? 'tabler:circle-check' : 'tabler:circle-x'} />
            <MuiMaterial.Typography variant='h4' sx={{ mb: 5 }}>
              {userInput === 'yes' ? t('deleted') : t('cancelled')}
            </MuiMaterial.Typography>
            <MuiMaterial.Typography>
              {userInput === 'yes' ? t('your_subscription_is_cancelled_successfully') : t('unsubscription_cancelled')}
            </MuiMaterial.Typography>
          </MuiMaterial.Box>
        </MuiMaterial.DialogContent>
        <MuiMaterial.DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <MuiMaterial.Button variant='contained' color='success' onClick={() => setSecondDialogOpen(false)}>
            {t('ok')}
          </MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    </MuiMaterial.Grid>
  )
}

const ButtonStyled = styled(MuiMaterial.Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ImgStyled = styled('img')(({ theme }) => ({
  width: 100,
  height: 100,
  marginRight: theme.spacing(6),
  borderRadius: theme.shape.borderRadius
}))

const ResetButtonStyled = styled(MuiMaterial.Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}))

UserAccountSettingsAccount.acl = {
  action: 'read',
  subject: 'super_admin_user_account_settings_account'
}

export default UserAccountSettingsAccount
