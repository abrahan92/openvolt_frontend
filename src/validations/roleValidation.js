import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const roleValidation = t => {
  return yup.object().shape({
    name: yup
      .string()
      .min(2, obj => showErrors('role_name', obj.value.length, obj.min, t))
      .required()
  })
}
