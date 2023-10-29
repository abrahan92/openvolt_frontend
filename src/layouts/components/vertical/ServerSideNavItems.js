import axios from 'axios'
import { useEffect, useState } from 'react'

const ServerSideNavItems = () => {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get('/api/vertical-nav/data').then(response => {
      const menuArray = response.data
      setMenuItems(menuArray)
    })
  }, [])

  return { menuItems }
}

export default ServerSideNavItems
