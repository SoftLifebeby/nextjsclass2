import Navbar from '../components/seller/Navbar.jsx'
import SideBar from '../components/seller/SideBar.jsx'

const layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='flex w-full'>
        <SideBar />
        {children}
      </div>
    </div>
  )
}

export default layout
