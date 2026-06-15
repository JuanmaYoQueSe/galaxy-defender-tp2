
const WebSocket=require('ws');
const wss=new WebSocket.Server({"wss://gamehubmanager.azurewebsites.net/ws"});
let ranking=[{name:'Jugador',score:0}];
wss.on('connection',ws=>{
 ws.send(JSON.stringify(ranking,null,2));
});
console.log('WS listo en puerto 8080');
