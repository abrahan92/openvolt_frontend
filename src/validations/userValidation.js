import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const userValidation = t => {
  return yup.object().shape({
    // account_type: yup.string().required(`${t('the_field')} “${t('account_type')}” ${t('is_required')}.`),
    email: yup
      .string()
      .email(`${t('the_field')} “${t('email')}” ${t('must_be_a_valid_email')}.`)
      .required(`${t('the_field')} “${t('email')}” ${t('is_required')}.`),
    lastname: yup
      .string()
      .min(2, obj => showErrors('last_name', obj.value.length, obj.min, t))
      .required(),
    name: yup
      .string()
      .min(2, obj => showErrors('name', obj.value.length, obj.min, t))
      .required(),
    password: yup
      .string()
      .min(8, obj => showErrors('password', obj.value.length, obj.min, t))
      .required(`${t('the_field')} “${t('password')}” ${t('is_required')}.`),
    password_confirmation: yup
      .string()
      .min(8, obj => showErrors('password_confirmation', obj.value.length, obj.min, t))
      .required(`${t('the_field')} “${t('password_confirmation')}” ${t('is_required')}.`)
      .oneOf([yup.ref('password')], t('passwords_must_match')),
    platform_access: yup.string().required(`${t('the_field')} “${t('platform_access')}” ${t('is_required')}.`),
    role: yup.string().required(`${t('the_field')} “${t('Role')}” ${t('is_required')}.`)
  })
}
