export default {
  async fetch(request, env, ctx) {
    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>SkillTrack — Team Skill & Certification Tracker</title>
<style>
  :root{
    --bg:#0b0f1a; --panel:#131a2b; --panel2:#1a2238; --line:#26304b;
    --txt:#e8edf7; --mut:#8a96b3; --acc:#5b8cff; --acc2:#7c5bff;
    --ok:#36d399; --warn:#fbbf24; --bad:#f87171; --chip:#202a44;
  }
  *{box-sizing:border-box}
  body{margin:0;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:
    radial-gradient(1200px 600px at 80% -10%,rgba(124,91,255,.18),transparent),
    radial-gradient(1000px 500px at -10% 10%,rgba(91,140,255,.16),transparent),
    var(--bg);color:var(--txt);min-height:100vh}
  a{color:var(--acc)}
  header{display:flex;align-items:center;gap:14px;padding:18px 26px;border-bottom:1px solid var(--line);
    position:sticky;top:0;z-index:50;background:rgba(11,15,26,.82);backdrop-filter:blur(10px)}
  .logo{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,var(--acc),var(--acc2));
    display:grid;place-items:center;font-weight:800;font-size:20px;box-shadow:0 6px 20px rgba(91,140,255,.4)}
  h1{font-size:20px;margin:0;letter-spacing:.3px}
  .sub{color:var(--mut);font-size:12px}
  nav{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap}
  nav button{background:transparent;border:1px solid transparent;color:var(--mut);padding:9px 16px;
    border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;transition:.15s}
  nav button:hover{color:var(--txt);background:var(--panel)}
  nav button.active{color:#fff;background:linear-gradient(135deg,var(--acc),var(--acc2));border-color:transparent}
  main{max-width:1180px;margin:0 auto;padding:26px}
  .grid{display:grid;gap:18px}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}
  .card h2{margin:0 0 14px;font-size:16px;display:flex;align-items:center;gap:8px}
  .row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
  input,select{background:var(--panel2);border:1px solid var(--line);color:var(--txt);
    padding:10px 12px;border-radius:10px;font-size:14px;outline:none;width:100%}
  input:focus,select:focus{border-color:var(--acc)}
  label{font-size:12px;color:var(--mut);display:block;margin:0 0 5px}
  .field{flex:1;min-width:140px}
  button.btn{background:linear-gradient(135deg,var(--acc),var(--acc2));border:none;color:#fff;
    padding:10px 16px;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700;transition:.15s}
  button.btn:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(91,140,255,.35)}
  button.ghost{background:var(--chip);border:1px solid var(--line);color:var(--txt);padding:8px 12px;
    border-radius:9px;cursor:pointer;font-size:13px;font-weight:600}
  button.ghost:hover{border-color:var(--acc)}
  button.danger{background:transparent;border:1px solid var(--line);color:var(--bad);padding:6px 10px;
    border-radius:8px;cursor:pointer;font-size:12px}
  button.danger:hover{background:rgba(248,113,113,.12)}
  .chip{background:var(--chip);border:1px solid var(--line);border-radius:999px;padding:4px 11px;font-size:12px;
    color:var(--mut);display:inline-flex;align-items:center;gap:6px}
  .muted{color:var(--mut)}
  .pill{font-size:11px;padding:3px 9px;border-radius:999px;font-weight:700}
  .pill.ok{background:rgba(54,211,153,.16);color:var(--ok)}
  .pill.warn{background:rgba(251,191,36,.16);color:var(--warn)}
  .pill.bad{background:rgba(248,113,113,.16);color:var(--bad)}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
  .uc{background:var(--panel2);border:1px solid var(--line);border-radius:14px;padding:16px;cursor:pointer;
    position:relative;transition:.15s}
  .uc:hover{border-color:var(--acc);transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.35)}
  .av{width:46px;height:46px;border-radius:12px;display:grid;place-items:center;font-weight:800;color:#fff;font-size:18px}
  .bar{height:7px;border-radius:6px;background:var(--chip);overflow:hidden;margin-top:4px}
  .bar>i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,var(--acc),var(--acc2))}
  .tt{position:fixed;z-index:200;pointer-events:none;background:#0c1120;border:1px solid var(--acc);
    border-radius:12px;padding:13px 15px;width:280px;box-shadow:0 18px 50px rgba(0,0,0,.6);
    opacity:0;transition:opacity .12s;font-size:13px}
  .tt.show{opacity:1}
  .tt h4{margin:0 0 8px;font-size:14px}
  .ttrow{display:flex;justify-content:space-between;gap:8px;margin:4px 0;align-items:center}
  table{width:100%;border-collapse:collapse;font-size:13px}
  th,td{text-align:left;padding:9px 8px;border-bottom:1px solid var(--line)}
  th{color:var(--mut);font-weight:600;font-size:12px}
  .stat{display:flex;flex-direction:column;gap:2px}
  .stat b{font-size:26px}
  .stat span{font-size:12px;color:var(--mut)}
  .statgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .lvlsel{display:flex;gap:3px}
  .lvlsel button{width:24px;height:24px;border-radius:6px;border:1px solid var(--line);background:var(--chip);
    color:var(--mut);cursor:pointer;font-size:11px}
  .lvlsel button.on{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff;border-color:transparent}
  .sk-item{border:1px solid var(--line);border-radius:12px;padding:13px;background:var(--panel2);margin-bottom:10px}
  .empty{text-align:center;color:var(--mut);padding:40px}
  .warnbox{display:flex;align-items:center;gap:10px;padding:11px 14px;border-radius:11px;margin-bottom:9px;
    border:1px solid var(--line);background:var(--panel2)}
  .warnbox.bad{border-color:rgba(248,113,113,.5)}
  .warnbox.warn{border-color:rgba(251,191,36,.5)}
  .modal{position:fixed;inset:0;background:rgba(5,8,16,.7);backdrop-filter:blur(4px);z-index:300;
    display:none;align-items:center;justify-content:center;padding:20px}
  .modal.show{display:flex}
  .modal .box{background:var(--panel);border:1px solid var(--line);border-radius:18px;width:100%;
    max-width:640px;max-height:88vh;overflow:auto;padding:24px}
  .x{margin-left:auto;background:none;border:none;color:var(--mut);font-size:22px;cursor:pointer}
  .flex-h{display:flex;align-items:center;gap:10px}
  legend.leg{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--mut);margin-top:8px}
  legend.leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;vertical-align:middle}
  @media(max-width:720px){.statgrid{grid-template-columns:repeat(2,1fr)}nav button{padding:8px 11px;font-size:13px}}
