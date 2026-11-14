// Moteur de conduite Street View – Permis 3D
(async()=>{
const prep=document.getElementById('pt');
// ---------- itinéraire : perso (localStorage) ou Blain par défaut
let R=[],EV=[],CITY='Blain';
const qs=new URLSearchParams(location.search);
let custom=null;try{if(qs.get('r')==='perso')custom=JSON.parse(localStorage.getItem('permis_route')||'null');}catch(e){}
if(custom&&custom.pts&&custom.pts.length>1){R=custom.pts;EV=(custom.ev||[]).map(e=>({s:e.s,t:e.t,nm:e.nm||''}));CITY=custom.name||'Mon parcours';}
else{const D=window.SIMRAW,LAT0=47.4766,LON0=-1.7625,KX=111320*Math.cos(LAT0*Math.PI/180),KZ=110540;let x=0,z=0;
 for(let i=0;i<D.r.length;i+=2){x+=D.r[i];z+=D.r[i+1];R.push([LAT0-z/KZ,LON0+x/KX]);}
 EV=D.ev.map(([s,t,n])=>({s,t,nm:D.n[n]}));}
EV.sort((a,b)=>a.s-b.s);
const KX0=111320*Math.cos(R[0][0]*Math.PI/180),KY0=110540;
const C=[0];for(let i=1;i<R.length;i++)C.push(C[i-1]+Math.hypot((R[i][0]-R[i-1][0])*KY0,(R[i][1]-R[i-1][1])*KX0));
const total=C[C.length-1];
function pos(s){s=Math.max(0,Math.min(total,s));let lo=0,hi=C.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(C[m]<=s)lo=m;else hi=m;}const t=(s-C[lo])/Math.max(1e-6,C[hi]-C[lo]);return{lat:R[lo][0]+(R[hi][0]-R[lo][0])*t,lng:R[lo][1]+(R[hi][1]-R[lo][1])*t};}
function bearing(a,b){const y=Math.sin((b.lng-a.lng)*Math.PI/180)*Math.cos(b.lat*Math.PI/180);const x=Math.cos(a.lat*Math.PI/180)*Math.sin(b.lat*Math.PI/180)-Math.sin(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.cos((b.lng-a.lng)*Math.PI/180);return (Math.atan2(y,x)*180/Math.PI+360)%360;}
document.querySelectorAll('.cityname').forEach(e=>e.textContent=CITY);
// ---------- style du véhicule
const VEH=(()=>{try{return JSON.parse(localStorage.getItem('permis_vehicule')||'{}')}catch(e){return{}}})();
const ACC={citadine:'#38bdf8',compacte:'#a78bfa',suv:'#f59e0b'}[VEH.modele||'citadine']||'#38bdf8';
document.documentElement.style.setProperty('--acc',ACC);
const T={pad:['#9333ea','P','Priorité à droite',"Aucun panneau : la voiture qui vient de ta droite passe avant toi. Ralentis et regarde à droite."],
 stop:['#dc2626','S','Stop',"Arrêt complet obligatoire, même si personne ne vient."],
 cedez:['#f59e0b','C','Cédez-le-passage',"Ralentis et laisse passer ceux qui arrivent."],
 feu:['#16a34a','F','Feu tricolore',"Au feu orange, tu t'arrêtes sauf si freiner est dangereux."],
 rp:['#2563eb','R','Rond-point',"Ceux qui sont dans le rond-point passent avant toi. Clignotant à droite pour sortir."],
 mrp:['#60a5fa','r','Mini rond-point',"Regarde les panneaux à l'entrée pour savoir qui passe."]};
// ---------- Street View : recherche des images le long du parcours
const {StreetViewPanorama,StreetViewService,StreetViewSource,StreetViewPreference}=await google.maps.importLibrary("streetView");
const svc=new StreetViewService();
const STEP=5,N=Math.floor(total/STEP);const P=new Array(N+1);let done=0;
async function res(i){const p=pos(i*STEP);try{const r=await svc.getPanorama({location:p,radius:20,source:StreetViewSource.OUTDOOR,preference:StreetViewPreference.NEAREST});P[i]={id:r.data.location.pano};}catch(e){P[i]=null;}done++;document.getElementById('pb').style.width=(done/(N+1)*100)+'%';}
let q=0;await Promise.all(Array.from({length:10},async()=>{while(q<=N){const i=q++;await res(i);}}));
const seq=[];for(let i=0;i<=N;i++){if(P[i]&&(!seq.length||seq[seq.length-1].id!==P[i].id))seq.push({s:i*STEP,id:P[i].id});}
if(seq.length<2){prep.textContent="Pas assez d'images Street View sur ce parcours. Essaie un autre trajet.";return;}
prep.textContent=seq.length+' images Street View trouvées';
const opts=(id)=>({pano:id,pov:{heading:bearing(pos(0),pos(15)),pitch:-2},disableDefaultUI:true,linksControl:false,clickToGo:false,showRoadLabels:false,motionTracking:false,addressControl:false,zoom:1});
const elA=document.getElementById('svA'),elB=document.getElementById('svB');
let front={p:new StreetViewPanorama(elA,opts(seq[0].id)),el:elA},back={p:new StreetViewPanorama(elB,opts(seq[1].id)),el:elB};
setTimeout(()=>document.getElementById('prep').remove(),900);
// ---------- état
let s=0,v=0,ei=0,si=0,last=performance.now(),shown=-1,play=false,wheel=0,ph=null,swapT=0;
document.getElementById('pp').onclick=e=>{play=!play;e.target.textContent=play?'⏸ Pause':'▶ Lecture';};
const help=document.getElementById('help');help.style.display='flex';
const bl=document.getElementById('bl'),br=document.getElementById('br');setInterval(()=>{const d=new Date();document.getElementById('clk').textContent=d.toTimeString().slice(0,5);},1000);
const al=document.getElementById('al'),spd=document.getElementById('spd'),st=document.getElementById('street'),wh=document.getElementById('wheel');
// ---------- audio + voix
let AC=null;function beep(f,d,vol,type){if(!AC)return;const o=AC.createOscillator(),g=AC.createGain();o.type=type||'square';o.frequency.value=f;g.gain.value=vol||.05;o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+d);}
const OPT={exam:true,mon:true,voix:true};try{Object.assign(OPT,JSON.parse(localStorage.getItem('permis_opts')||'{}'));}catch(e){}
function saveOpt(){try{localStorage.setItem('permis_opts',JSON.stringify(OPT));}catch(e){}}
let frVoice=null;function pickVoice(){const vs=speechSynthesis.getVoices();frVoice=vs.find(v=>/fr/i.test(v.lang)&&/Google|Amélie|Thomas|Microsoft/i.test(v.name))||vs.find(v=>/fr/i.test(v.lang))||null;}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
function say(who,txt){const box=document.getElementById(who==='exam'?'avExam':'avMon');if(!OPT[who])return;
 box.querySelector('.bub').textContent=txt;box.classList.add('talk');clearTimeout(box._t);box._t=setTimeout(()=>box.classList.remove('talk'),4200);
 if(OPT.voix&&'speechSynthesis' in window){const u=new SpeechSynthesisUtterance(txt);u.lang='fr-FR';if(frVoice)u.voice=frVoice;u.rate=1.05;u.pitch=who==='exam'?0.9:1.1;speechSynthesis.speak(u);}}
function applyOpts(){document.getElementById('avExam').style.display=OPT.exam?'flex':'none';document.getElementById('avMon').style.display=OPT.mon?'flex':'none';
 document.querySelectorAll('[data-opt]').forEach(b=>b.classList.toggle('on',!!OPT[b.dataset.opt]));}
document.querySelectorAll('[data-opt]').forEach(b=>b.onclick=()=>{OPT[b.dataset.opt]=!OPT[b.dataset.opt];saveOpt();applyOpts();});applyOpts();
document.getElementById('go').onclick=()=>{try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();}catch(e){}help.style.display='none';play=true;
 say('exam',"Bonjour. Nous allons commencer l'épreuve. Suivez la route, je vous indiquerai la direction.");setTimeout(()=>say('mon',"Allez, on est calme. Rétro, angle mort, et on y va."),4500);};
