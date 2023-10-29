import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const permissionValidation = t => {
  return yup.object().shape({
    action_perform: yup
      .string()
      .min(2, obj => showErrors('action_perform', obj.value.length, obj.min, t))
      .required(),
    subject: yup
      .string()
      .min(2, obj => showErrors('subject', obj.value.length, obj.min, t))
      .required()
  })
}
