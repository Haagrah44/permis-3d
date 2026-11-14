// Permis 3D – application
(function(){
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
// ---------- voix
let frVoice=null;function pickVoice(){if(!('speechSynthesis' in window))return;const vs=speechSynthesis.getVoices();frVoice=vs.find(v=>/fr/i.test(v.lang)&&/Google|Amélie|Thomas|Microsoft/i.test(v.name))||vs.find(v=>/fr/i.test(v.lang))||null;}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
function say(t){if(!('speechSynthesis' in window))return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';if(frVoice)u.voice=frVoice;u.rate=1.02;speechSynthesis.speak(u);}
// ---------- routeur
const APP=['code','questions','parcours','parcours-perso','vehicule'];
function route(){const id=(location.hash||'#accueil').slice(1)||'accueil';const v=$('#v-'+id)?id:'accueil';
 $$('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));$$('.links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+v));
 $('#links').classList.remove('open');window.scrollTo(0,0);if(window.Trial)window.Trial.active=APP.includes(v);
 if(v==='parcours-perso')initMap();if(v==='questions'&&!$('#fiche').innerHTML)nextFiche();setTimeout(reveal,50);}
addEventListener('hashchange',route);$('#burger').onclick=()=>$('#links').classList.toggle('open');
// ---------- animations au défilement
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.15});
function reveal(){$$('.reveal:not(.in)').forEach(e=>io.observe(e));}
$('#marq').innerHTML=(()=>{const c=['Redon','Blain','Nantes','Rennes','Vannes','Saint-Nazaire','Lorient','Angers','Brest','Quimper','Laval','Le Mans'];const h=c.map(x=>'<span>📍 '+x+'</span>').join('');return h+h;})();
$('#voixOff').onclick=()=>say("Rater son permis, plus jamais. Avec Permis 3D, tu roules sur ton vrai parcours d'examen avant le jour J. Chaque stop, chaque priorité à droite, chaque rond-point de ta ville : tu les connais déjà. Essaie gratuitement pendant 25 minutes, sans carte bancaire.");
// ---------- tarifs
const PLANS=[{id:'3d',n:"Parcours 3D",p:"9,99",f:["Parcours démo + ton parcours d'examen","Détection automatique des pièges","Conduite Street View avec moniteur et examinateur","Coach vocal","Intérieur du véhicule"]},
 {id:'full',n:"Code + Parcours 3D",p:"14,99",hot:1,f:["Tout le Parcours 3D","Code de la route 2026 : cours + examens blancs illimités","Les questions de l'examen pratique","Suivi de tes fautes"]}];
$$('.tarifs').forEach(g=>g.innerHTML=PLANS.map(p=>`<div class="card price ${p.hot?'hot':''}">${p.hot?'<span class="badge">LE PLUS CHOISI</span>':''}<h3>${p.n}</h3><div class="amt">${p.p} €<small> / mois</small></div><ul>${p.f.map(x=>'<li>'+x+'</li>').join('')}</ul><button class="btn ${p.hot?'pri':'sec'}" data-plan="${p.id}">Choisir</button><div class="status">Essai 25 min offert · sans carte</div></div>`).join(''));
document.addEventListener('click',e=>{if(e.target.matches('[data-plan]'))$('#payModal').classList.add('on');});
// ---------- CODE
const TH=window.CODE_THEMES;const prog=store.get('permis_code',{});
function codeHome(){$('#codeRun').style.display='none';$('#codeHome').style.display='grid';
 $('#codeHome').innerHTML=TH.map(t=>{const p=prog[t.id]||0;return `<button class="card theme" data-th="${t.id}"><div class="ic">${t.ic}</div><h3 style="font-size:17px">${t.t}</h3><div class="prog" style="margin-top:12px"><i style="width:${p*20}%"></i></div><p style="font-size:13px;margin-top:8px">${p}/5 réussies</p></button>`}).join('');}
