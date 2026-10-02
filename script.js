const roadmap = [
  {week:1, title:"Week 1 — HTML Foundations", project:"Personal Profile Website", days:[
    ["How websites work, HTML structure","Create your first index.html"],
    ["Headings, paragraphs and links","Create an About Me page"],
    ["Images, audio and video","Add media to your website"],
    ["Lists and tables","Build a skills and education section"],
    ["Forms and inputs","Create a contact form"],
    ["Semantic HTML","Rebuild using header, nav, main, section and footer"],
    ["Mini Project","Build a simple personal profile website"]
  ]},
  {week:2, title:"Week 2 — CSS & Professional Design", project:"IT Company Landing Page", days:[
    ["CSS selectors, colors and fonts","Style your profile page"],
    ["Box model","Create professional cards"],
    ["Flexbox","Build a navigation bar"],
    ["CSS Grid","Build a project gallery"],
    ["Typography and spacing","Improve visual hierarchy"],
    ["Shadows, gradients and hover effects","Add modern UI effects"],
    ["Mini Project","Build a modern IT company landing page"]
  ]},
  {week:3, title:"Week 3 — Responsive Design + JavaScript", project:"Interactive Restaurant Website", days:[
    ["Responsive design","Make your landing page mobile-friendly"],
    ["Media queries","Create mobile, tablet and desktop layouts"],
    ["JavaScript basics","Learn variables, functions and conditions"],
    ["DOM","Change HTML using JavaScript"],
    ["Events","Create buttons and interactive menus"],
    ["Forms and validation","Validate your contact/reservation form"],
    ["Mini Project","Build an interactive restaurant website"]
  ]},
  {week:4, title:"Week 4 — Build Real Projects", project:"Real Estate Platform", days:[
    ["Portfolio structure","Create your portfolio folder and pages"],
    ["Hero section","Build your professional portfolio hero"],
    ["About and Skills","Create About and Skills sections"],
    ["Projects","Create four project cards"],
    ["Contact section","Build and validate a contact form"],
    ["Responsive polish","Test mobile, tablet and desktop layouts"],
    ["Final project","Build the Real Estate Platform and prepare for deployment"]
  ]}
];

