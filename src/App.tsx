import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { useAuth } from './lib/auth-provider'

import { getProfile } from './lib/requests'
import { google_oauth_url } from './config'
import Login from './components/mine/login'
import LoginView from './components/mine/login'
import { TabsDemo } from './components/mine/generate'
import { Card } from './components/ui/card'

function App() {
  const {user,login, logout} = useAuth() 
  const handleClick = async () => {
    // Handle click

    if(!user){
      getProfile().then(async (data) => {
        console.log(data)
        if (data) {
          login(data)
        } else {
          chrome.runtime.sendMessage({ type: 'applicaid_logout' });
          logout(user)
          await chrome.runtime.sendMessage({ type: 'auth' });
        }
      })
    }
    else{
      
    }
    //await chrome.runtime.sendMessage({ type: 'auth' });
  };
  
  useEffect(() => {
    getProfile().then((data) => {
      console.log(data)
      if(data){
        login(data)
      }else{
        chrome.runtime.sendMessage({ type: 'applicaid_logout' });
        logout(user)
      }
    })
  },  []);
  
  return (

    <div className='w-full'>
      {user &&
      
         <div className='w-full'>
          {user.name}
          <TabsDemo></TabsDemo>
         
         </div>}
      {!user && <LoginView />}
    </div>

  )
}

export default App
