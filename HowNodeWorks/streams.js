const server = require('http').createServer();
const fs = require('fs');

server.on('request', (req, res)=>{
    //Problem how to send large chunks of data

    //Solution 1: Directly
    //Send all the data from a large file at once
    // fs.readFile('test-file.txt', (err, data)=>{
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //Solution 2: Streams : Send peice by peice
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk=>{
    //     res.write(chunk);
    // });
    // readable.on('end', ()=>{
    //     res.end();
    // });
    // readable.on('error', err =>{
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('file not found');
    // });

    //Solution 3: Piping to solve BackPreassure Problem
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    // redableStream.pipe(writableStream)


});

server.listen(8000, '127.0.0.1', ()=>{
    console.log('Listening');
});