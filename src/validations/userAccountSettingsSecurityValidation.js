import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const userAccountSettingsSecuritySchema = t => {
  return yup.object().shape({
    confirmNewPassword: yup
      .string()
      .min(8, obj => showErrors('confirm_new_password', obj.value.length, obj.min, t))
      .required(`${t('the_field')} “${t('confirm_new_password')}” ${t('is_required')}.`)
      .oneOf([yup.ref('newPassword')], t('passwords_must_match')),
    currentPassword: yup
      .string()
      .min(8, obj => showErrors('current_password', obj.value.length, obj.min, t))
      .required(`${t('the_field')} “${t('current_password')}” ${t('is_required')}.`),
    newPassword: yup
      .string()
      .min(8, obj => showErrors('new_password', obj.value.length, obj.min, t))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        `${t('must_contain_8_characters_1_uppercase_1_lowercase_1_number_and_1_special_case_character')}.`
      )
      .required(`${t('the_field')} “${t('new_password')}” ${t('is_required')}.`)
  })
}