$('#codeHome').addEventListener('click',e=>{const b=e.target.closest('[data-th]');if(b)lesson(TH.find(t=>t.id===b.dataset.th));});
function lesson(t){$('#codeHome').style.display='none';const r=$('#codeRun');r.style.display='block';
 r.innerHTML=`<button class="btn sec sm" id="back">← Thèmes</button><h2 class="h2" style="font-size:32px">${t.ic} ${t.t}</h2><div class="card"><h3>L'essentiel</h3><ul class="lesson">${t.cours.map(c=>'<li>'+c+'</li>').join('')}</ul><button class="btn sec sm" id="readL">🔊 Écouter le cours</button></div><button class="btn pri" id="startQ" style="margin-top:16px">Je m'entraîne (5 questions)</button>`;
 $('#back').onclick=codeHome;$('#readL').onclick=()=>say(t.cours.join(' '));$('#startQ').onclick=()=>quiz(t.q.map(x=>({...x,th:t.id})),{title:t.t,onEnd:(ok)=>{prog[t.id]=Math.max(prog[t.id]||0,ok);store.set('permis_code',prog);}});}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let qTimer=0;
function quiz(Q,o){const r=$('#codeRun');$('#codeHome').style.display='none';r.style.display='block';let i=0,ok=0;const wrong=[];
 function show(){clearInterval(qTimer);if(i>=Q.length)return end();const q=Q[i];let left=o.time||0;
  r.innerHTML=`<div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><span class="pill">${o.title} · ${i+1}/${Q.length}</span>${o.time?'<span class="pill">⏱ <span class="timer" id="tm">'+left+'</span> s</span>':''}</div><div class="prog" style="margin-top:12px"><i style="width:${i/Q.length*100}%"></i></div><div class="qtxt">${q.q}</div><div class="ans">${q.c.map((c,k)=>`<button data-k="${k}">${String.fromCharCode(65+k)}. ${c}</button>`).join('')}</div><div id="ex"></div>`;
  if(o.time)qTimer=setInterval(()=>{left--;const t=$('#tm');if(t)t.textContent=left;if(left<=0){clearInterval(qTimer);pick(-1);}},1000);
  $$('.ans button').forEach(b=>b.onclick=()=>pick(+b.dataset.k));}
 function pick(k){clearInterval(qTimer);const q=Q[i];const bs=$$('.ans button');bs.forEach(b=>b.disabled=true);bs[q.a].classList.add('ok');
  if(k===q.a)ok++;else{if(k>=0)bs[k].classList.add('ko');wrong.push(q);}
  if(o.exam){i++;setTimeout(show,450);return;}
  $('#ex').innerHTML=`<div class="expl">${k===q.a?'✅ Bonne réponse.':'❌ La bonne réponse était '+String.fromCharCode(65+q.a)+'.'} ${q.e}</div><button class="btn pri sm" style="margin-top:12px" id="nx">Suivante →</button>`;$('#nx').onclick=()=>{i++;show();};}
 function end(){o.onEnd&&o.onEnd(ok);const pass=o.exam?ok>=35:ok>=4;
  r.innerHTML=`<div class="card" style="text-align:center;padding:36px"><div style="font-size:54px">${pass?'🎉':'💪'}</div><h2 class="h2" style="font-size:34px">${ok} / ${Q.length}</h2><p class="lead" style="margin:0 auto">${o.exam?(pass?"Examen blanc réussi ! Il en faut 35 sur 40 le jour J.":"Il faut 35 bonnes réponses sur 40. Revois tes erreurs et recommence."):(pass?"Très bien, thème maîtrisé.":"Relis le cours et réessaie.")}</p></div>
  ${wrong.length?'<h3 style="margin-top:24px">Tes erreurs</h3>'+wrong.map(q=>`<div class="expl"><b>${q.q}</b><br>✅ ${q.c[q.a]}<br><span style="color:#9fb0cc">${q.e}</span></div>`).join(''):''}
  <button class="btn pri" style="margin-top:18px" id="bk">Retour aux thèmes</button>`;$('#bk').onclick=codeHome;}
 show();}
