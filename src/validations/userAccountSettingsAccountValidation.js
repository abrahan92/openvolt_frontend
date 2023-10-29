import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const userAccountSettingsAccountSchema = t => {
  return yup.object().shape({
    email: yup
      .string()
      .email(`${t('the_field')} “${t('email')}” ${t('must_be_a_valid_email')}.`)
      .required(`${t('the_field')} “${t('email')}” ${t('is_required')}.`),
    lastName: yup
      .string()
      .min(2, obj => showErrors('last_name', obj.value.length, obj.min, t))
      .required(),
    name: yup
      .string()
      .min(2, obj => showErrors('name', obj.value.length, obj.min, t))
      .required()
  })
}
