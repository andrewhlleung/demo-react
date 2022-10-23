export async function onRequest(context) {  // Contents of context object  const {    request, // same as existing Worker API    env, // same as existing Worker API    params, // if filename includes [id] or [[path]]    waitUntil, // same as ctx.waitUntil in existing Worker API    next, // used for middleware or to fetch assets    data, // arbitrary space for passing data between middlewares  } = context;
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  
  var myHeaders = new Headers();
  myHeaders.append("api-key", "zjsocERDuMnQOiL1VcIsE2DdVmf4Ux7HsyKKVFRItyXhfFWRpg4Mv0HPgffC2J9X");
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "dataSource": "Cluster0",
    "database": "demo-react-40m",
    "collection": "note",
    "filter": {}
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode:'no-cors'
  };
  var returnResponse = {
      "context":context,
      "documents": [
        {"id" : 1,"name" : "蘋果", "price" : 5, "image" : "apple.jpg","description":"新鮮蘋果50克，一日一蘋果，醫生遠離我"},
        {"id" : 2,"name" : "橙", "price" : 3, "image" : "orange.jpg","description":"新鮮橙50克，又甜又好吃"},
        {"id" : 3,"name" : "芒果", "price" : 4, "image" : "mango.jpg","description":"新鮮芒500克，宜做甜品"},
        {"id" : 4,"name" : "西瓜", "price" : 20,"image" : "watermelon.jpg","description":"新鮮西瓜2公斤，夏季必備"},
        {"id" : 5,"name" : "藍梅", "price" : 10,"image" : "blueberry.jpg","description":"新鮮藍梅50克，補眼之寶"},
        {"id" : 6,"name" : "白蘿蔔", "price" : 5,"image" : "white-carrot.jpg","description":"新鮮白蘿蔔1公斤，宜煲湯"}
      ]
  }
  const response = await fetch("https://data.mongodb-api.com/app/data-uddjz/endpoint/data/v1/action/find");
  if( response.ok ){
    returnResponse.response_ok="T"
    const result = await response.text();
    returnResponse.documents=result
  }else{
    returnResponse.response_ok="F"
    returnResponse.response_status=response.status
  }
  /*
  await fetch("https://data.mongodb-api.com/app/data-uddjz/endpoint/data/v1/action/find", requestOptions)
    .then(response => response.text())
    .then(
      result => {
        //console.log(result)
        returnResponse=result
        return new Response(JSON.stringify(returnResponse))
      }
    )
    .catch(
      error => {
        //console.log('error', error)
        returnResponse=error
        return new Response(JSON.stringify(returnResponse))
      }
    );
  */
  
  return new Response(JSON.stringify(returnResponse))
  }
  