// ---------- commandes
const K={acc:false,brk:false};let blink=0;
function setBlink(x){blink=(blink===x?0:x);document.getElementById('kl').classList.toggle('on',blink===-1);document.getElementById('kr').classList.toggle('on',blink===1);}
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;const k=e.key.toLowerCase();if(k==='arrowup'||k==='z'||k==='w'){K.acc=true;e.preventDefault();}else if(k==='arrowdown'||k==='s'||k===' '){K.brk=true;e.preventDefault();}else if(k==='a'||k==='q'){setBlink(-1);}else if(k==='e'||k==='d'){setBlink(1);}else if(k==='k'){beep(420,.35,.08,'sawtooth');}});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();if(k==='arrowup'||k==='z'||k==='w')K.acc=false;if(k==='arrowdown'||k==='s'||k===' ')K.brk=false;});
function hold(id,key){const b=document.getElementById(id);const on=e=>{e.preventDefault();K[key]=true;b.classList.add('down');},off=()=>{K[key]=false;b.classList.remove('down');};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);}
hold('pa','acc');hold('pb2','brk');
document.getElementById('kl').onclick=()=>setBlink(-1);document.getElementById('kr').onclick=()=>setBlink(1);
// ---------- virages
const hd=x=>bearing(pos(x),pos(x+8));const TURNS=[];
const nearRP=x=>EV.some(e=>(e.t==='rp'||e.t==='mrp')&&Math.abs(e.s-x)<45);
for(let x=20;x<total-20;x+=4){let d=((hd(x+12)-hd(x-12)+540)%360)-180;if(Math.abs(d)>42&&!nearRP(x)){const side=d<0?-1:1;const L=TURNS[TURNS.length-1];if(L&&x-L.s<30){if(Math.abs(d)>Math.abs(L.d)){L.s=x;L.d=d;L.side=side;}}else TURNS.push({s:x,d,side});}}
// ---------- fautes
let nf=0;const nfEl=document.getElementById('nf'),flt=document.getElementById('flt');let fltT=0;const FL=[];
function msg(t,good){flt.textContent=t;flt.classList.toggle('good',!!good);flt.classList.add('show');clearTimeout(fltT);fltT=setTimeout(()=>flt.classList.remove('show'),2600);}
function fault(t,mon){nf++;FL.push(t);nfEl.textContent=nf;nfEl.className=nf?'ko':'ok';msg('❌ '+t);beep(180,.25,.06,'square');if(mon)say('mon',mon);}
let ti=0,tBlinkOk=false,lastSpeedF=-99,saidTurn=-1,saidEv=-1;
function step(dt){
 if(K.brk)v-=7*dt;else if(K.acc)v+=2.3*dt*(1-v/16);else v-=0.5*dt;
 v=Math.max(0,Math.min(16,v));
 const e=EV[ei];
 if(e&&e.t==='stop'){const d=e.s-s;if(d<9&&d>0&&v>6.5){v=Math.max(0,v-12*dt);if(!e.mon){e.mon=true;fault('Le moniteur a freiné à ta place (stop)',"J'ai freiné ! Au stop, on s'arrête complètement.");}}}
 s+=v*dt;
 while(ei<EV.length&&EV[ei].s<s-2){const p=EV[ei];
   if(p.t==='stop'&&!p.ok&&!p.mon)fault('Stop non marqué : faute éliminatoire',"Là, c'est éliminatoire. Roues bloquées au stop, toujours.");
   if(p.t==='pad'&&p.vmax>5.6)fault('Trop vite à une priorité à droite',"Trop vite ! À une priorité à droite, on ralentit et on regarde à droite.");
   ei++;}
 const ne=EV[ei];
 if(ne){const d=ne.s-s;
  if(ne.t==='stop'&&d<7&&v<0.25&&!ne.ok){ne.ok=true;msg('✅ Stop bien marqué',true);}
  if(ne.t==='pad'&&d<6)ne.vmax=Math.max(ne.vmax||0,v);
  if(d<45&&shown!==ei){shown=ei;const t=T[ne.t];al.innerHTML='<span class="dot" style="background:'+t[0]+'">'+t[1]+'</span><div><b style="color:'+t[0]+'">'+t[2]+'</b><small>'+(ne.nm||'')+'</small>'+t[3]+'</div>';al.classList.add('show');}
  if(d<40&&saidEv!==ei){saidEv=ei;const tips={stop:"Stop devant. Tu prépares ton arrêt.",pad:"Priorité à droite, on lève le pied.",cedez:"Cédez-le-passage, regarde bien à gauche et à droite.",feu:"Feu tricolore, anticipe.",rp:"Rond-point. Ceux dedans sont prioritaires.",mrp:"Mini rond-point, attention aux priorités."};say('mon',tips[ne.t]);}}
 if(shown!==-1&&(!ne||ne.s-s>=45)){al.classList.remove('show');shown=-1;}
 const tn=TURNS[ti];
 if(tn){const d=tn.s-s;
  if(d<70&&saidTurn!==ti){saidTurn=ti;say('exam',"Au prochain carrefour, tournez à "+(tn.side<0?'gauche':'droite')+".");}
  if(d<35&&blink===tn.side)tBlinkOk=true;
  if(d<0){if(!tBlinkOk)fault('Clignotant '+(tn.side<0?'gauche':'droit')+' oublié',"Le clignotant ! On l'annonce avant de tourner.");ti++;tBlinkOk=false;setTimeout(()=>{if(blink)setBlink(blink);},900);}}
 if(v*3.6>55&&performance.now()-lastSpeedF>8000){lastSpeedF=performance.now();fault('Excès de vitesse (limite 50 km/h)',"Regarde ton compteur, tu es au-dessus de cinquante.");}
 if(s>=total-1){play=false;const ok=nf===0;
   help.querySelector('h2').textContent=ok?'Parcours terminé sans faute ! 🎉':('Parcours terminé : '+nf+' faute'+(nf>1?'s':''));
   help.querySelector('.intro').innerHTML=ok?"Bravo, l'examinateur est satisfait.":('<b>À retravailler :</b><br>'+[...new Set(FL)].map(x=>'• '+x).join('<br>'));
   help.querySelector('#go').textContent='Recommencer';help.style.display='flex';
   say('exam',ok?"C'est terminé. Très bonne conduite.":"C'est terminé. Il y a quelques points à retravailler.");
   s=0;v=0;ei=0;si=0;ti=0;nf=0;FL.length=0;nfEl.textContent=0;nfEl.className='ok';EV.forEach(x=>{x.ok=x.mon=false;x.vmax=0;});front.p.setPano(seq[0].id);back.p.setPano(seq[1].id);}
}
function swap(){const t=front;front=back;back=t;front.el.style.opacity=1;back.el.style.opacity=0;front.el.style.zIndex=2;back.el.style.zIndex=1;
 setTimeout(()=>{if(seq[si+1])back.p.setPano(seq[si+1].id);back.p.setZoom(1);},320);}
