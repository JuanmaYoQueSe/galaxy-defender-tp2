
let score=0,lives=3,player='';
const ws=new WebSocket('wss://gamehubmanager.azurewebsites.net/ws');
ws.onopen=()=>document.getElementById('status').textContent='Conectado';
ws.onmessage=e=>{try{let d=JSON.parse(e.data);let r=document.getElementById('rankingList');r.innerHTML='';d.slice(0,5).forEach(x=>{let li=document.createElement('li');li.textContent=x.Player+': '+x.Value;r.appendChild(li);});}catch(err){}};
document.getElementById('startBtn').onclick=()=>{player=document.getElementById('playerName').value;document.getElementById('startScreen').style.display='none';document.getElementById('gameUI').style.display='block';document.getElementById('playerLabel').textContent=player;setInterval(spawn,1000);};
function send(ev,val){if(ws.readyState===1)ws.send(JSON.stringify({game:'GalaxyDefender',event:ev,player:player,value:val}));}
function spawn(){if(lives<=0)return;let a=document.getElementById('gameArea');let m=document.createElement('div');m.className='meteor';m.style.left=Math.random()*(a.clientWidth-70)+'px';m.style.top=Math.random()*(a.clientHeight-70)+'px';m.onclick=()=>{score+=10;document.getElementById('score').textContent=score;send('meteor_destroyed',score);m.remove();};a.appendChild(m);setTimeout(()=>{if(m.parentNode){m.remove();lives--;document.getElementById('lives').textContent=lives;if(lives<=0){send('game_over',score);alert('Game Over');}}},1500);}
