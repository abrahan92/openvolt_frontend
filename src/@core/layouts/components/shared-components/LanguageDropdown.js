import Icon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import OptionsMenu from 'src/@core/components/option-menu'

const LanguageDropdown = () => {
  const { i18n, t } = useTranslation()

  const handleLangItemClick = lang => i18n.changeLanguage(lang)

  return (
    <OptionsMenu
      iconButtonProps={{ color: 'inherit' }}
      icon={<Icon fontSize='1.5rem' icon='tabler:language' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4.5, minWidth: 130 } } }}
      options={[
        {
          text: t('spanish'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'es',
            onClick: () => handleLangItemClick('es')
          }
        },
        {
          text: t('english'),
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => handleLangItemClick('en')
          }
        }
      ]}
    />
  )
}

export default LanguageDropdown
