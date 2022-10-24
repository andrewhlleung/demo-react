const cloudFlareWorkersKV = require('@kikobeats/cloudflare-workers-kv')
export async function onRequest(context) {
  // Contents of context object  const {    request, // same as existing Worker API    env, // same as existing Worker API    params, // if filename includes [id] or [[path]]    waitUntil, // same as ctx.waitUntil in existing Worker API    next, // used for middleware or to fetch assets    data, // arbitrary space for passing data between middlewares  } = context;
  // Contents of context object
  const {
    request, // same as existing Worker API
    env, // same as existing Worker API
    params, // if filename includes [id] or [[path]]
    waitUntil, // same as ctx.waitUntil in existing Worker API
    next, // used for middleware or to fetch assets
    data, // arbitrary space for passing data between middlewares
  } = context;

  const store = cloudFlareWorkersKV({
    accountId: '612249f30da10bb5c640d3fca537fd39',
    key: 'c8840056d006717dc4a0cfcc1dbc12878807b',
    namespaceId: 'ae638870224e40f6bc34c000175d6c90'
  })
  product_list = await store.get('product_list')
  return new Response(JSON.stringify(product_list))

  // const value = await Note.get("Data");
  // if (value === null) {
  //   return new Response("Value not found", { status: 404 });
  // }
  // return new Response(JSON.stringify(value))
  }
  