let tick=0;
function frame(now){const dt=Math.max(0,Math.min(0.1,(now-last)/1000));last=now;
 if(play)step(dt);
 if(si+1<seq.length&&s>=seq[si+1].s&&now-swapT>300){si++;swapT=now;while(si+1<seq.length&&s>=seq[si+1].s+8)si++;if(back.p.getPano()!==seq[si].id)back.p.setPano(seq[si].id);swap();}
 const a=seq[si].s,b=seq[si+1]?seq[si+1].s:a+10;const f=Math.max(0,Math.min(1,(s-a)/Math.max(1,b-a)));
 front.p.setZoom(1+0.75*f);
 const hh=bearing(pos(s),pos(s+14));if(ph===null)ph=hh;let dh=((hh-ph+540)%360)-180;ph=(ph+dh*Math.min(1,(v>0.3?2.5:0.3)*dt)+360)%360;
 wheel+=(Math.max(-110,Math.min(110,dh*4))-wheel)*0.08;wh.style.transform='rotate('+wheel.toFixed(1)+'deg)';
 const bon=Math.floor(now/380)%2===0;bl.classList.toggle('on',blink===-1&&bon);br.classList.toggle('on',blink===1&&bon);
 const t2=Math.floor(now/380);if(blink&&t2!==tick){tick=t2;beep(bon?1800:1400,.015,.04,'square');}
 front.p.setPov({heading:ph,pitch:-2});back.p.setPov({heading:ph,pitch:-2});
 spd.textContent=Math.round(v*3.6);spd.style.color=v*3.6>52?'#f87171':'';
 const e=EV.find(x=>x.s>=s-30);st.textContent=(e&&e.nm?e.nm.split(' / ')[0]:CITY);
 requestAnimationFrame(frame);}
requestAnimationFrame(frame);
})().catch(e=>{const p=document.getElementById('pt');if(p)p.textContent='ERREUR : '+e.message;});
