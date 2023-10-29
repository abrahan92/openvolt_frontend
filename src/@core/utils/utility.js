import * as R from 'ramda'
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

export const handlePermissionCheckbox = ({ action_perform, getValues, permission, permissions, setValue, subject }) => {
  const recordIndexInArray = getValues('permissions')?.findIndex(record => {
    return record?.id === permission?.id
  })

  if (!R.isNil(permission?.id)) {
    setValue('permissions', [
      ...getValues('permissions')?.slice(0, recordIndexInArray),
      ...getValues('permissions').slice(recordIndexInArray + 1)
    ])
  } else {
    const recordIndexInArray = permissions?.findIndex(record => {
      return record?.subject === subject && record?.action_perform === action_perform
    })

    const newPermissions = [
      ...getValues('permissions'),
      {
        id: permissions[recordIndexInArray]?.id,
        action_perform,
        subject
      }
    ].sort(function (a, b) {
      return a?.id - b?.id
    })

    setValue('permissions', newPermissions)
  }
}

export const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

export const isUserLoggedIn = () => {
  // let is_logged_in = false
  // const token_jwt = Cookies.get(process.env.NEXT_PUBLIC_SESSION_EXPIRATION_NAME)

  // if (!R.isNil(token_jwt)) {
  //   jwt.verify(token_jwt, process.env.NEXT_PUBLIC_SESSION_EXPIRATION_TOKEN, function (err, decoded) {
  //     if (err) {
  //       is_logged_in = false
  //     }

  //     if (decoded < new Date().getTime()) {
  //       is_logged_in = false
  //     } else if (!R.isNil(decoded)) {
  //       is_logged_in = true
  //     } else {
  //       is_logged_in = false
  //     }
  //   })
  // }

  // return is_logged_in

  const userData = JSON.parse(localStorage.getItem('userData'))

  if (!R.isNil(userData)) {
    return true
  }

  return false
}

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const showErrors = (field, valueLen, min, t) => {
  if (valueLen === 0) {
    return `${t('the_field')} “${t(field)}” ${t('is_required')}.`
  } else if (valueLen > 0 && valueLen < min) {
    return `${t('the_field')} “${t(field)}” ${t('must_be_at_least')} ${min} ${t('characters')}.`
  } else {
    return ''
  }
}