$('#examBtn').onclick=()=>{const all=TH.flatMap(t=>t.q);quiz(shuffle(all).slice(0,40),{title:'Examen blanc',time:20,exam:true});};
codeHome();
// ---------- QUESTIONS DU PERMIS
let fi=-1;
function nextFiche(){const F=window.FICHES;let n;do{n=Math.floor(Math.random()*F.length)}while(n===fi&&F.length>1);fi=n;const f=F[n];
 $('#fiche').innerHTML=`<div class="card"><h3>🔧 Vérification <span class="pill" style="font-size:11px">${f.vo}</span></h3><p style="color:#e6ecf7;font-size:18px">${f.v}</p></div>
 <div class="card"><h3>🛣️ Question de sécurité routière</h3><p style="color:#e6ecf7;font-size:18px">${f.sr}</p><button class="btn sec sm" style="margin-top:10px" data-rv="a1">Voir la réponse</button><div class="reveal-a" id="a1">${f.sra}</div></div>
 <div class="card"><h3>⛑️ Question de premiers secours</h3><p style="color:#e6ecf7;font-size:18px">${f.ps}</p><button class="btn sec sm" style="margin-top:10px" data-rv="a2">Voir la réponse</button><div class="reveal-a" id="a2">${f.psa}</div></div>`;}
$('#fiche').addEventListener('click',e=>{const b=e.target.closest('[data-rv]');if(b)$('#'+b.dataset.rv).classList.toggle('on');});
$('#nextFiche').onclick=nextFiche;$('#readFiche').onclick=()=>{const f=window.FICHES[fi];if(f)say(f.v+' Ensuite : '+f.sr+' Et enfin : '+f.ps);};
// ---------- VEHICULE
const VEH=store.get('permis_vehicule',{modele:'citadine'});
const MCOL={citadine:'#38bdf8',compacte:'#a78bfa',suv:'#f59e0b'};
function cabin(){const acc=MCOL[VEH.modele]||'#38bdf8';const tall=VEH.modele==='suv';
 $('#cabin').innerHTML=`<svg viewBox="0 0 160 90" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">
 <defs><linearGradient id="dsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2e36"/><stop offset="1" stop-color="#121418"/></linearGradient></defs>
 <path d="M0 0 H160 V90 H0Z M14 4 Q80 -2 146 4 L156 ${tall?52:56} Q80 ${tall?44:48} 4 ${tall?52:56}Z" fill="#0d0f13" fill-rule="evenodd"/>
 <path d="M0 ${tall?50:54} Q80 ${tall?40:44} 160 ${tall?50:54} V90 H0Z" fill="url(#dsh)"/>
 <rect x="64" y="${tall?42:46}" width="34" height="11" rx="2.5" fill="#05070b" stroke="#2a2e36" stroke-width=".6"/>
 <text x="81" y="${tall?49.5:53.5}" fill="#e6f6ff" font-size="5" font-weight="800" text-anchor="middle" font-family="Arial">50</text>
 <path d="M68 ${tall?47:51} a4 4 0 0 1 6 -2" stroke="${acc}" stroke-width=".9" fill="none"/>
 <rect x="104" y="${tall?58:62}" width="26" height="15" rx="2" fill="#0b0f15" stroke="#23272e" stroke-width=".8"/><rect x="107" y="${tall?61:65}" width="20" height="4" rx="1" fill="${acc}" opacity=".7"/>
 <circle cx="12" cy="${tall?60:64}" r="5" fill="#15171a" stroke="#2c2f35" stroke-width="1"/><circle cx="148" cy="${tall?60:64}" r="5" fill="#15171a" stroke="#2c2f35" stroke-width="1"/>
 <rect x="76" y="${tall?44:48}" width="8" height="3.4" rx=".8" fill="#dc2626"/>
 <g transform="translate(64 ${tall?72:76})"><ellipse rx="22" ry="20" fill="none" stroke="#1b1d22" stroke-width="5"/><rect x="-7" y="-4" width="14" height="9" rx="3" fill="#23262c"/></g>
 <rect x="74" y="80" width="10" height="10" rx="2" fill="#1a1c20"/><rect x="88" y="82" width="6" height="8" rx="1.5" fill="#1a1c20"/>
 <rect x="68" y="2" width="24" height="5" rx="2.5" fill="#2a2f38"/>
 <path d="M150 20 L158 60" stroke="#3b3f47" stroke-width="2"/></svg>`+window.CONTROLS.map((c,i)=>`<button class="hs" style="left:${c.x}%;top:${tall&&c.y>40?c.y-4:c.y}%" data-c="${i}" title="${c.n}">${i+1}</button>`).join('');
 $$('#models button').forEach(b=>b.classList.toggle('on',b.dataset.m===VEH.modele));}
