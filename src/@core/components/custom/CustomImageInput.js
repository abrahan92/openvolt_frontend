import { Icon } from '@iconify/react'
import { useSelector } from 'react-redux'
import { Avatar, Box, Fab } from '@mui/material'

const CustomImageInput = ({
  field,
  imageFromFilePicker,
  inputRef,
  isDisabled,
  setDeleteImg,
  setImageFromFilePicker,
  setState,
  state
}) => {
  const { colorScheme } = useSelector(store => store?.layout)

  return (
    <Box sx={{ mb: 3, position: 'relative' }}>
      {state[field] || imageFromFilePicker ? (
        <Avatar
          alt=''
          sx={{ height: 150, width: 150 }}
          src={imageFromFilePicker ? imageFromFilePicker : state[field]}
        />
      ) : (
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: colorScheme === 'light' ? '#E7F5FC' : '#2A3F59',
            borderRadius: 75,
            display: 'flex',
            height: 150,
            justifyContent: 'center',
            width: 150
          }}
        >
          <Icon color='#37ADE3' height={100} icon='tabler:layout-collage' />
        </Box>
      )}
      <Fab
        color='primary'
        disabled={isDisabled}
        size='medium'
        sx={{
          bottom: -5,
          position: 'absolute',
          right: state[field] || imageFromFilePicker ? 30 : 0,
          zIndex: 2
        }}
      >
        <Icon icon='tabler:pencil' height={27} />
      </Fab>
      {state[field] || imageFromFilePicker ? (
        <Fab
          color='error'
          disabled={isDisabled}
          size='medium'
          sx={{
            bottom: -5,
            position: 'absolute',
            right: 0,
            zIndex: 1
          }}
        >
          <Icon icon='tabler:trash' height={27} />
        </Fab>
      ) : null}
    </Box>
  )
}

export default CustomImageInput
