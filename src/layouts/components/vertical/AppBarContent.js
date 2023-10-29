import Icon from 'src/@core/components/icon'
import { Box, IconButton } from '@mui/material'
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'

const AppBarContent = ({ hidden, settings, saveSettings, toggleNavVisibility }) => {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      {hidden && !settings.navHidden ? (
        <IconButton color='inherit' onClick={toggleNavVisibility} sx={{ ml: -2.75 }}>
          <Icon fontSize='1.5rem' icon='tabler:menu-2' />
        </IconButton>
      ) : null}
      <Box className='actions-left' sx={{ alignItems: 'center', display: 'flex', mr: 2 }}>
        <Autocomplete hidden={hidden} settings={settings} />
      </Box>
      <Box className='actions-right' sx={{ alignItems: 'center', display: 'flex' }}>
        <LanguageDropdown />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
