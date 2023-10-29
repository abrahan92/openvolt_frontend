import * as R from 'ramda'
import { toast } from 'react-hot-toast'
import { Fragment, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import CustomChip from 'src/@core/components/mui/chip'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from 'src/@core/components/custom/CustomButton'
import * as categoriesSlice from 'src/store/slices/categoriesSlice'
import CustomTextInput from 'src/@core/components/custom/CustomTextInput'
import CustomSelectNested from 'src/@core/components/custom/CustomSelectNested'
import { createCategory, deleteCategory, updateCategory } from 'src/services/categoriesService'
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'

const CreateUpdateDeleteCategoryDialog = ({
  control,
  dialogTitle,
  errors,
  findParentCategory,
  getValues,
  handleSubmit,
  open,
  parentCategoryId,
  setOpen,
  setParentCategoryId
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { categories } = useSelector(store => store.categories)

  const onSubmit = async ({ description, id, name }) => {
    if (dialogTitle === 'add') {
      setCreating(true)

      const body = {
        description,
        name,
        parent_id: parentCategoryId
      }

      try {
        const { data } = await createCategory({ body })

        dispatch(categoriesSlice.handleCreateCategory(data))

        setOpen(false)

        toast.success(t('category_created_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setCreating(false)
    } else if (dialogTitle === 'update') {
      setUpdating(true)

      const body = {
        description,
        name,
        parent_id: parentCategoryId
      }

      try {
        const { data } = await updateCategory({ body, id })

        dispatch(categoriesSlice.handleUpdateCategory(data))

        setOpen(false)

        toast.success(t('category_updated_successfully'))
      } catch (error) {
        setOpen(false)

        toast.error(t('something_went_wrong'))

        console.log(error)
      }

      setUpdating(false)
    } else {
      setDeleting(true)

      try {
        await deleteCategory({ id })

        const recordIndexInArray = categories?.findIndex(record => record?.id === id)

        dispatch(categoriesSlice.handleDeleteCategory(recordIndexInArray))

        setOpen(false)

        toast.success(t('category_deleted_successfully'))
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
          {t(dialogTitle)} {t('category')}
        </Typography>
        <Typography sx={{ my: 2 }} variant='body2'>
          {t(dialogTitle === 'delete' ? 'are_you_sure_you_want_to_delete_the_category' : '')}{' '}
          {dialogTitle === 'delete' && (
            <Fragment>
              <CustomChip color='primary' label={getValues('name')} rounded skin='light' />
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
              ariaDescribedBy='categories-validation-name-field'
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
              ariaDescribedBy='categories-validation-description-field'
              control={control}
              fullWidth
              isInvalid={errors.description}
              label='description'
              name='description'
              required
              sx={{ mb: 8 }}
              type='text'
            />
            <CustomSelectNested
              findParent={findParentCategory}
              fullWidth
              getValues={getValues}
              isCreate={dialogTitle === 'add'}
              items={R.reject(R.propEq('id', getValues('id')), categories)}
              labelText='parent_category'
              optionId='id'
              optionText='name'
              parentId={parentCategoryId}
              setParentId={setParentCategoryId}
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
              isDisabled={creating || updating || deleting || Boolean(errors.name) || Boolean(errors.description)}
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

export default CreateUpdateDeleteCategoryDialog
