import Link from 'next/link'
import { styled } from '@mui/material/styles'

const CustomLinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '0.875rem',
  textDecoration: 'none'
}))

export default CustomLinkStyled
