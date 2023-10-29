import * as R from 'ramda'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { isUserLoggedIn } from 'src/@core/utils/utility'

const AuthGuard = ({ children, fallback }) => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }

      if (R.isNil(auth.user) && !isUserLoggedIn()) {
        if (router.asPath !== '/') {
          router.replace({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/login')
        }
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (auth.loading || R.isNil(auth.user)) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default AuthGuard