</style>
</head>
<body>
<header>
  <div class="logo">S</div>
  <div>
    <h1>SkillTrack</h1>
    <div class="sub">Team skills & certification intelligence</div>
  </div>
  <nav>
    <button data-tab="dashboard" class="active">Dashboard</button>
    <button data-tab="users">Users</button>
    <button data-tab="skills">Skills</button>
    <button data-tab="certs">Certifications</button>
  </nav>
</header>
<main id="app"></main>

<div class="modal" id="modal"><div class="box" id="modalBox"></div></div>
<div class="tt" id="tooltip"></div>

<script>
const LS="skilltrack_v1";
const PALETTE=["#5b8cff","#7c5bff","#36d399","#fbbf24","#f87171","#22d3ee","#f472b6","#a3e635","#fb923c","#818cf8"];
const LEVELS=["—","Novice","Beginner","Competent","Proficient","Expert"];
let db=load();

function load(){
  try{const d=JSON.parse(localStorage.getItem(LS));if(d&&d.users)return d;}catch(e){}
  return seed();
}
function save(){localStorage.setItem(LS,JSON.stringify(db));}
function uid(){return Math.random().toString(36).slice(2,9);}
function seed(){
  const s1={id:uid(),name:"Frontend",color:PALETTE[0],subs:[{id:uid(),name:"React"},{id:uid(),name:"CSS"},{id:uid(),name:"Accessibility"}]};
  const s2={id:uid(),name:"Backend",color:PALETTE[1],subs:[{id:uid(),name:"Node.js"},{id:uid(),name:"Databases"}]};
  const s3={id:uid(),name:"Cloud",color:PALETTE[2],subs:[{id:uid(),name:"AWS"},{id:uid(),name:"Networking"}]};
  const s4={id:uid(),name:"Security",color:PALETTE[3],subs:[{id:uid(),name:"AppSec"}]};
  const s5={id:uid(),name:"Design",color:PALETTE[4],subs:[{id:uid(),name:"Figma"}]};
  const c1={id:uid(),name:"AWS Solutions Architect",months:36};
  const c2={id:uid(),name:"CKA (Kubernetes)",months:24};
  const c3={id:uid(),name:"CISSP",months:12};
  const today=new Date();
  const dt=(d)=>{const x=new Date(today);x.setDate(x.getDate()+d);return x.toISOString().slice(0,10);};
  const u=(name,role,sk,cf)=>({id:uid(),name,role,email:name.toLowerCase().replace(/\\s/g,'.')+"@team.io",color:PALETTE[Math.floor(Math.random()*PALETTE.length)],skills:sk,certs:cf,joined:dt(-Math.floor(Math.random()*900)-50)});
  return {
    skills:[s1,s2,s3,s4,s5],
    certs:[c1,c2,c3],
    users:[
      u("Ava Chen","Senior Engineer",{[s1.id]:{lvl:5,subs:{[s1.subs[0].id]:5,[s1.subs[1].id]:4,[s1.subs[2].id]:4}},[s2.id]:{lvl:4,subs:{[s2.subs[0].id]:4}},[s3.id]:{lvl:3,subs:{}}},[{certId:c1.id,issued:dt(-700)},{certId:c2.id,issued:dt(-20)}]),
      u("Marco Diaz","Cloud Lead",{[s3.id]:{lvl:5,subs:{[s3.subs[0].id]:5,[s3.subs[1].id]:4}},[s2.id]:{lvl:4,subs:{}},[s4.id]:{lvl:3,subs:{}}},[{certId:c1.id,issued:dt(-1050)},{certId:c3.id,issued:dt(-330)}]),
      u("Priya Nair","Security Analyst",{[s4.id]:{lvl:5,subs:{[s4.subs[0].id]:5}},[s2.id]:{lvl:3,subs:{}},[s3.id]:{lvl:3,subs:{}}},[{certId:c3.id,issued:dt(-300)}]),
      u("Tom Becker","Designer",{[s5.id]:{lvl:5,subs:{[s5.subs[0].id]:5}},[s1.id]:{lvl:3,subs:{[s1.subs[1].id]:4}}},[]),
    ]
  };
}

