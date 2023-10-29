import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs, Link, Typography } from '@mui/material'

const CustomBreadcrumbs = ({ breadcrumbs }) => {
  const { t } = useTranslation()

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      className='animate__animated animate__fadeIn animate__faster'
      separator={<Icon icon='tabler:chevron-right' />}
      sx={{ mb: 6 }}
    >
      <Link href='/home' sx={{ alignItems: 'center', display: 'flex' }}>
        <Icon color='#37ADE3' height={25} icon='tabler:smart-home' />
      </Link>
      {breadcrumbs?.map((breadcrumb, id) => (
        <Typography key={id}>{t(breadcrumb)}</Typography>
      ))}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
