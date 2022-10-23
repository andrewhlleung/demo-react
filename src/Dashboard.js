
import React, { useContext, useEffect,useState } from 'react';
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
    
    if( process.env.MODE!="production" ){
      setProdustList([{"id":1,"name":"蘋果","price":5,"image":"apple.jpg","description":"新鮮蘋果50克，一日一蘋果，醫生遠離我"},{"id":2,"name":"橙","price":3,"image":"orange.jpg","description":"新鮮橙50克，又甜又好吃"},{"id":3,"name":"芒果","price":4,"image":"mango.jpg","description":"新鮮芒500克，宜做甜品"},{"id":4,"name":"西瓜","price":20,"image":"watermelon.jpg","description":"新鮮西瓜2公斤，夏季必備"},{"id":5,"name":"藍梅","price":10,"image":"blueberry.jpg","description":"新鮮藍梅50克，補眼之寶"},{"id":6,"name":"白蘿蔔","price":5,"image":"white-carrot.jpg","description":"新鮮白蘿蔔1公斤，宜煲湯"}])
    }else{
      var myHeaders = new Headers();
      //myHeaders.append("api-key", "zjsocERDuMnQOiL1VcIsE2DdVmf4Ux7HsyKKVFRItyXhfFWRpg4Mv0HPgffC2J9X");
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({});
      
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
          let resultObj= JSON.parse(result)
          console.log(resultObj.documents)
          setProdustList(resultObj.documents)
        })
        .catch(error => console.log('error', error));

    }

  },[])

  return (
    <>{process.env.MODE}
      {loginSession.profileObj.email}
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={onLogout}
      >
      </GoogleLogout>
      <p>product count: {productList.length}</p>
      {
        productList.map((product)=>(
          <div key={product.id}>
          {product.image}<br/>
            {product.name}<br/>
            {product.description}<br/>
            {product.price}<br/>
          </div>
        ))
      }
    </>
  )
}
