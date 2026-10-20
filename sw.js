const C="cnct-v9",F=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>{
    const n=fetch(e.request).then(r=>{if(r&&r.ok){const k=r.clone();caches.open(C).then(x=>x.put(e.request,k))}return r}).catch(()=>c);
    return c||n;
  }));
});
