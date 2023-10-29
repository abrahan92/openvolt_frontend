import { Grid } from '@mui/material'

const PageHeader = ({ title, subtitle }) => {
  return (
    <Grid item xs={12}>
      {title}
      {subtitle || null}
    </Grid>
  )
}

export default PageHeader
