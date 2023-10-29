import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, styled, Typography } from '@mui/material'

const UnderMaintenance = ({}) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()

  return (
    <Box className='animate__animated animate__fadeIn animate__faster content-center'>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 5, textAlign: 'center' }}>
        <BoxWrapper>
          <Typography sx={{ mb: 1.5 }} variant='h4'>
            {t('under_maintenance')}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {t('sorry_for_the_inconvenience_but_were_performing_some_maintenance_at_the_moment')}
          </Typography>
          {pathname !== '/super_admin/home' && (
            <Button component={Link} href='/' sx={{ mt: 6 }} variant='contained'>
              {t('back_to_home')}
            </Button>
          )}
        </BoxWrapper>
        <Img alt='under-maintenance-illustration' height='500' src='/images/pages/misc-under-maintenance.png' />
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
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: 497,
    height: 'auto',
    maxHeight: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

UnderMaintenance.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default UnderMaintenance
