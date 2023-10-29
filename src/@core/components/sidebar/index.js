import { Fragment, useEffect } from 'react'
import { Backdrop, Box } from '@mui/material'

const Sidebar = ({ sx, show, direction, children, hideBackdrop, onOpen, onClose, backDropClick }) => {
  const handleBackdropClick = () => {
    if (backDropClick) {
      backDropClick()
    }
  }
  useEffect(() => {
    if (show && onOpen) {
      onOpen()
    }

    if (show === false && onClose) {
      onClose()
    }
  }, [onClose, onOpen, show])

  return (
    <Fragment>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          height: '100%',
          position: 'absolute',
          transition: 'all 0.25s ease-in-out',
          top: 0,
          zIndex: 'drawer',
          ...(show ? { opacity: 1 } : { opacity: 0 }),
          ...(direction === 'right'
            ? { left: 'auto', right: show ? 0 : '-100%' }
            : { left: show ? 0 : '-100%', right: 'auto' }),
          ...sx
        }}
      >
        {children}
      </Box>
      {hideBackdrop ? null : (
        <Backdrop
          onClick={handleBackdropClick}
          open={show}
          transitionDuration={250}
          sx={{ position: 'absolute', zIndex: theme => theme.zIndex.drawer - 1 }}
        />
      )}
    </Fragment>
  )
}

Sidebar.defaultProps = {
  direction: 'left'
}

export default Sidebar