const resources = [
  {icon:"🎓",name:"freeCodeCamp — Responsive Web Design",desc:"Free, project-based HTML and CSS curriculum with responsive design practice.",url:"https://www.freecodecamp.org/learn/2022/responsive-web-design/",tags:["HTML","CSS","Responsive"]},
  {icon:"🧭",name:"The Odin Project — Foundations",desc:"Practical web development path covering HTML, CSS, Flexbox, JavaScript, Git and projects.",url:"https://www.theodinproject.com/paths/foundations/courses/foundations",tags:["HTML","CSS","JS","Git"]},
  {icon:"📚",name:"MDN — Learn Web Development",desc:"Authoritative learning material for modern HTML, CSS, JavaScript and web fundamentals.",url:"https://developer.mozilla.org/en-US/docs/Learn_web_development",tags:["HTML","CSS","JS"]},
  {icon:"🎨",name:"MDN — CSS Layout",desc:"Deepen your understanding of Flexbox, Grid and modern CSS layouts.",url:"https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout",tags:["Flexbox","Grid","CSS"]},
  {icon:"⚡",name:"freeCodeCamp — JavaScript",desc:"Free JavaScript learning path for programming, DOM and interactive web development.",url:"https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/",tags:["JavaScript"]},
  {icon:"📖",name:"MDN — JavaScript Guide",desc:"A detailed reference and learning guide for JavaScript concepts.",url:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",tags:["JavaScript"]},
  {icon:"🐙",name:"GitHub Skills",desc:"Interactive lessons for GitHub, Git and development workflows.",url:"https://skills.github.com/",tags:["Git","GitHub"]}
];

const projects = [
  {icon:"👤",title:"Week 1 — Personal Profile",tech:"HTML",desc:"Introduce yourself with Home, About, Education, Skills and Contact sections."},
  {icon:"💻",title:"Week 2 — IT Company Landing Page",tech:"HTML + CSS",desc:"Build a polished business landing page with a hero, services, testimonials and contact section."},
  {icon:"🍽️",title:"Week 3 — Restaurant Website",tech:"HTML + CSS + JavaScript",desc:"Add menu filtering, mobile navigation, gallery interactions and form validation."},
  {icon:"🏠",title:"Week 4 — Real Estate Platform",tech:"HTML + CSS + JavaScript",desc:"Create property listings, search/filter UI, details, login, booking and dashboard interfaces."}
];

const state = JSON.parse(localStorage.getItem("webdevRoadmapState") || '{"done":{},"reminder":false,"soundAlarm":false,"time":"19:00"}');

const allDays = [];
roadmap.forEach(w => w.days.forEach((d,i) => allDays.push({week:w.week, day:i+1, title:d[0], task:d[1]})));

function save(){localStorage.setItem("webdevRoadmapState",JSON.stringify(state));}
function completedCount(){return Object.values(state.done).filter(Boolean).length}
function progress(){return Math.round(completedCount()/30*100)}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function currentDayIndex(){const n=completedCount();return Math.min(n,29)}
function renderStats(){
  const p=progress(), c=completedCount();
  document.getElementById("completedStat").textContent=`${c}/30`;
  document.getElementById("progressStat").textContent=p+"%";
  document.getElementById("sideProgress").textContent=p+"%";
  document.getElementById("sideProgressBar").style.width=p+"%";
  document.getElementById("weekStat").textContent=`Week ${Math.min(4,Math.floor(c/7)+1)}`;
  const d=allDays[currentDayIndex()];
  document.getElementById("todayTaskSubtitle").textContent=`Day ${currentDayIndex()+1} • Week ${d.week}`;
  document.getElementById("todayTask").innerHTML=`<div class="task-card"><h4>${d.title}</h4><p>${d.task}</p><label class="check-row"><input type="checkbox" ${state.done[currentDayIndex()]?"checked":""} onchange="toggleDay(${currentDayIndex()},this.checked)"> Mark today's task complete</label></div>`;
  const status=document.getElementById("todayStatus"); status.textContent=state.done[currentDayIndex()]?"Completed":"Pending"; status.classList.toggle("done",!!state.done[currentDayIndex()]);
}
function toggleDay(index,checked){state.done[index]=checked;save();renderAll();showToast(checked?"Task completed 🎉":"Task marked pending");}
window.toggleDay=toggleDay;

function renderRoadmap(filter="all"){
  const el=document.getElementById("roadmapList"); el.innerHTML="";
  let dayIndex=0;
  roadmap.forEach(w=>{
    const visible=w.days.map((d,i)=>({d,i,idx:dayIndex+i})).filter(x=>filter==="all"||(filter==="done"&&state.done[x.idx])||(filter==="pending"&&!state.done[x.idx]));
    if(!visible.length){dayIndex+=7;return}
    const card=document.createElement("div");card.className="week-card";
    card.innerHTML=`<div class="week-head"><div><h3>${w.title}</h3><p>Weekly project: ${w.project}</p></div><span class="week-project">${w.week===4?"Final build":"Mini project"}</span></div>`;
    visible.forEach(({d,idx,i})=>{
      const row=document.createElement("div");row.className="day-row"+(state.done[idx]?" done":"");
      row.innerHTML=`<div class="day-number">DAY ${idx+1}</div><div><h4>${d[0]}</h4><p>${d[1]}</p></div><input class="day-check" type="checkbox" ${state.done[idx]?"checked":""} aria-label="Complete day ${idx+1}">`;
      row.querySelector("input").addEventListener("change",e=>toggleDay(idx,e.target.checked));
      card.appendChild(row);
    });
    el.appendChild(card); dayIndex+=7;
  });
}
function renderResources(){
  document.getElementById("resourceGrid").innerHTML=resources.map(r=>`<article class="resource-card"><div class="resource-icon">${r.icon}</div><h3>${r.name}</h3><p>${r.desc}</p><div class="tag-row">${r.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div><a class="resource-link" href="${r.url}" target="_blank" rel="noopener">Open free resource ↗</a></article>`).join("");
}
function renderProjects(){
  document.getElementById("projectGrid").innerHTML=projects.map(p=>`<article class="project-card"><div class="project-icon">${p.icon}</div><h3>${p.title}</h3><p>${p.desc}</p><div class="tag-row"><span class="tag">${p.tech}</span></div></article>`).join("");
  document.getElementById("projectMiniList").innerHTML=projects.map((p,i)=>`<div class="mini-project"><b>${p.icon} ${p.title.replace("Week "+(i+1)+" — ","")}</b><span>${p.tech}</span></div>`).join("");
}
function renderAll(){renderStats();renderRoadmap(document.querySelector(".filter.active")?.dataset.filter||"all");renderResources();renderProjects();}

function switchView(view){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===view));
  document.querySelectorAll(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  const names={dashboard:"Dashboard",roadmap:"30-Day Roadmap",resources:"Learning Resources",projects:"Weekly Projects",settings:"Settings"};
  document.getElementById("pageTitle").textContent=names[view];
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".nav-btn").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.view)));
document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>switchView(b.dataset.jump)));
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderRoadmap(b.dataset.filter);
}));

document.getElementById("resetBtn").addEventListener("click",()=>{
  if(confirm("Reset all 30-day progress?")){state.done={};save();renderAll();showToast("Progress reset");}
});

const reminderToggle=document.getElementById("reminderToggle"), reminderTime=document.getElementById("reminderTime");
const soundToggle=document.getElementById("soundToggle"), stopAlarmButton=document.getElementById("stopAlarmBtn");
let audioContext, alarmInterval, alarmTimeout;
reminderToggle.checked=!!state.reminder; reminderTime.value=state.time||"19:00";
soundToggle.checked=!!state.soundAlarm;

