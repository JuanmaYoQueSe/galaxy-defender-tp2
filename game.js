let score=0,lives=3,player='';
const rankKey='galaxyRanking';
if(!localStorage.getItem('tutorialSeen')) document.getElementById('tutorial').style.display='flex'; else document.getElementById('tutorial').style.display='none';
closeTutorial.onclick=()=>{localStorage.setItem('tutorialSeen','1');tutorial.style.display='none';};
function updateRanking(name,val){let r=JSON.parse(localStorage.getItem(rankKey)||'[]');r.push({name,score:val});r.sort((a,b)=>b.score-a.score);r=r.slice(0,10);localStorage.setItem(rankKey,JSON.stringify(r));renderRanking(r);}
function renderRanking(r){rankingList.innerHTML='';r.forEach(x=>{let li=document.createElement('li');li.textContent=x.name+': '+x.score;rankingList.appendChild(li);});}
renderRanking(JSON.parse(localStorage.getItem(rankKey)||'[]'));
let ws=null;try{ws=new WebSocket('wss://gamehubmanager.azurewebsites.net/ws');ws.onopen=()=>status.textContent='Conectado';ws.onmessage=e=>{try{renderRanking(JSON.parse(e.data));}catch{}};}catch(e){}
startBtn.onclick=()=>{player=playerName.value||'Jugador';startScreen.style.display='none';gameUI.style.display='block';playerLabel.textContent=player;setInterval(spawn,1000);};
function send(ev,val){if(ws&&ws.readyState===1)ws.send(JSON.stringify({game:'GalaxyDefender',event:ev,player,value:val}));}
function spawn(){if(lives<=0)return;let m=document.createElement('div');m.className='meteor';m.style.left=Math.random()*(gameArea.clientWidth-70)+'px';m.style.top=Math.random()*(gameArea.clientHeight-70)+'px';m.onclick=()=>{score+=10;scoreEl();send('meteor_destroyed',score);m.remove();};gameArea.appendChild(m);setTimeout(()=>{if(m.parentNode){m.remove();lives--;livesEl();if(lives<=0){updateRanking(player,score);send('game_over',score);alert('Game Over');}}},1500);}
function scoreEl(){document.getElementById('score').textContent=score}
function livesEl(){document.getElementById('lives').textContent=lives}
if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js');
