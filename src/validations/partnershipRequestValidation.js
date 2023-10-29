import * as yup from 'yup'
import { phoneRegExp, showErrors } from 'src/@core/utils/utility'

export const partnershipRequestValidation = t => {
  return yup.object().shape({
    city: yup
      .string()
      .min(2, obj => showErrors('city', obj.value.length, obj.min, t))
      .required(),
    company_name: yup
      .string()
      .min(2, obj => showErrors('company_name', obj.value.length, obj.min, t))
      .required(),
    company_role: yup
      .string()
      .min(2, obj => showErrors('contact_role', obj.value.length, obj.min, t))
      .required(),
    email: yup
      .string()
      .email(`${t('the_field')} “${t('email')}” ${t('must_be_a_valid_email')}.`)
      .required(`${t('the_field')} “${t('email')}” ${t('is_required')}.`),
    full_name: yup
      .string()
      .min(2, obj => showErrors('contact_name', obj.value.length, obj.min, t))
      .required(),
    phone: yup
      .string()
      .matches(phoneRegExp, `${t('the_field')} “${t('phone')}” ${t('must_be_a_valid_phone_number')}.`)
      .required(`${t('phone')} “${t('email')}” ${t('is_required')}.`),
    social_network: yup
      .string()
      .min(2, obj => showErrors('social_network', obj.value.length, obj.min, t))
      .required()
  })
}
