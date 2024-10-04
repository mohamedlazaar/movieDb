import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='container justify-between w-full flex flex-row '>
      {/* title */}
        <Link to='/'><h1 className='text-black text-xl '>MovieDB</h1></Link>
        {/* links */}
        <div className=" flex flex-row gap-5">
          {/* Search Link */}
        <Link to='/' className='text-black hover:text-white transition-all underline'>Search</Link>
        <Link to='/favorites' className='text-black hover:text-white transition-all underline'>Favorites</Link>
        </div>
   
    </div>
  )
}

export default NavBar