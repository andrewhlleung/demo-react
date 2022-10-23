
import React, { useContext, useEffect } from 'react';
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { LoginContext } from './LoginContext';

export default function Dashboard() {
  const {loginSession,setLoginSession} = useContext(LoginContext);
  const onLogout =(res)=>{
    //console.log('onLogout:', res);
    setLoginSession({})
  }

  const [productList,setProdustList] = useState([]);
  useEffect(()=>{
    var myHeaders = new Headers();
    //myHeaders.append("api-key", "zjsocERDuMnQOiL1VcIsE2DdVmf4Ux7HsyKKVFRItyXhfFWRpg4Mv0HPgffC2J9X");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      // "dataSource": "Cluster0",
      // "database": "demo-react-40m",
      // "collection": "note",
      // "filter": {}
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode:'no-cors'
    };
    
    fetch("https://demo-react-40m.pages.dev/api/try", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setProdustList(JSON.parse(result).documents)
      })
      .catch(error => console.log('error', error));

  })

  return (
    <>
      {loginSession.profileObj.email}
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={onLogout}
      >
      </GoogleLogout>
      {
        productList.map((product)=>{
          <div>
            {product.name}
          </div>
        })
      }
    </>
  )
}
