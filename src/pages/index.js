import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import Spinner from 'src/@core/components/spinner'
import { useSelector } from 'react-redux'

export const getHomeRoute = role => {
  return '/home'
}

const Home = () => {
  const auth = useAuth()
  const router = useRouter()
  const { userData } = useSelector(store => store?.authentication)

  useEffect(() => {
    if (auth.user != null) {
      const user_path = userData?.default_role?.name

      router.replace(`${user_path}/home`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
