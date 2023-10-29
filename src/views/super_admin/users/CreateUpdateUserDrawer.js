import { toast } from 'react-hot-toast'
import { Fragment, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { Controller } from 'react-hook-form'
import * as MuiMaterial from '@mui/material'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, updateUser } from 'src/services/usersService'
import CustomButton from 'src/@core/components/custom/CustomButton'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import { handleCreateUser, handleUpdateUser } from 'src/store/slices/usersSlice'
import CustomPasswordInput from 'src/@core/components/custom/CustomPasswordInput'

const CreateUpdateUserDrawer = ({ control, dialogTitle, errors, handleSubmit, open, setOpen }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [creating, setCreating] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { roles } = useSelector(state => state.roles)

  const onSubmit = async ({
    account_type,
    email,
    id,
    lastname,
    name,
    platform_access,
    password,
    password_confirmation,
    role
  }) => {
    if (dialogTitle === 'add') {
      setCreating(true)

      const body = {
        email,
        lastname,
        name,
        password,
        password_confirmation,
        properties: {
          account_type,
          platform_access
        },
        roles: [Number(role)]
      }

      try {
        const { data } = await createUser({ body })

        dispatch(handleCreateUser(data))

        setOpen(false)

        toast.success(t('user_created_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setCreating(false)
    } else {
      setUpdating(true)

      const body = {
        email,
        lastname,
        name,
        properties: {
          account_type,
          platform_access
        },
        roles: [Number(role)]
      }

      try {
        const { data } = await updateUser({ body, id })

        dispatch(handleUpdateUser(data))

        setOpen(false)

        toast.success(t('user_updated_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setUpdating(false)
    }
  }

  return (
    <MuiMaterial.Drawer
      anchor='right'
      ModalProps={{ keepMounted: true }}
      onClose={() => setOpen(false)}
      open={open}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      variant='temporary'
    >
      <Header>
        <MuiMaterial.Typography variant='h6'>
          {t(dialogTitle)} {t('user')}
        </MuiMaterial.Typography>
        <MuiMaterial.IconButton onClick={() => setOpen(false)} size='small'>
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </MuiMaterial.IconButton>
      </Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MuiMaterial.Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
          <CustomTextInput
            ariaDescribedBy='user-validation-name-field'
            control={control}
            fullWidth
            isInvalid={errors.name}
            label='name'
            name='name'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='user-validation-last-name-field'
            control={control}
            fullWidth
            isInvalid={errors.lastname}
            label='last_name'
            name='lastname'
            required
            sx={{ mb: 8 }}
            type='text'
          />
          <CustomTextInput
            ariaDescribedBy='user-validation-email-field'
            control={control}
            fullWidth
            isInvalid={errors.email}
            label='email'
            name='email'
            required
            sx={{ mb: 8 }}
            type='email'
          />
          {dialogTitle === 'add' && (
            <Fragment>
              <CustomPasswordInput
                ariaDescribedBy='user-validation-password-field'
                control={control}
                fullWidth
                isInvalid={errors.password}
                label='password'
                name='password'
                required
                sx={{ mb: 8 }}
              />
              <CustomPasswordInput
                ariaDescribedBy='user-validation-password-confirmation-field'
                control={control}
                fullWidth
                isInvalid={errors.password_confirmation}
                label='password_confirmation'
                name='password_confirmation'
                required
                sx={{ mb: 8 }}
              />
            </Fragment>
          )}
          <MuiMaterial.FormControl error={Boolean(errors.role)} fullWidth sx={{ mb: 8 }}>
            <MuiMaterial.InputLabel>{t('Role')}</MuiMaterial.InputLabel>
            <Controller
              control={control}
              name='role'
              render={({ field: { onChange, value } }) => (
                <MuiMaterial.Select error={Boolean(errors.role)} label={t('Role')} onChange={onChange} value={value}>
                  {roles.map(role => (
                    <MuiMaterial.MenuItem key={role.id} name={role.name} value={role.id}>
                      {role.name}
                    </MuiMaterial.MenuItem>
                  ))}
                </MuiMaterial.Select>
              )}
              rules={{ required: true }}
            />
            {errors.role && (
              <MuiMaterial.FormHelperText sx={{ color: 'error.main' }}>
                {errors.role.message}
              </MuiMaterial.FormHelperText>
            )}
          </MuiMaterial.FormControl>
          {/* <MuiMaterial.FormControl error={Boolean(errors.account_type)} fullWidth sx={{ mb: 8 }}>
            <MuiMaterial.InputLabel>{t('account_type')}</MuiMaterial.InputLabel>
            <Controller
              control={control}
              name='account_type'
              render={({ field: { onChange, value } }) => (
                <MuiMaterial.Select
                  error={Boolean(errors.account_type)}
                  label={t('account_type')}
                  onChange={onChange}
                  value={value}
                >
                  <MuiMaterial.MenuItem value='customer'>{t('customer')}</MuiMaterial.MenuItem>
                  <MuiMaterial.MenuItem value='organization'>{t('organization')}</MuiMaterial.MenuItem>
                  <MuiMaterial.MenuItem value='admin'>{t('admin')}</MuiMaterial.MenuItem>
                  <MuiMaterial.MenuItem value='super_admin'>{t('super_admin')}</MuiMaterial.MenuItem>
                </MuiMaterial.Select>
              )}
              rules={{ required: true }}
            />
            {errors.account_type && (
              <MuiMaterial.FormHelperText sx={{ color: 'error.main' }}>
                {errors.account_type.message}
              </MuiMaterial.FormHelperText>
            )}
          </MuiMaterial.FormControl> */}
          <MuiMaterial.FormControl error={Boolean(errors.platform_access)} fullWidth sx={{ mb: 8 }}>
            <MuiMaterial.InputLabel>{t('platform_access')}</MuiMaterial.InputLabel>
            <Controller
              control={control}
              name='platform_access'
              render={({ field: { onChange, value } }) => (
                <MuiMaterial.Select
                  error={Boolean(errors.platform_access)}
                  label={t('platform_access')}
                  onChange={onChange}
                  value={value}
                >
                  <MuiMaterial.MenuItem value='all'>{t('all')}</MuiMaterial.MenuItem>
                  <MuiMaterial.MenuItem value='backoffice'>{t('backoffice')}</MuiMaterial.MenuItem>
                  <MuiMaterial.MenuItem value='web'>{t('web')}</MuiMaterial.MenuItem>
                </MuiMaterial.Select>
              )}
              rules={{ required: true }}
            />
            {errors.platform_access && (
              <MuiMaterial.FormHelperText sx={{ color: 'error.main' }}>
                {errors.platform_access.message}
              </MuiMaterial.FormHelperText>
            )}
          </MuiMaterial.FormControl>
          <MuiMaterial.Box
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
                Boolean(errors.name) ||
                Boolean(errors.lastname) ||
                Boolean(errors.email) ||
                Boolean(errors.password) ||
                Boolean(errors.password_confirmation) ||
                Boolean(errors.role)
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
          </MuiMaterial.Box>
        </MuiMaterial.Box>
      </form>
    </MuiMaterial.Drawer>
  )
}

const Header = styled(MuiMaterial.Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(6)
}))

export default CreateUpdateUserDrawer
