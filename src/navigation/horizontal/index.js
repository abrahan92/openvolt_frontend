export const horizontalNavigationSuperAdmin = () => {
  return [
    {
      title: 'super_admin_menu',
      icon: 'ic:twotone-admin-panel-settings',
      children: [
        {
          title: 'home',
          icon: 'tabler:circle',
          path: '/super_admin/home',
          action: 'read',
          subject: 'super_admin_home'
        },
        {
          title: 'categories',
          icon: 'tabler:circle',
          path: '/super_admin/categories',
          action: 'read',
          subject: 'super_admin_categories'
        },
        {
          title: 'measurement_units',
          icon: 'tabler:circle',
          path: '/super_admin/measurement_units',
          action: 'read',
          subject: 'super_admin_measurement_units'
        },
        {
          title: 'partnership_requests',
          icon: 'tabler:circle',
          path: '/super_admin/partnership_requests',
          action: 'read',
          subject: 'super_admin_partnership_requests'
        },
        {
          title: 'roles_and_permissions',
          icon: 'tabler:circle',
          children: [
            {
              title: 'roles',
              path: '/super_admin/roles',
              action: 'read',
              subject: 'super_admin_roles'
            },
            {
              title: 'permissions',
              path: '/super_admin/permissions',
              action: 'read',
              subject: 'super_admin_permissions'
            }
          ]
        },
        {
          title: 'users',
          icon: 'tabler:circle',
          path: '/super_admin/users',
          action: 'read',
          subject: 'super_admin_users'
        }
      ]
    },
    {
      title: 'my_information',
      icon: 'tabler:user',
      children: [
        {
          title: 'account',
          path: '/user-account-settings/account',
          action: 'read',
          subject: 'user_account_settings'
        },
        {
          title: 'security',
          path: '/user-account-settings/security',
          action: 'read',
          subject: 'user_account_settings'
        }
      ]
    }
  ]
}

export const horizontalNavigationHealthProfessional = () => {
  return [
    {
      title: 'home',
      icon: 'tabler:smart-home',
      path: '/health_professional/home',
      action: 'read',
      subject: 'health_professional_home'
    },
    {
      title: 'user_account_settings',
      icon: 'tabler:user-cog',
      children: [
        {
          title: 'account',
          icon: 'tabler:user',
          path: '/health_professional/user_account_settings/account',
          action: 'read',
          subject: 'health_professional_user_account_settings_account'
        },
        {
          title: 'security',
          icon: 'tabler:lock',
          path: '/health_professional/user_account_settings/security',
          action: 'read',
          subject: 'health_professional_user_account_settings_security'
        }
      ]
    }
  ]
}
