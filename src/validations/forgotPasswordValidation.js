import * as yup from 'yup'

export const forgotPasswordSchema = t => {
  return yup.object().shape({
    email: yup
      .string()
      .email(`${t('the_field')} “${t('email')}” ${t('must_be_a_valid_email')}.`)
      .required(`${t('the_field')} “${t('email')}” ${t('is_required')}.`)
  })
}
