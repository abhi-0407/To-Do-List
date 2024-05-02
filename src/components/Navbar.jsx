import React from 'react'
import { useNavigate } from 'react-router-dom'; 
import { User, useAuth0 } from "@auth0/auth0-react";

const gotonewpage=()=>{
  navigate("./Home.jsx");
  
}
const Navbar = () => {
  const { loginWithRedirect, isAuthenticated,logout, user} = useAuth0();
  return (
    <nav className='flex justify-between bg-purple-700 text-white py-3'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>MyTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
              {
              isAuthenticated && (
                <li>
                <p>
                  {user.name}
                </p>
                </li>
              )}
            {
              isAuthenticated ?<li className='cursor-pointer hover:font-bold transition-all'>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              Log Out
            </button>
            </li>
              : <li className='cursor-pointer hover:font-bold transition-all'><button onClick={() => loginWithRedirect()}>Log In</button></li>

            }
            
        </ul>
    </nav>
  )
}

export default Navbar
