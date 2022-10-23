
import React, { useContext, useEffect,useState } from 'react';
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { LoginContext } from './LoginContext';
import { Button,Container ,Row,Col,Card } from 'react-bootstrap';

import config from './config.json';

export default function Dashboard() {
  const {loginSession,setLoginSession} = useContext(LoginContext);
  const onLogout =(res)=>{
    //console.log('onLogout:', res);
    setLoginSession({})
  }

  const [productList,setProdustList] = useState([]);
  useEffect(()=>{
    
    if( config.mode==="production" ){
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

    }else{
        setProdustList([{"id":0,"name":"Development Mode","price":5,"image":"apple.jpg","description":"新鮮蘋果50克，一日一蘋果，醫生遠離我"},{"id":1,"name":"蘋果","price":5,"image":"apple.jpg","description":"新鮮蘋果50克，一日一蘋果，醫生遠離我"},{"id":2,"name":"橙","price":3,"image":"orange.jpg","description":"新鮮橙50克，又甜又好吃"},{"id":3,"name":"芒果","price":4,"image":"mango.jpg","description":"新鮮芒500克，宜做甜品"},{"id":4,"name":"西瓜","price":20,"image":"watermelon.jpg","description":"新鮮西瓜2公斤，夏季必備"},{"id":5,"name":"藍梅","price":10,"image":"blueberry.jpg","description":"新鮮藍梅50克，補眼之寶"},{"id":6,"name":"白蘿蔔","price":5,"image":"white-carrot.jpg","description":"新鮮白蘿蔔1公斤，宜煲湯"}])
    }

  },[])

  return (
    <>
    <Container>
    <div>MODE: {config.mode}</div>
      {loginSession.profileObj.email}
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={onLogout}
      >
      </GoogleLogout>
      <p>product count: {productList.length}</p>


      <Row xs={2} md={4} className="g-4">
        {
        productList.map((product)=>(
          <Col>
          <Card  key={product.id} >
            <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18405d7972b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18405d7972b%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.53125%22%20y%3D%2297.44000034332275%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          </Col>
        ))
      }
      </Row>
      </Container>

      
    </>
  )
}
