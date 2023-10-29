import * as R from 'ramda'
import Grid from '@mui/material/Grid'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import { getRoles } from 'src/services/rolesService'
import { useDispatch, useSelector } from 'react-redux'
import { Box, IconButton, Tooltip } from '@mui/material'
import { handleRoles } from 'src/store/slices/rolesSlice'
import PageHeader from 'src/@core/components/page-header'
import RoleCards from 'src/views/super_admin/roles/RoleCards'
import CustomLoader from 'src/@core/components/custom/CustomLoader'

const Roles = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const { roles } = useSelector(store => store.roles)

  useEffect(() => {
    const fetchData = async () => {
      if (R.isNil(roles) || R.isEmpty(roles)) {
        try {
          const { data } = await getRoles()

          const parsedData = data.sort((a, b) => a.name.localeCompare(b.name))

          dispatch(handleRoles(parsedData))
        } catch (error) {
          console.log(error)
        }
      }

      setLoading(false)
    }

    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles])

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h5'>{t('roles_list')}</Typography>
            <Tooltip arrow placement='right' title={t('refresh')}>
              <span>
                <IconButton
                  aria-label='collapse'
                  disabled={loading || refreshing}
                  onClick={async () => {
                    setRefreshing(true)

                    try {
                      const { data } = await getRoles()

                      const parsedData = data.sort((a, b) => a.name.localeCompare(b.name))

                      dispatch(handleRoles(parsedData))
                    } catch (error) {
                      console.log(error)
                    }

                    setRefreshing(false)
                  }}
                  size='medium'
                  sx={{ color: 'text.secondary' }}
                >
                  <Icon icon='tabler:reload' fontSize={20} />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        }
      />
      <Grid item xs={12}>
        {loading ? <CustomLoader /> : <RoleCards refreshing={refreshing} />}
      </Grid>
    </Grid>
  )
}

Roles.acl = {
  action: 'read',
  subject: 'super_admin_roles'
}

export default Roles
