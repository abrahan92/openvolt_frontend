import UnderMaintenance from 'src/@core/components/shared/UnderMaintenance'

const Home = () => {
  return <UnderMaintenance />
}

Home.acl = {
  action: 'read',
  subject: 'super_admin_home'
}

export default Home
