
export async function onRequest(context) {

      //get the ENV var for the binding 
      //note this is the variable name you added in the KV bindings in your Cloudflare pages set up.
      const KV = context.env.ALLOW_TEST;

      //put a variable in place. 
      KV.put("foo", "bar",{})
      
      //The following are commented out and are here an example on how to use it.

      //get a key
      //const key = await KV.get("foo")
      //console.log(key)
      
      //delete a key
      //KV.delete("foo")
      
      //list the keys
      const value = await KV.list()
      console.log(value)
  
    return new Response(JSON.stringify(context));
  }
  

