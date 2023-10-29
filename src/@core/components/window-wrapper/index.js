import { useRouter } from 'next/router'
import { Fragment, useState, useEffect } from 'react'

const WindowWrapper = ({ children }) => {
  const router = useRouter()
  const [windowReadyFlag, setWindowReadyFlag] = useState(false)

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        setWindowReadyFlag(true)
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (windowReadyFlag) {
    return <Fragment>{children}</Fragment>
  } else {
    return null
  }
}

export default WindowWrapper
