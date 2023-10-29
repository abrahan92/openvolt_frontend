import { styled } from '@mui/material/styles'
import { useScrollTrigger, Zoom } from '@mui/material'

const ScrollToTop = ({ children, className }) => {
  const trigger = useScrollTrigger({
    threshold: 400,
    disableHysteresis: true
  })

  const handleClick = () => {
    const anchor = document.querySelector('body')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Zoom in={trigger}>
      <ScrollToTopStyled className={className} onClick={handleClick} role='presentation'>
        {children}
      </ScrollToTopStyled>
    </Zoom>
  )
}

const ScrollToTopStyled = styled('div')(({ theme }) => ({
  bottom: theme.spacing(10),
  position: 'fixed',
  right: theme.spacing(6),
  zIndex: 11
}))

export default ScrollToTop
