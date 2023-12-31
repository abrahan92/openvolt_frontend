import themeConfig from 'src/configs/themeConfig'
import { createContext, useState, useEffect } from 'react'

const initialSettings = {
  appBar: themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden' ? 'fixed' : themeConfig.appBar,
  appBarBlur: themeConfig.appBarBlur,
  contentWidth: themeConfig.contentWidth,
  direction: themeConfig.direction,
  footer: themeConfig.footer,
  lastLayout: themeConfig.layout,
  layout: themeConfig.layout,
  navHidden: themeConfig.navHidden,
  navCollapsed: themeConfig.navCollapsed,
  mode: themeConfig.mode,
  skin: themeConfig.skin,
  themeColor: 'primary',
  toastPosition: themeConfig.toastPosition,
  verticalNavToggleType: themeConfig.verticalNavToggleType
}

const staticSettings = {
  appBar: initialSettings.appBar,
  footer: initialSettings.footer,
  lastLayout: initialSettings.lastLayout,
  layout: initialSettings.layout,
  navHidden: initialSettings.navHidden,
  toastPosition: initialSettings.toastPosition
}

const restoreSettings = () => {
  let settings = null
  try {
    const storedData = window.localStorage.getItem('settings')

    if (storedData) {
      settings = { ...JSON.parse(storedData), ...staticSettings }
    } else {
      settings = initialSettings
    }
  } catch (err) {
    console.error(err)
  }

  return settings
}

const storeSettings = settings => {
  const initSettings = Object.assign({}, settings)

  delete initSettings.appBar
  delete initSettings.footer
  delete initSettings.lastLayout
  delete initSettings.layout
  delete initSettings.navHidden
  delete initSettings.toastPosition

  window.localStorage.setItem('settings', JSON.stringify(initSettings))
}

export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings
})

export const SettingsProvider = ({ children, pageSettings }) => {
  const [settings, setSettings] = useState({ ...initialSettings })

  useEffect(() => {
    const restoredSettings = restoreSettings()

    if (restoredSettings) {
      setSettings({ ...restoredSettings })
    }

    if (pageSettings) {
      setSettings({ ...settings, ...pageSettings })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSettings])

  useEffect(() => {
    if (settings.layout === 'horizontal' && settings.mode === 'semi-dark') {
      saveSettings({ ...settings, mode: 'light' })
    }

    if (settings.layout === 'horizontal' && settings.appBar === 'hidden') {
      saveSettings({ ...settings, appBar: 'fixed' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout])

  const saveSettings = updatedSettings => {
    storeSettings(updatedSettings)

    setSettings(updatedSettings)
  }

  return <SettingsContext.Provider value={{ saveSettings, settings }}>{children}</SettingsContext.Provider>
}

export const SettingsConsumer = SettingsContext.Consumer