// ---- cert helpers ----
function certStatus(cert,issued){
  if(!cert.months) return {state:"ok",days:Infinity,label:"No expiry"};
  const exp=new Date(issued); exp.setMonth(exp.getMonth()+cert.months);
  const days=Math.ceil((exp-new Date())/86400000);
  let state="ok"; if(days<0)state="bad"; else if(days<=60)state="warn";
  return {state,days,exp:exp.toISOString().slice(0,10)};
}
function userAvg(u){
  const vals=Object.values(u.skills||{}).map(s=>s.lvl||0).filter(v=>v>0);
  return vals.length?(vals.reduce((a,b)=>a+b,0)/vals.length):0;
}
function initials(n){return n.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();}

// ---- navigation ----
let TAB="dashboard";
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{
  TAB=b.dataset.tab;
  document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x===b));
  render();
});

function render(){
  const app=document.getElementById('app');
  if(TAB==="dashboard")app.innerHTML=viewDash();
  if(TAB==="users")app.innerHTML=viewUsers();
  if(TAB==="skills")app.innerHTML=viewSkills();
  if(TAB==="certs")app.innerHTML=viewCerts();
  wire();
}

// ---------- DASHBOARD ----------
function viewDash(){
  const totalSubs=db.skills.reduce((a,s)=>a+s.subs.length,0);
  // radar = avg level per skill across users
  const radar=db.skills.map(s=>{
    const vals=db.users.map(u=>u.skills[s.id]?.lvl||0).filter(v=>v>0);
    return {name:s.name,color:s.color,val:vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0,count:vals.length};
  });
  // warnings
  const warns=[];
  db.users.forEach(u=>(u.certs||[]).forEach(uc=>{
    const cert=db.certs.find(c=>c.id===uc.certId); if(!cert)return;
    const st=certStatus(cert,uc.issued);
    if(st.state==="bad"||st.state==="warn")warns.push({u,cert,st});
  }));
  warns.sort((a,b)=>a.st.days-b.st.days);

  return \`
  <div class="grid">
    <div class="card">
      <div class="statgrid">
        <div class="stat"><b>\${db.users.length}</b><span>Team members</span></div>
        <div class="stat"><b>\${db.skills.length}</b><span>Skills · \${totalSubs} subskills</span></div>
        <div class="stat"><b>\${db.certs.length}</b><span>Certification types</span></div>
        <div class="stat"><b style="color:\${warns.length?'var(--warn)':'var(--ok)'}">\${warns.length}</b><span>Cert alerts</span></div>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:1.1fr .9fr">
      <div class="card">
        <h2>📡 Skill distribution (team average)</h2>
        \${radarSVG(radar)}
        <legend class="leg">\${radar.map(r=>\`<span><i style="background:\${r.color}"></i>\${r.name} · \${r.val.toFixed(1)}</span>\`).join('')}</legend>
      </div>
      <div class="card">
        <h2>⚠️ Certification warnings</h2>
        \${warns.length?warns.map(w=>{
          const cls=w.st.state;
          const txt=w.st.days<0?\`expired \${Math.abs(w.st.days)}d ago\`:\`expires in \${w.st.days}d\`;
          return \`<div class="warnbox \${cls}">
            <span class="av" style="width:34px;height:34px;font-size:14px;background:\${w.u.color}">\${initials(w.u.name)}</span>
            <div style="flex:1"><b>\${w.cert.name}</b><div class="muted" style="font-size:12px">\${w.u.name}</div></div>
            <span class="pill \${cls}">\${txt}</span>
          </div>\`;
        }).join(''):'<div class="empty">All certifications are healthy ✅</div>'}
      </div>
    </div>
    <div class="card">
      <h2>🏆 Top skill coverage</h2>
      <table><thead><tr><th>Skill</th><th>People</th><th>Avg level</th><th style="width:38%">Coverage</th></tr></thead><tbody>
      \${radar.slice().sort((a,b)=>b.val-a.val).map(r=>\`<tr>
        <td><span class="chip"><i style="display:inline-block;width:9px;height:9px;border-radius:3px;background:\${r.color}"></i>\${r.name}</span></td>
        <td>\${r.count}/\${db.users.length}</td>
        <td><b>\${r.val.toFixed(1)}</b> <span class="muted">\${LEVELS[Math.round(r.val)]||''}</span></td>
        <td><div class="bar"><i style="width:\${(r.val/5*100)}%"></i></div></td>
      </tr>\`).join('')}
      </tbody></table>
    </div>
  </div>\`;
}

function radarSVG(data){
  const N=data.length; if(N<3)return '<div class="empty">Add at least 3 skills to see the radar chart.</div>';
  const cx=170,cy=165,R=120,max=5;
  const pt=(i,r)=>{const a=(Math.PI*2*i/N)-Math.PI/2;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r];};
  let rings='';
  for(let g=1;g<=5;g++){
    const pts=data.map((_,i)=>pt(i,R*g/5).join(',')).join(' ');
    rings+=\`<polygon points="\${pts}" fill="none" stroke="#26304b" stroke-width="1"/>\`;
  }
  let axes='',labels='';
  data.forEach((d,i)=>{
    const [x,y]=pt(i,R);axes+=\`<line x1="\${cx}" y1="\${cy}" x2="\${x}" y2="\${y}" stroke="#26304b"/>\`;
    const [lx,ly]=pt(i,R+22);
    const anchor=Math.abs(lx-cx)<8?'middle':(lx>cx?'start':'end');
    labels+=\`<text x="\${lx}" y="\${ly}" fill="#8a96b3" font-size="11" text-anchor="\${anchor}" dominant-baseline="middle">\${d.name}</text>\`;
  });
  const poly=data.map((d,i)=>pt(i,R*(d.val/max)).join(',')).join(' ');
  const dots=data.map((d,i)=>{const[x,y]=pt(i,R*(d.val/max));return \`<circle cx="\${x}" cy="\${y}" r="3.5" fill="\${d.color}"/>\`;}).join('');
  return \`<svg viewBox="0 0 340 340" width="100%" style="max-height:340px">
    <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#5b8cff" stop-opacity=".55"/><stop offset="1" stop-color="#7c5bff" stop-opacity=".35"/>
    </linearGradient></defs>
    \${rings}\${axes}
    <polygon points="\${poly}" fill="url(#rg)" stroke="#7c5bff" stroke-width="2"/>
    \${dots}\${labels}
  </svg>\`;
}

// ---------- USERS ----------
function viewUsers(){
  return \`
  <div class="card">
    <h2>➕ Add team member</h2>
    <div class="row">
      <div class="field"><label>Name</label><input id="un" placeholder="Jane Doe"/></div>
      <div class="field"><label>Role</label><input id="ur" placeholder="Engineer"/></div>
      <div class="field"><label>Email</label><input id="ue" placeholder="jane@team.io"/></div>
      <button class="btn" onclick="addUser()">Add</button>
    </div>
  </div>
  <div class="card" style="margin-top:18px">
    <h2>👥 Team (\${db.users.length}) <span class="muted" style="font-weight:400;font-size:12px">— hover a card for full stats</span></h2>
    <div class="cards">
    \${db.users.map(u=>userCard(u)).join('') || '<div class="empty">No users yet.</div>'}
    </div>
  </div>\`;
}
function userCard(u){
  const avg=userAvg(u);
  const skillCount=Object.values(u.skills).filter(s=>s.lvl>0).length;
  const certs=(u.certs||[]);
  let alerts=0;certs.forEach(uc=>{const c=db.certs.find(x=>x.id===uc.certId);if(c){const st=certStatus(c,uc.issued);if(st.state!=='ok')alerts++;}});
  return \`<div class="uc" data-uid="\${u.id}" onmouseenter="showTip(event,'\${u.id}')" onmousemove="moveTip(event)" onmouseleave="hideTip()" onclick="openUser('\${u.id}')">
    <div class="flex-h">
      <span class="av" style="background:\${u.color}">\${initials(u.name)}</span>
      <div style="flex:1;min-width:0">
        <div style="font-weight:700">\${u.name}</div>
        <div class="muted" style="font-size:12px">\${u.role||'—'}</div>
      </div>
      \${alerts?\`<span class="pill bad">\${alerts}⚠</span>\`:''}
    </div>
    <div style="display:flex;gap:8px;margin-top:13px">
      <span class="chip">\${skillCount} skills</span>
      <span class="chip">\${certs.length} certs</span>
      <span class="chip">avg \${avg.toFixed(1)}</span>
    </div>
    <div class="bar" style="margin-top:11px"><i style="width:\${avg/5*100}%"></i></div>
  </div>\`;
}

function showTip(e,id){
  const u=db.users.find(x=>x.id===id);if(!u)return;
  const tt=document.getElementById('tooltip');
  const skills=Object.entries(u.skills).filter(([k,v])=>v.lvl>0).sort((a,b)=>b[1].lvl-a[1].lvl);
  const skRows=skills.map(([sid,v])=>{
    const s=db.skills.find(x=>x.id===sid);if(!s)return '';
    return \`<div class="ttrow"><span><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:\${s.color};margin-right:6px"></i>\${s.name}</span>
      <span><b>\${v.lvl}</b><span class="muted">/5</span></span></div>\`;
  }).join('') || '<div class="muted">No skills assigned</div>';
  const certRows=(u.certs||[]).map(uc=>{
    const c=db.certs.find(x=>x.id===uc.certId);if(!c)return '';
    const st=certStatus(c,uc.issued);
    const lab=st.days===Infinity?'∞':(st.days<0?'expired':st.days+'d');
    return \`<div class="ttrow"><span>\${c.name}</span><span class="pill \${st.state}">\${lab}</span></div>\`;
  }).join('') || '<div class="muted" style="font-size:12px">No certifications</div>';
  tt.innerHTML=\`<h4><span class="av" style="width:26px;height:26px;font-size:11px;display:inline-grid;vertical-align:middle;background:\${u.color}">\${initials(u.name)}</span> \${u.name}</h4>
    <div class="muted" style="font-size:12px;margin-bottom:8px">\${u.role||''} · \${u.email||''} · joined \${u.joined||'—'}</div>
    <div style="font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.5px;margin:6px 0 3px">Skills</div>
    \${skRows}
    <div style="font-size:11px;color:var(--mut);text-transform:uppercase;letter-spacing:.5px;margin:9px 0 3px">Certifications</div>
    \${certRows}\`;
  tt.classList.add('show');moveTip(e);
}
function moveTip(e){
  const tt=document.getElementById('tooltip');
  let x=e.clientX+18,y=e.clientY+18;
  const w=290,h=tt.offsetHeight||300;
  if(x+w>innerWidth)x=e.clientX-w-12;
  if(y+h>innerHeight)y=Math.max(10,innerHeight-h-10);
  tt.style.left=x+'px';tt.style.top=y+'px';
}
function hideTip(){document.getElementById('tooltip').classList.remove('show');}

// ---------- USER DETAIL MODAL ----------
function openUser(id){
  const u=db.users.find(x=>x.id===id);if(!u)return;
  hideTip();
  const box=document.getElementById('modalBox');
  const skillBlocks=db.skills.map(s=>{
    const us=u.skills[s.id]||{lvl:0,subs:{}};
    const subs=s.subs.map(sub=>\`
      <div class="ttrow" style="margin:6px 0">
        <span class="muted">↳ \${sub.name}</span>
        \${lvlSel(\`subLvl('\${u.id}','\${s.id}','\${sub.id}',\`,(us.subs||{})[sub.id]||0)}
      </div>\`).join('');
    return \`<div class="sk-item">
      <div class="flex-h">
        <i style="display:inline-block;width:11px;height:11px;border-radius:3px;background:\${s.color}"></i>
        <b style="flex:1">\${s.name}</b>
        \${lvlSel(\`setLvl('\${u.id}','\${s.id}',\`,us.lvl||0)}
      </div>
      \${s.subs.length?\`<div style="margin-top:8px">\${subs}</div>\`:''}
    </div>\`;
  }).join('');
  const certOpts=db.certs.map(c=>\`<option value="\${c.id}">\${c.name}</option>\`).join('');
  const certList=(u.certs||[]).map((uc,i)=>{
    const c=db.certs.find(x=>x.id===uc.certId);if(!c)return '';
    const st=certStatus(c,uc.issued);
    const lab=st.days===Infinity?'No expiry':(st.days<0?'Expired '+st.exp:'Expires '+st.exp);
    return \`<div class="warnbox \${st.state}">
      <div style="flex:1"><b>\${c.name}</b><div class="muted" style="font-size:12px">Issued \${uc.issued} · \${lab}</div></div>
      <input type="date" value="\${uc.issued}" style="width:150px" onchange="updIssued('\${u.id}',\${i},this.value)"/>
      <button class="danger" onclick="rmCert('\${u.id}',\${i})">✕</button>
    </div>\`;
  }).join('')||'<div class="muted" style="font-size:13px">No certifications assigned.</div>';

  box.innerHTML=\`
    <div class="flex-h">
      <span class="av" style="background:\${u.color}">\${initials(u.name)}</span>
      <div style="flex:1"><h2 style="margin:0">\${u.name}</h2><div class="muted" style="font-size:13px">\${u.role||''}</div></div>
      <button class="x" onclick="closeModal()">×</button>
    </div>
    <div class="row" style="margin:16px 0">
      <div class="field"><label>Role</label><input value="\${u.role||''}" onchange="updField('\${u.id}','role',this.value)"/></div>
      <div class="field"><label>Email</label><input value="\${u.email||''}" onchange="updField('\${u.id}','email',this.value)"/></div>
    </div>
    <h2 style="margin-top:8px">🎯 Skill levels</h2>
    \${skillBlocks||'<div class="muted">No skills defined yet — add some on the Skills tab.</div>'}
    <h2 style="margin-top:18px">📜 Certifications</h2>
    \${certList}
    <div class="row" style="margin-top:12px">
      <div class="field"><label>Assign certification</label><select id="certPick">\${certOpts||'<option>None</option>'}</select></div>
      <div class="field" style="flex:0 0 160px"><label>Issued date</label><input type="date" id="certDate" value="\${new Date().toISOString().slice(0,10)}"/></div>
      <button class="btn" onclick="addCertToUser('\${u.id}')">Assign</button>
    </div>
    <div style="margin-top:20px;text-align:right"><button class="danger" onclick="delUser('\${u.id}')">Delete user</button></div>
  \`;
  document.getElementById('modal').classList.add('show');
}
function lvlSel(fnPrefix,cur){
  let h='<div class="lvlsel">';
  for(let i=1;i<=5;i++)h+=\`<button class="\${cur>=i?'on':''}" onclick="\${fnPrefix}\${i})">\${i}</button>\`;
  h+=\`<button class="\${cur===0?'on':''}" style="width:auto;padding:0 6px" onclick="\${fnPrefix}0)">–</button></div>\`;
  return h;
}
function setLvl(uid_,sid,lvl){const u=db.users.find(x=>x.id===uid_);if(!u.skills[sid])u.skills[sid]={lvl:0,subs:{}};u.skills[sid].lvl=lvl;save();openUser(uid_);}
function subLvl(uid_,sid,subid,lvl){const u=db.users.find(x=>x.id===uid_);if(!u.skills[sid])u.skills[sid]={lvl:0,subs:{}};if(!u.skills[sid].subs)u.skills[sid].subs={};u.skills[sid].subs[subid]=lvl;if(lvl>0&&!u.skills[sid].lvl)u.skills[sid].lvl=1;save();openUser(uid_);}
function updField(uid_,f,v){const u=db.users.find(x=>x.id===uid_);u[f]=v;save();}
function updIssued(uid_,i,v){const u=db.users.find(x=>x.id===uid_);u.certs[i].issued=v;save();openUser(uid_);}
function rmCert(uid_,i){const u=db.users.find(x=>x.id===uid_);u.certs.splice(i,1);save();openUser(uid_);}
function addCertToUser(uid_){const u=db.users.find(x=>x.id===uid_);const cid=document.getElementById('certPick').value;const d=document.getElementById('certDate').value;if(!cid)return;if(!u.certs)u.certs=[];u.certs.push({certId:cid,issued:d});save();openUser(uid_);}
function delUser(uid_){if(!confirm('Delete this user?'))return;db.users=db.users.filter(x=>x.id!==uid_);save();closeModal();render();}
function closeModal(){document.getElementById('modal').classList.remove('show');render();}

function addUser(){
  const n=document.getElementById('un').value.trim();if(!n)return alert('Name required');
  db.users.push({id:uid(),name:n,role:document.getElementById('ur').value.trim(),email:document.getElementById('ue').value.trim(),color:PALETTE[Math.floor(Math.random()*PALETTE.length)],skills:{},certs:[],joined:new Date().toISOString().slice(0,10)});
  save();render();
}

// ---------- SKILLS ----------
function viewSkills(){
  return \`
  <div class="card">
    <h2>➕ Add skill</h2>
    <div class="row">
      <div class="field"><label>Skill name</label><input id="sn" placeholder="e.g. Data Engineering"/></div>
      <button class="btn" onclick="addSkill()">Add skill</button>
    </div>
  </div>
  <div class="card" style="margin-top:18px">
    <h2>🧩 Skills & subskills (\${db.skills.length})</h2>
    \${db.skills.map(s=>\`
      <div class="sk-item">
        <div class="flex-h">
          <i style="display:inline-block;width:13px;height:13px;border-radius:4px;background:\${s.color}"></i>
          <b style="flex:1;font-size:15px">\${s.name}</b>
          <span class="chip">\${s.subs.length} subskills</span>
          <button class="danger" onclick="delSkill('\${s.id}')">Delete</button>
        </div>
        <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:7px">
          \${s.subs.map(sub=>\`<span class="chip">\${sub.name} <button class="x" style="font-size:15px;color:var(--bad)" onclick="delSub('\${s.id}','\${sub.id}')">×</button></span>\`).join('') || '<span class="muted" style="font-size:12px">No subskills yet</span>'}
        </div>
        <div class="row" style="margin-top:10px">
          <input id="sub_\${s.id}" placeholder="Add subskill..." style="flex:1" onkeydown="if(event.key==='Enter')addSub('\${s.id}')"/>
          <button class="ghost" onclick="addSub('\${s.id}')">+ Subskill</button>
        </div>
      </div>\`).join('') || '<div class="empty">No skills yet.</div>'}
  </div>\`;
}
function addSkill(){const n=document.getElementById('sn').value.trim();if(!n)return;db.skills.push({id:uid(),name:n,color:PALETTE[db.skills.length%PALETTE.length],subs:[]});save();render();}
function addSub(sid){const el=document.getElementById('sub_'+sid);const n=el.value.trim();if(!n)return;db.skills.find(s=>s.id===sid).subs.push({id:uid(),name:n});save();render();}
function delSub(sid,subid){const s=db.skills.find(x=>x.id===sid);s.subs=s.subs.filter(x=>x.id!==subid);db.users.forEach(u=>{if(u.skills[sid]&&u.skills[sid].subs)delete u.skills[sid].subs[subid];});save();render();}
function delSkill(sid){if(!confirm('Delete this skill and remove it from all users?'))return;db.skills=db.skills.filter(x=>x.id!==sid);db.users.forEach(u=>delete u.skills[sid]);save();render();}

// ---------- CERTS ----------
function viewCerts(){
  return \`
  <div class="card">
    <h2>➕ Add certification type</h2>
    <div class="row">
      <div class="field"><label>Certification name</label><input id="cn" placeholder="e.g. Azure Administrator"/></div>
      <div class="field" style="flex:0 0 200px"><label>Validity (months, 0=never)</label><input id="cm" type="number" value="24" min="0"/></div>
      <button class="btn" onclick="addCert()">Add</button>
    </div>
  </div>
  <div class="card" style="margin-top:18px">
    <h2>📜 Certifications (\${db.certs.length})</h2>
    <table><thead><tr><th>Name</th><th>Validity</th><th>Holders</th><th>Status spread</th><th></th></tr></thead><tbody>
    \${db.certs.map(c=>{
      let ok=0,warn=0,bad=0,total=0;
      db.users.forEach(u=>(u.certs||[]).forEach(uc=>{if(uc.certId===c.id){total++;const st=certStatus(c,uc.issued);if(st.state==='ok')ok++;else if(st.state==='warn')warn++;else bad++;}}));
      return \`<tr>
        <td><b>\${c.name}</b></td>
        <td>\${c.months?c.months+' months':'Never expires'}</td>
        <td>\${total}</td>
        <td>\${total?\`<span class="pill ok">\${ok} ok</span> \${warn?\`<span class="pill warn">\${warn} soon</span>\`:''} \${bad?\`<span class="pill bad">\${bad} expired</span>\`:''}\`:'<span class="muted">—</span>'}</td>
        <td style="text-align:right"><button class="danger" onclick="delCert('\${c.id}')">Delete</button></td>
      </tr>\`;
    }).join('')||'<tr><td colspan="5" class="empty">No certifications yet.</td></tr>'}
    </tbody></table>
  </div>\`;
}
function addCert(){const n=document.getElementById('cn').value.trim();if(!n)return;const m=parseInt(document.getElementById('cm').value)||0;db.certs.push({id:uid(),name:n,months:m});save();render();}
function delCert(cid){if(!confirm('Delete this certification type and unassign it from all users?'))return;db.certs=db.certs.filter(x=>x.id!==cid);db.users.forEach(u=>{u.certs=(u.certs||[]).filter(uc=>uc.certId!==cid);});save();render();}

function wire(){}
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal();});
render();
</script>
</body>
</html>`;
