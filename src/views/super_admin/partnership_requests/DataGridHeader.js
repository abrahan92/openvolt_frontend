import { useSelector } from 'react-redux'
import { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, TextField } from '@mui/material'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const DataGridHeader = ({ fetchData, handleFilter, search }) => {
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
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
            placeholder={t('search_partnership_request')}
            size='small'
            sx={{ mr: 4 }}
            value={search}
          />
          {ability.can('create', `${userData?.default_role?.name}_partnership_requests`) && (
            <Button onClick={() => fetchData('add')} sx={{ '& svg': { mr: 2 } }} variant='contained'>
              {t('add_new_partnership_request')}
            </Button>
          )}
        </Box>
      </Box>
    </Fragment>
  )
}

export default DataGridHeader
