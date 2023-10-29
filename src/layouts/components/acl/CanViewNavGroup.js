import { Fragment, useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const CanViewNavGroup = ({ children, navGroup }) => {
  const ability = useContext(AbilityContext)

  const checkForVisibleChild = arr => {
    return arr.some(i => {
      if (i.children) {
        return checkForVisibleChild(i.children)
      } else {
        return ability?.can(i.action, i.subject)
      }
    })
  }

  const canViewMenuGroup = item => {
    const hasAnyVisibleChild = item.children && checkForVisibleChild(item.children)
    if (!(item.action && item.subject)) {
      return hasAnyVisibleChild
    }

    return ability && ability.can(item.action, item.subject) && hasAnyVisibleChild
  }

  return navGroup && canViewMenuGroup(navGroup) ? <Fragment>{children}</Fragment> : null
}

export default CanViewNavGroup
