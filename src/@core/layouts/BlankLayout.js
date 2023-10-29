import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

const BlankLayout = ({ children }) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  '& .content-center': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(5)
  },
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    position: 'relative',
    overflowX: 'hidden'
  }
}))

export default BlankLayout
