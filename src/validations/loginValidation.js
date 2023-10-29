import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const loginSchema = t => {
  return yup.object().shape({
    email: yup
      .string()
      .email(`${t('the_field')} “${t('email')}” ${t('must_be_a_valid_email')}.`)
      .required(`${t('the_field')} “${t('email')}” ${t('is_required')}.`),
    password: yup
      .string()
      .min(6, obj => showErrors('password', obj.value.length, obj.min, t))
      .required()
  })
}
