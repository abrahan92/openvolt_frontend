import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Fragment, useEffect } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { isUserLoggedIn } from 'src/@core/utils/utility'

const GuestGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter()
  const { userData } = useSelector(store => store?.authentication)

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (isUserLoggedIn()) {
      const user_path = userData?.default_role?.name

      router.push(`${user_path}/home`)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])

  if (auth.loading) {
    return fallback
  }

  return <Fragment>{children}</Fragment>
}

export default GuestGuard
