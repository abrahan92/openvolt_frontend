export const verticalNavigationHealthProfessional = () => {
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

export const verticalNavigationSuperAdmin = () => {
  return [
    {
      title: 'home',
      icon: 'tabler:smart-home',
      path: '/super_admin/home',
      action: 'read',
      subject: 'super_admin_home'
    },
    {
      title: 'categories',
      icon: 'tabler:category-2',
      path: '/super_admin/categories',
      action: 'read',
      subject: 'super_admin_categories'
    },
    {
      title: 'measurement_units',
      icon: 'tabler:box',
      path: '/super_admin/measurement_units',
      action: 'read',
      subject: 'super_admin_measurement_units'
    },
    {
      title: 'partnership_requests',
      icon: 'tabler:zoom-money',
      path: '/super_admin/partnership_requests',
      action: 'read',
      subject: 'super_admin_partnership_requests'
    },
    {
      title: 'permissions',
      icon: 'tabler:key',
      path: '/super_admin/permissions',
      action: 'read',
      subject: 'super_admin_permissions'
    },
    {
      title: 'roles',
      icon: 'tabler:id-badge-2',
      path: '/super_admin/roles',
      action: 'read',
      subject: 'super_admin_roles'
    },
    {
      title: 'users',
      icon: 'tabler:users',
      path: '/super_admin/users',
      action: 'read',
      subject: 'super_admin_users'
    },
    {
      title: 'user_account_settings',
      icon: 'tabler:user-cog',
      children: [
        {
          title: 'account',
          icon: 'tabler:user',
          path: '/super_admin/user_account_settings/account',
          action: 'read',
          subject: 'super_admin_user_account_settings_account'
        },
        {
          title: 'security',
          icon: 'tabler:lock',
          path: '/super_admin/user_account_settings/security',
          action: 'read',
          subject: 'super_admin_user_account_settings_security'
        }
      ]
    }
  ]
}