$('#models').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;VEH.modele=b.dataset.m;store.set('permis_vehicule',VEH);cabin();};
$('#cabin').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;$$('.hs').forEach(x=>x.classList.toggle('sel',x===b));const c=window.CONTROLS[+b.dataset.c];
 $('#ctrlInfo').innerHTML=`<div class="ic">${+b.dataset.c+1}</div><h3>${c.n}</h3><p>${c.d}</p><div class="expl">🎓 ${c.ex}</div><button class="btn sec sm" style="margin-top:12px" id="rc">🔊 Écouter</button>`;$('#rc').onclick=()=>say(c.n+'. '+c.d+' '+c.ex);});
cabin();
// ---------- MON PARCOURS
const TYPES={pad:['#9333ea','P','Priorité à droite'],stop:['#dc2626','S','Stop'],cedez:['#f59e0b','C','Cédez-le-passage'],feu:['#16a34a','F','Feu tricolore'],rp:['#2563eb','R','Rond-point'],mrp:['#60a5fa','r','Mini rond-point']};
$('#addt').insertAdjacentHTML('beforeend',Object.entries(TYPES).map(([k,t])=>`<button data-add="${k}">${t[1]} ${t[2]}</button>`).join(''));
let map=null,wps=[],wpL=null,line=null,routePts=[],cum=[],evs=[],evL=null,addMode=null,cityName='';
const st=t=>$('#rStatus').textContent=t;
function initMap(){if(map){setTimeout(()=>map.invalidateSize(),60);return;}
 map=L.map('map',{zoomControl:true}).setView([47.4766,-1.7625],15);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© contributeurs OpenStreetMap'}).addTo(map);
 wpL=L.layerGroup().addTo(map);evL=L.layerGroup().addTo(map);cityName='Blain';
 map.on('click',e=>{if(addMode){addManual(addMode,e.latlng);return;}wps.push(e.latlng);drawWps();compute();});
 setTimeout(()=>map.invalidateSize(),100);}
function drawWps(){wpL.clearLayers();wps.forEach((p,i)=>L.circleMarker(p,{radius:i?6:9,color:'#fff',weight:2,fillColor:i?'#38bdf8':'#22c55e',fillOpacity:1}).addTo(wpL).bindTooltip(i?'Point '+i:'Départ'));}
$('#citySearch').onclick=async()=>{const q=$('#city').value.trim();if(!q)return;st('Recherche…');
 try{const r=await fetch('https://nominatim.openstreetmap.org/search?format=json&countrycodes=fr&limit=1&q='+encodeURIComponent(q)).then(r=>r.json());
  if(!r.length)return st('Ville introuvable');map.setView([+r[0].lat,+r[0].lon],15);cityName=q;st('Clique sur la carte pour placer ton départ.');}catch(e){st('Recherche impossible pour le moment.');}};
$('#city').addEventListener('keydown',e=>{if(e.key==='Enter')$('#citySearch').click();});
$('#undo').onclick=()=>{wps.pop();drawWps();compute();};
$('#clearR').onclick=()=>{wps=[];drawWps();routePts=[];if(line)line.remove();line=null;evs=[];renderEvs();st('');};
let cT=0;async function compute(){clearTimeout(cT);if(wps.length<2){if(line)line.remove();line=null;routePts=[];return;}
 cT=setTimeout(async()=>{st('Calcul de l\'itinéraire…');
  try{const c=wps.map(p=>p.lng.toFixed(6)+','+p.lat.toFixed(6)).join(';');
   const r=await fetch('https://router.project-osrm.org/route/v1/driving/'+c+'?overview=full&geometries=geojson').then(r=>r.json());
   if(!r.routes||!r.routes.length)return st('Itinéraire introuvable');
   routePts=r.routes[0].geometry.coordinates.map(([x,y])=>[y,x]);buildCum();
   if(line)line.remove();line=L.polyline(routePts,{color:'#38bdf8',weight:6,opacity:.9}).addTo(map);
   const km=cum[cum.length-1]/1000;st(km.toFixed(2)+' km'+(km>10?' — trop long, 10 km maximum':' · clique « Détecter les pièges »'));evs=[];renderEvs();
  }catch(e){st('Calcul impossible pour le moment.');}},350);}
