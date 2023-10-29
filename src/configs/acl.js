import { AbilityBuilder, Ability } from '@casl/ability'

export const AppAbility = Ability

const defineRulesFor = (default_role, permissions) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  permissions.forEach(permission => {
    can(permission.action_perform, `${default_role}_${permission.subject}`)
  })

  return rules
}

export const buildAbilityFor = (default_role, permissions) => {
  return new AppAbility(defineRulesFor(default_role, permissions), {
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
