import { useTranslation } from 'react-i18next'
import { Box, CircularProgress, styled, Typography } from '@mui/material'

const CustomLoader = () => {
  const { t } = useTranslation()

  return (
    <Box
      className='animate__animated animate__fadeIn animate__faster'
      sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ position: 'relative' }}>
        <CircularProgressDeterminate size={77} thickness={5} value={100} variant='determinate' />
        <CircularProgressIndeterminate disableShrink size={77} thickness={5} variant='indeterminate' />
      </Box>
      <Typography sx={{ textAlign: 'center' }} variant='h6'>
        {t('loading')}
      </Typography>
    </Box>
  )
}

const CircularProgressDeterminate = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.customColors.trackBg
}))

const CircularProgressIndeterminate = styled(CircularProgress)(({ theme }) => ({
  animationDuration: '550ms',
  color: theme.palette.mode === 'light' ? '#28C76F' : '#23AF62',
  left: 0,
  position: 'absolute'
}))

export default CustomLoader
