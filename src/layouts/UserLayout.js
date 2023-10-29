import { useSelector } from 'react-redux'
import Layout from 'src/@core/layouts/Layout'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSettings } from 'src/@core/hooks/useSettings'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import { horizontalNavigationSuperAdmin, horizontalNavigationHealthProfessional } from 'src/navigation/horizontal'
import {
  verticalNavigationSuperAdmin,
  verticalNavigationHealthProfessional,
  verticalNavigationgGlobalMenu
} from 'src/navigation/vertical'

const UserLayout = ({ children, contentHeightFixed }) => {
  const { settings, saveSettings } = useSettings()
  const { userData } = useSelector(store => store.authentication)

  const VerticalMenu = () => {
    if (userData?.default_role?.name === 'super_admin') {
      return verticalNavigationSuperAdmin()
    } else if (userData?.default_role?.name === 'health_professional') {
      return verticalNavigationHealthProfessional()
    }
  }

  const HorizontalMenu = () => {
    if (userData?.default_role?.name === 'super_admin') {
      return horizontalNavigationSuperAdmin()
    } else if (userData?.default_role?.name === 'health_professional') {
      return horizontalNavigationHealthProfessional()
    }
  }

  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalMenu()
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalMenu()
          },
          appBar: {
            content: () => <HorizontalAppBarContent hidden={hidden} settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
