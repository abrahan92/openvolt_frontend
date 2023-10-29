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
          py: 4,
          px: 6,
          rowGap: 2,
          columnGap: 4,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            onChange={e => handleFilter(e.target.value)}
            placeholder={t('search_category')}
            size='small'
            sx={{ mr: 4 }}
            value={search}
          />
          {ability.can('create', `${userData?.default_role?.name}_categories`) && (
            <Button onClick={() => fetchData('add')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
              {t('add_new_category')}
            </Button>
          )}
        </Box>
      </Box>
    </Fragment>
  )
}

export default DataGridHeader
