import UnderMaintenance from 'src/@core/components/shared/UnderMaintenance'

const Home = () => {
  return <UnderMaintenance />
}

Home.acl = {
  action: 'read',
  subject: 'super_admin_energy_meter'
}

export default Home
