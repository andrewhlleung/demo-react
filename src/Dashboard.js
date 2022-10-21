
import React, { useContext } from 'react';
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { LoginContext } from './LoginContext';

export default function Dashboard() {
  const {loginSession,setLoginSession} = useContext(LoginContext);
  const onLogout =(res)=>{
    //console.log('onLogout:', res);
    setLoginSession({})
  }
  return (
    <>
    {loginSession.profileObj.email}
    <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={onLogout}
    >
    </GoogleLogout>
  </>
  )
}
