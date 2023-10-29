import Link from 'next/link'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, styled, Typography } from '@mui/material'

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 5, textAlign: 'center' }}>
        <BoxWrapper>
          <Typography sx={{ mb: 1.5 }} variant='h4'>
            You are not authorized!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to view this page using the credentials that you have provided while login.
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 6 }}>Please contact your site administrator.</Typography>
          <Button href='/' component={Link} variant='contained'>
            Back to Home
          </Button>
        </BoxWrapper>
        <Img alt='error-illustration' height='500' src='/images/pages/401.png' />
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

Error401.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error401
