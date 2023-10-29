import { useSelector } from 'react-redux'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'

const DataGridHeader = ({
  fetchData,
  handleFilter,
  handlePlatformAccessChange,
  handleRoleChange,
  platformAccess,
  role,
  search
}) => {
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  const { roles } = useSelector(store => store.roles)
  const { userData } = useSelector(store => store.authentication)

  return (
    <Fragment>
      <Box
        sx={{
          alignItems: 'center',
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          px: 6,
          py: 4,
          rowGap: 2
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', rowGap: 2 }}>
          <TextField
            onChange={e => handleFilter(e.target.value)}
            placeholder={t('search_user')}
            size='small'
            sx={{ mr: 4 }}
            value={search}
          />
          {ability.can('create', `${userData?.default_role?.name}_users`) && (
            <Button onClick={() => fetchData('add')} sx={{ '& svg': { mr: 2 } }} variant='contained'>
              {t('add_new_user')}
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          pb: 4,
          px: 6
        }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size='small'>
              <InputLabel id='role-select'>{t('select_role')}</InputLabel>
              <Select
                fullWidth
                id='select-role'
                inputProps={{ placeholder: t('select_role') }}
                label={t('select_role')}
                labelId='role-select'
                onChange={handleRoleChange}
                value={role}
              >
                <MenuItem value=''>{t('select_role')}</MenuItem>
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size='small'>
              <InputLabel id='platform-access-select'>{t('select_platform_access')}</InputLabel>
              <Select
                fullWidth
                id='platform-access'
                inputProps={{ placeholder: t('select_platform_access') }}
                label={t('select_platform_access')}
                labelId='platform-access-select'
                onChange={handlePlatformAccessChange}
                value={platformAccess}
              >
                <MenuItem value=''>{t('select_platform_access')}</MenuItem>
                <MenuItem value='all'>all</MenuItem>
                <MenuItem value='backoffice'>backoffice</MenuItem>
                <MenuItem value='web'>web</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

export default DataGridHeader
