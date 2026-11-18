import {onRequest as relay} from './relay.mjs';
export async function reviewResponse(context, render) {
 const {request}=context;
 const path=new URL(request.url).pathname;
 if(path.startsWith('/api/website-review/'))return relay(context);
 const response=await render(context);
 // The panel is public UI; the relay independently protects all private review access.
 if(request.method!=='GET'||!response.headers.get('content-type')?.includes('text/html'))return response;
 const rewritten=new HTMLRewriter().on('head',{element(e){e.append('<link rel="stylesheet" href="/studio-review.css">',{html:true})}}).on('body',{element(e){e.append('<script src="/website-review-link.js" defer></script>',{html:true})}}).transform(response);
 const headers=new Headers(rewritten.headers);headers.delete('Content-Length');headers.delete('ETag');
 return new Response(rewritten.body,{status:rewritten.status,statusText:rewritten.statusText,headers});
}
