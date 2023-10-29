import { Fragment, useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavLink = ({ children, navLink }) => {
  const ability = useContext(AbilityContext)

  return ability && ability.can(navLink?.action, navLink?.subject) ? <Fragment>{children}</Fragment> : null
}

export default CanViewNavLink