function playChime(){
  const AudioContextClass=window.AudioContext||window.webkitAudioContext;
  if(!AudioContextClass) return;
  audioContext ||= new AudioContextClass();
  audioContext.resume();
  const start=audioContext.currentTime;
  [660,880,660].forEach((frequency,index)=>{
    const oscillator=audioContext.createOscillator(), gain=audioContext.createGain();
    const at=start+index*.24;
    oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(.0001,at);
    gain.gain.exponentialRampToValueAtTime(.16,at+.025);
    gain.gain.exponentialRampToValueAtTime(.0001,at+.2);
    oscillator.connect(gain);gain.connect(audioContext.destination);
    oscillator.start(at);oscillator.stop(at+.21);
  });
}
function stopAlarm(){
  clearInterval(alarmInterval);clearTimeout(alarmTimeout);
  alarmInterval=null;alarmTimeout=null;stopAlarmButton.disabled=true;
}
function startAlarm(){
  if(!state.soundAlarm) return;
  stopAlarm();playChime();stopAlarmButton.disabled=false;
  alarmInterval=setInterval(playChime,5000);
  alarmTimeout=setTimeout(stopAlarm,30000);
}
async function sendNotification(title,body){
  if(!("Notification" in window)||Notification.permission!=="granted") return false;
  try{
    if("serviceWorker" in navigator){
      const registration=await navigator.serviceWorker.ready;
      await registration.showNotification(title,{body,icon:"./icon-192.png",badge:"./icon-192.png",tag:"webdev-roadmap-reminder"});
    }else new Notification(title,{body});
    return true;
  }catch(error){showToast("Could not show the browser notification");return false}
}
reminderToggle.addEventListener("change",async()=>{
  if(reminderToggle.checked){
    if(!("Notification" in window)){reminderToggle.checked=false;showToast("Notifications are not supported here");return}
    const permission=await Notification.requestPermission();
    if(permission!=="granted"){reminderToggle.checked=false;state.reminder=false;save();showToast("Allow notifications in your browser to enable reminders");return}
  }
  state.reminder=reminderToggle.checked;save();
  if(!state.reminder) stopAlarm();
  showToast(state.reminder?"Daily reminder enabled":"Daily reminder disabled");
  checkReminder();
});
soundToggle.addEventListener("change",()=>{
  state.soundAlarm=soundToggle.checked;save();
  if(state.soundAlarm) playChime(); else stopAlarm();
  showToast(state.soundAlarm?"Sound alarm enabled":"Sound alarm disabled");
});
reminderTime.addEventListener("change",()=>{state.time=reminderTime.value;save();showToast("Reminder time saved")});
stopAlarmButton.addEventListener("click",stopAlarm);
document.getElementById("notifyBtn").addEventListener("click",()=>reminderToggle.click());
document.getElementById("testReminderBtn").addEventListener("click",async()=>{
  if("Notification" in window && Notification.permission!=="granted") await Notification.requestPermission();
  const d=allDays[currentDayIndex()];
  const sent=await sendNotification("WebDev Roadmap test",`Today's task: ${d.title}`);
  if(soundToggle.checked) playChime();
  showToast(sent?"Test notification sent":"Check notification permission in your browser");
});

function checkReminder(){
  if(!state.reminder || !("Notification" in window) || Notification.permission!=="granted") return;
  const now=new Date(), date=[now.getFullYear(),String(now.getMonth()+1).padStart(2,"0"),String(now.getDate()).padStart(2,"0")].join("-");
  const key=`reminded-${date}-${state.time}`;
  const due=new Date(`${date}T${state.time}:00`);
  if(now>=due && localStorage.getItem(key)!=="1"){
    localStorage.setItem(key,"1");
    const d=allDays[currentDayIndex()];
    sendNotification("WebDev Roadmap",`Today's task: ${d.title} — ${d.task}`);
    startAlarm();
  }
}
setInterval(checkReminder,15000);

document.getElementById("todayLabel").textContent=new Date().toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric",year:"numeric"});
renderAll();

let installPrompt;
const installButton=document.getElementById("installBtn");
installButton.addEventListener("click",async()=>{
  if(!installPrompt){showToast("Use your browser menu to choose Install app or Add to Home Screen");return}
  installPrompt.prompt();
  const {outcome}=await installPrompt.userChoice;
  if(outcome==="accepted") showToast("WebDev Roadmap installed");
  installPrompt=null;
});
window.addEventListener("beforeinstallprompt",event=>{
  event.preventDefault();
  installPrompt=event;
});
window.addEventListener("appinstalled",()=>{
  installPrompt=null;
  showToast("WebDev Roadmap installed");
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}
