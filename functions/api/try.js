export async function onRequest(context) {  // Contents of context object  const {    request, // same as existing Worker API    env, // same as existing Worker API    params, // if filename includes [id] or [[path]]    waitUntil, // same as ctx.waitUntil in existing Worker API    next, // used for middleware or to fetch assets    data, // arbitrary space for passing data between middlewares  } = context;
  
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
  var returnResponse = {}
  await fetch("https://data.mongodb-api.com/app/data-uddjz/endpoint/data/v1/action/find", requestOptions)
    .then(response => response.text())
    .then(
      result => {
        console.log(result)
        //return new Response(result);
        returnResponse=result
        return new Response(JSON.stringify(returnResponse))
      }
    )
    .catch(error => console.log('error', error));  
  
  return new Response(JSON.stringify(returnResponse))
  }
  