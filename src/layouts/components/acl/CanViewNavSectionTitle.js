import { Fragment, useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavSectionTitle = ({ children, navTitle }) => {
  const ability = useContext(AbilityContext)

  return ability && ability.can(navTitle?.action, navTitle?.subject) ? <Fragment>{children}</Fragment> : null
}

export default CanViewNavSectionTitle
