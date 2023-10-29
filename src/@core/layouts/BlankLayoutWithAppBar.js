import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import AppBar from 'src/@core/layouts/components/blank-layout-with-appBar'

const BlankLayoutWithAppBar = ({ children }) => {
  return (
    <BlankLayoutWithAppBarWrapper>
      <AppBar />
      <Box
        className='app-content'
        sx={{
          minHeight: theme => `calc(100vh - ${theme.spacing(theme.mixins.toolbar.minHeight / 4)})`,
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {children}
      </Box>
    </BlankLayoutWithAppBarWrapper>
  )
}

const BlankLayoutWithAppBarWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',
  '& .content-center': {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: `calc(100vh - ${theme.spacing(theme.mixins.toolbar.minHeight / 4)})`,
    padding: theme.spacing(5)
  },
  '& .content-right': {
    display: 'flex',
    minHeight: `calc(100vh - ${theme.spacing(theme.mixins.toolbar.minHeight / 4)})`,
    overflowX: 'hidden',
    position: 'relative'
  }
}))

export default BlankLayoutWithAppBar
