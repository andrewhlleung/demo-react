
export async function onRequest(context) {
  
  
  
  const value = await NOTE_SPACE.get("product_list");
  if (value === null) {
    return new Response("Value not found", { status: 404 });
  }

  return new Response(value);
  
  }
  

