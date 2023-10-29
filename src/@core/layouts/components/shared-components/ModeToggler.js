import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'

const ModeToggler = ({ settings, saveSettings }) => {
  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else if (settings.mode === 'dark') {
      handleModeChange('semi-dark')
    } else {
      handleModeChange('light')
    }
  }

  return (
    <IconButton color='inherit' aria-haspopup='true' onClick={handleModeToggle}>
      <Icon
        fontSize='1.5rem'
        icon={
          settings.mode === 'light'
            ? 'tabler:moon-stars'
            : settings.mode === 'dark'
            ? 'tabler:sun-low'
            : 'tabler:sun-high'
        }
      />
    </IconButton>
  )
}

export default ModeToggler
