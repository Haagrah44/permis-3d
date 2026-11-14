// Essai gratuit de 25 minutes, sans carte bancaire.
// Version démo : le compteur est gardé dans le navigateur. La version finale le gardera sur le compte de l'élève.
(function(){
 const LIMIT=25*60,K='permis_used',KP='permis_plan';
 const get=()=>{try{return +localStorage.getItem(K)||0}catch(e){return 0}};
 const set=v=>{try{localStorage.setItem(K,String(v))}catch(e){}};
 const paid=()=>{try{return !!localStorage.getItem(KP)}catch(e){return false}};
 window.Trial={LIMIT,used:get,remaining:()=>Math.max(0,LIMIT-get()),paid,active:/conduite\.html/.test(location.pathname)};
 function overlay(){if(document.getElementById('trialEnd'))return;const d=document.createElement('div');d.id='trialEnd';
  d.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(8,10,14,.94);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px;font-family:system-ui,sans-serif';
  d.innerHTML='<div style="font-size:44px">⏱️</div><h2 style="margin:0;font-size:26px">Tes 25 minutes d\'essai sont terminées</h2><p style="max-width:440px;opacity:.85;margin:0">Tu as vu ce que ça donne. Continue à t\'entraîner sur ton vrai parcours jusqu\'au jour J.</p><a href="./#tarifs" style="background:#38bdf8;color:#04111c;font-weight:800;padding:14px 26px;border-radius:14px;text-decoration:none">Voir les formules</a>';
  document.body.appendChild(d);}
 function tick(){if(paid())return;const r=window.Trial.remaining();document.querySelectorAll('[data-trial]').forEach(e=>{const m=Math.floor(r/60),s=r%60;e.textContent=m+':'+String(s).padStart(2,'0');});
  if(r<=0&&window.Trial.active)overlay();}
 setInterval(()=>{if(paid())return;if(window.Trial.active&&document.visibilityState==='visible'){set(get()+1);}tick();},1000);
 document.addEventListener('DOMContentLoaded',tick);
})();
