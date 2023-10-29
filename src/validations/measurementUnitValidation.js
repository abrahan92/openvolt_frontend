import * as yup from 'yup'
import { showErrors } from 'src/@core/utils/utility'

export const measurementUnitValidation = t => {
  return yup.object().shape({
    description: yup
      .string()
      .min(2, obj => showErrors('description', obj.value.length, obj.min, t))
      .required(),
    key: yup
      .string()
      .min(2, obj => showErrors('key', obj.value.length, obj.min, t))
      .required(),
    name: yup
      .string()
      .min(2, obj => showErrors('name', obj.value.length, obj.min, t))
      .required()
  })
}
