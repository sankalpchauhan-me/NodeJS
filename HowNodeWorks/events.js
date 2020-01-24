const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter{
    constructor(){
        super();
    }
}

const mySalesEmiiter = new Sales();

//Observers
//The emiiters execute synchronusly one after the other
//THese are like onClickListeners in android
//Observers = = = onClickListener
mySalesEmiiter.on("newSale",()=>{
    console.log('New sale completed');
})

mySalesEmiiter.on("newSale",()=>{
    console.log('The customer name is John');
})

mySalesEmiiter.on("newSale",stock=>{
    console.log('Currennt Stock is '+stock);
})

//THis is like clicking a button
//We can also pass in values that could be used by Observers
mySalesEmiiter.emit("newSale",9);

//////////// / / / / / // 

const server = http.createServer();

//Observer on server will observe for any event
server.on('request', (req,res)=>{
    console.log('Request Recieved');
    console.log(req.url);
    res.end('Request Recieved');
});

server.on('request', (req, res)=>{
    console.log('Another Request 😀');
});

server.on('close', ()=>{
    console.log("Server closed");
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Waiting for requests");
})
