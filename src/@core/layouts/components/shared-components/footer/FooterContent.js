import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import { useTranslation } from 'react-i18next'
import themeConfig from 'src/configs/themeConfig'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  const { t } = useTranslation()

  return (
    <Box sx={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
      <Typography sx={{ mr: 2 }}>
        {t('all_rights_reserved')} {new Date().getFullYear()}{' '}
        <MuiLink target='_blank' href='https://www.latydo.com/'>
          {themeConfig.templateName}
        </MuiLink>
      </Typography>
    </Box>
  )
}

export default FooterContent
