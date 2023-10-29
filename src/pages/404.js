import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, styled, Typography } from '@mui/material'

const Error404 = () => {
  const { t } = useTranslation()

  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography sx={{ mb: 1.5 }} variant='h4'>
            {t('page_not_found')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 6 }}>
            {t('the_requested_url_was_not_found_on_this_server')}
          </Typography>
          <Button component={Link} href='/' variant='contained'>
            {t('back_to_home')}
          </Button>
        </BoxWrapper>
        <Img alt='error-illustration' height='500' src='/images/pages/404.png' />
      </Box>
    </Box>
  )
}

const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404