function buildCum(){const k=111320*Math.cos(routePts[0][0]*Math.PI/180);cum=[0];for(let i=1;i<routePts.length;i++)cum.push(cum[i-1]+Math.hypot((routePts[i][0]-routePts[i-1][0])*110540,(routePts[i][1]-routePts[i-1][1])*k));}
function project(lat,lng){const k=111320*Math.cos(lat*Math.PI/180);let best={d:1e9,s:0,b:0};
 for(let i=0;i<routePts.length-1;i++){const ax=(routePts[i][1]-lng)*k,ay=(routePts[i][0]-lat)*110540,bx=(routePts[i+1][1]-lng)*k,by=(routePts[i+1][0]-lat)*110540;
  const dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy||1;let t=-(ax*dx+ay*dy)/L2;t=Math.max(0,Math.min(1,t));const px=ax+dx*t,py=ay+dy*t,d=Math.hypot(px,py);
  if(d<best.d)best={d,s:cum[i]+t*Math.sqrt(L2),b:Math.atan2(dx,dy)*180/Math.PI};}return best;}
async function detect(){if(routePts.length<2)return st('Trace d\'abord ton parcours (au moins 2 points).');
 if(cum[cum.length-1]>10000)return st('Parcours trop long : 10 km maximum.');
 st('Analyse des rues avec OpenStreetMap…');$('#detect').disabled=true;
 const la=routePts.map(p=>p[0]),lo=routePts.map(p=>p[1]);const pad=.0008;const bb=[Math.min(...la)-pad,Math.min(...lo)-pad,Math.max(...la)+pad,Math.max(...lo)+pad].join(',');
 const qy=`[out:json][timeout:60];(way["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential|living_street|primary_link|secondary_link|tertiary_link)$"](${bb});)->.w;(.w;>;);out body;`;
 try{const r=await fetch('https://overpass-api.de/api/interpreter',{method:'POST',body:'data='+encodeURIComponent(qy),headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(r=>r.json());
  const N={},W=[];r.elements.forEach(e=>{if(e.type==='node')N[e.id]=e;else W.push(e);});
  const wof={};W.forEach((w,wi)=>w.nodes.forEach(n=>{(wof[n]=wof[n]||new Set()).add(wi);}));
  const ctrl=new Set(['traffic_signals','stop','give_way','mini_roundabout']);const out=[];
  const near=(n,R)=>{const a=N[n];return Object.values(N).some(b=>b.tags&&ctrl.has(b.tags.highway)&&Math.hypot((a.lat-b.lat)*110540,(a.lon-b.lon)*111320*Math.cos(a.lat*Math.PI/180))<R&&[...(wof[b.id]||[])].some(x=>wof[n].has(x)));};
  const rbSeen=new Set();
  Object.values(N).forEach(n=>{if(!wof[n.id])return;const pr=project(n.lat,n.lon);const ws=[...wof[n.id]].map(i=>W[i]);const nm=[...new Set(ws.map(w=>w.tags&&w.tags.name).filter(Boolean))].slice(0,2).join(' / ');
   const h=n.tags&&n.tags.highway;
   if(h==='traffic_signals'&&pr.d<15){out.push({s:pr.s,t:'feu',nm});return;}
   if(h==='mini_roundabout'&&pr.d<12){out.push({s:pr.s,t:'mrp',nm});return;}
   if((h==='stop'||h==='give_way')&&pr.d<9){// le panneau doit être sur la rue que l'on suit
     const w=ws[0];const k=w.nodes.indexOf(n.id);const m=N[w.nodes[k+1]]||N[w.nodes[k-1]];if(m){const bw=Math.atan2((m.lon-n.lon)*111320*Math.cos(n.lat*Math.PI/180),(m.lat-n.lat)*110540)*180/Math.PI;const da=Math.abs(((bw-pr.b+540)%360)-180);if(da>35&&da<145)return;}
     out.push({s:pr.s,t:h==='stop'?'stop':'cedez',nm});return;}
   const rb=ws.find(w=>w.tags&&/roundabout|circular/.test(w.tags.junction||''));
   if(rb){if(pr.d<10&&!rbSeen.has(rb.id)){rbSeen.add(rb.id);out.push({s:pr.s,t:'rp',nm});}return;}
   if(ws.length>=2&&pr.d<6&&!near(n.id,35))out.push({s:pr.s,t:'pad',nm});});
  out.sort((a,b)=>a.s-b.s);evs=[];out.forEach(e=>{if(!evs.some(x=>x.t===e.t&&Math.abs(x.s-e.s)<15))evs.push(e);});
  // un rond-point : garder l'entrée (premier point)
  renderEvs();st(evs.length+' pièges détectés. Vérifie la liste et complète si besoin.');
 }catch(e){st('Analyse impossible pour le moment, réessaie dans un instant.');}
 $('#detect').disabled=false;}
$('#detect').onclick=detect;
function posAt(s){let lo=0,hi=cum.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(cum[m]<=s)lo=m;else hi=m;}const t=(s-cum[lo])/Math.max(1e-6,cum[hi]-cum[lo]);return[routePts[lo][0]+(routePts[hi][0]-routePts[lo][0])*t,routePts[lo][1]+(routePts[hi][1]-routePts[lo][1])*t];}
function renderEvs(){evL&&evL.clearLayers();
 $('#evlist').innerHTML=evs.map((e,i)=>{const t=TYPES[e.t];return `<div class="ev"><span class="d" style="background:${t[0]}">${t[1]}</span><div><b>${t[2]}</b><div class="status" style="min-height:0;font-size:12px">${e.nm||''} · ${Math.round(e.s)} m</div></div><button data-del="${i}" title="Supprimer">✕</button></div>`;}).join('')||'<div class="status">Aucun piège pour l\'instant.</div>';
 if(evL)evs.forEach(e=>{const t=TYPES[e.t];L.marker(posAt(e.s),{icon:L.divIcon({className:'',html:`<div style="width:24px;height:24px;border-radius:50%;background:${t[0]};border:2px solid #fff;color:#fff;font-weight:900;font-size:12px;display:grid;place-items:center;box-shadow:0 2px 6px rgba(0,0,0,.4)">${t[1]}</div>`,iconSize:[24,24],iconAnchor:[12,12]})}).addTo(evL).bindTooltip(t[2]+(e.nm?' – '+e.nm:''));});
 $('#driveIt').disabled=routePts.length<2;}
$('#evlist').onclick=e=>{const b=e.target.closest('[data-del]');if(b){evs.splice(+b.dataset.del,1);renderEvs();}};
function setAdd(t){addMode=addMode===t?null:t;$$('[data-add]').forEach(b=>b.classList.toggle('on',b.dataset.add===addMode));if(addMode)st('Clique sur le parcours à l\'endroit du '+TYPES[addMode][2].toLowerCase()+'.');}
$('#addt').onclick=e=>{const b=e.target.closest('[data-add]');if(b)setAdd(b.dataset.add);};
function addManual(t,ll){if(routePts.length<2)return st('Trace d\'abord ton parcours.');const pr=project(ll.lat,ll.lng);if(pr.d>40)return st('Clique plus près du parcours bleu.');evs.push({s:pr.s,t,nm:'Ajouté par toi'});evs.sort((a,b)=>a.s-b.s);renderEvs();setAdd(null);st(TYPES[t][2]+' ajouté ✔');}
$('#driveIt').onclick=()=>{if(routePts.length<2)return;store.set('permis_route',{name:cityName||'Mon parcours',pts:routePts.map(p=>[+p[0].toFixed(6),+p[1].toFixed(6)]),ev:evs.map(e=>({s:Math.round(e.s),t:e.t,nm:e.nm}))});location.href='conduite.html?r=perso';};
// ---------- reconnaissance vocale
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function listen(btn,onText){if(!SR){onText(null);return;}const r=new SR();r.lang='fr-FR';r.interimResults=false;btn.classList.add('on');r.onresult=e=>onText(e.results[0][0].transcript);r.onend=()=>btn.classList.remove('on');r.onerror=()=>btn.classList.remove('on');r.start();}
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
function routeCommand(txt){const t=norm(txt);$('#micTxt').textContent='« '+txt+' »';
 const map2=[['priorite',"pad"],['stop','stop'],['cedez','cedez'],['feu','feu'],['mini','mrp'],['rond','rp']];
 if(/supprim|enleve|retire/.test(t)){evs.pop();renderEvs();say('Dernier piège supprimé.');return;}
 if(/lance|conduire|demarr|go/.test(t)){$('#driveIt').click();return;}
 if(/detect|analyse|cherche/.test(t)){detect();say('Je cherche les pièges sur ton parcours.');return;}
 for(const [k,v] of map2){if(t.includes(k)){setAdd(v);say('D\'accord. Clique sur le parcours à l\'endroit du '+TYPES[v][2]+'.');return;}}
 say("Je n'ai pas compris. Tu peux dire : il manque un stop, ajoute une priorité à droite, supprime le dernier, ou lance le parcours.");}
$('#mic').onclick=()=>listen($('#mic'),t=>{if(t==null){$('#micTxt').textContent="Ton navigateur ne gère pas la voix. Essaie avec Chrome, ou utilise les boutons.";return;}routeCommand(t);});
// ---------- coach vocal
const FAQ=[[/priorit.*droite|droite/,"À une intersection sans panneau, la voiture qui arrive de ta droite passe avant toi. Ralentis, regarde à droite, et ne passe que si c'est libre."],
 [/stop/,"Au stop, tu marques un arrêt complet, roues bloquées, à la limite de la chaussée, même si personne ne vient. Sinon, c'est éliminatoire à l'examen."],
 [/rond|giratoire/,"Dans un rond-point, ceux qui sont déjà dedans sont prioritaires. Tu cèdes le passage à gauche en entrant, et tu mets ton clignotant à droite avant de sortir."],
 [/clignot/,"Mets ton clignotant avant chaque changement de direction ou de voie, même s'il n'y a personne. C'est une erreur très fréquente à l'examen."],
 [/alcool|boire|verre/,"En permis probatoire, la limite est de 0,2 gramme par litre de sang : en pratique, zéro verre."],
 [/point/,"Un permis probatoire commence avec 6 points. Sans infraction, tu arrives à 12 points au bout de 3 ans, ou 2 ans après la conduite accompagnée."],
 [/vitesse|km|limit/,"En ville c'est 50 km/h. Hors agglomération, 80 en général. En permis probatoire : 110 sur autoroute, 100 sur voie rapide."],
 [/stress|peur|angoiss/,"C'est normal d'avoir le trac. Respire lentement, roule à ton rythme et pense à tes contrôles : rétro, angle mort, clignotant. Tu connais déjà ton parcours, c'est un vrai avantage."],
 [/examen|inspecteur|examinateur/,"L'examen pratique dure environ 32 minutes, dont environ 25 de conduite. L'inspecteur te pose aussi 3 questions : une vérification, une de sécurité routière et une de premiers secours."],
 [/telephone|portable/,"Tenir son téléphone en conduisant, c'est 135 euros et 3 points en moins. Range-le avant de démarrer."]];
function coachAnswer(q){const t=norm(q);const f=FAQ.find(([r])=>r.test(t));return f?f[1]:"Je ne connais pas encore la réponse à cette question. Essaie avec des mots comme : priorité à droite, stop, rond-point, clignotant, vitesse, alcool ou points.";}
function coachAsk(q){if(!q)return;const log=$('#coachLog');log.insertAdjacentHTML('beforeend','<div class="u"></div>');log.lastChild.textContent=q;const a=coachAnswer(q);log.insertAdjacentHTML('beforeend','<div class="b"></div>');log.lastChild.textContent=a;log.scrollTop=1e6;say(a);}
$('#coachBtn').onclick=()=>$('#coachBox').classList.toggle('on');
$('#coachQ').addEventListener('keydown',e=>{if(e.key==='Enter'){coachAsk(e.target.value.trim());e.target.value='';}});
$('#coachMic').onclick=()=>listen($('#coachMic'),t=>{if(t==null){coachAsk('');$('#coachLog').insertAdjacentHTML('beforeend','<div class="b">Ton navigateur ne gère pas la voix. Écris ta question.</div>');return;}coachAsk(t);});
route();
})();
