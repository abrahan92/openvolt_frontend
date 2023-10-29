import Link from 'next/link'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Box, Button, styled, Typography } from '@mui/material'

const Error500 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 5, textAlign: 'center' }}>
        <BoxWrapper>
          <Typography sx={{ mb: 1.5 }} variant='h4'>
            Oops, something went wrong!
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 6 }}>
            There was an error with the internal server. Please contact your site administrator.
          </Typography>
          <Button component={Link} href='/' variant='contained'>
            Back to Home
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

Error500.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error500
