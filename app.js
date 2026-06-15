const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
let x=380;
document.addEventListener('keydown',e=>{
 if(e.key==='ArrowLeft')x-=10;
 if(e.key==='ArrowRight')x+=10;
});
function loop(){
 ctx.clearRect(0,0,800,500);
 ctx.fillStyle='white';
 ctx.fillRect(x,450,40,20);
 requestAnimationFrame(loop);
}
loop();

if('serviceWorker' in navigator){
 navigator.serviceWorker.register('./service-worker.js');
}

const ranking=document.getElementById('ranking');
try{
 const ws=new WebSocket('ws://localhost:8080');
 ws.onmessage=(e)=>ranking.innerHTML='<h2>Ranking</h2><pre>'+e.data+'</pre>';
}catch(e){}
