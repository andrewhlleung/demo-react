// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'

import { LoginContext } from './LoginContext';

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import Dashboard from './Dashboard';
import { Button,Container ,Row,Col,Card } from 'react-bootstrap';

function App() {
  const [loginSession,setLoginSession] = useState({});
  
  const clientId = "192746984035-74ptcai60m8ralhv020d6vra4osdpvq8.apps.googleusercontent.com";
  useEffect(() => {
      const initClient = () => {
            gapi.client.init({
            clientId: clientId,
            scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  });
  
  const onSuccess = (res) => {
    //console.log('onSuccess:', res);
    setLoginSession(res)
  };
  const onFailure = (err) => {
    //console.log('onFailure:', err);
    setLoginSession({})
  };

  return (
    <>
    
      {( loginSession.profileObj ) &&
      <BrowserRouter>
        <LoginContext.Provider value={{loginSession,setLoginSession}}>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
          </Routes>
        </LoginContext.Provider>
      </BrowserRouter>
        }

      {( !loginSession.profileObj ) &&
      <Container>
        <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
      </Container>
      }
    
    </>
  );

}

export default App;
