import * as R from 'ramda'
import { useRouter } from 'next/router'
import NotAuthorized from 'src/pages/401'
import { Fragment, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { buildAbilityFor } from 'src/configs/acl'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const AclGuard = ({ aclAbilities, children, guestGuard }) => {
  const auth = useAuth()
  const router = useRouter()
  const [ability, setAbility] = useState(undefined)

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <Fragment>{children}</Fragment>
  }

  // User is logged in, build ability for the user based on his role
  if (auth?.user && auth?.user?.default_role?.name && R.isNil(ability)) {
    setAbility(buildAbilityFor(auth?.user?.default_role?.name, auth?.user?.permissions))
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
